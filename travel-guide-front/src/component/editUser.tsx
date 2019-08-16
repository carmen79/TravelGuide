import React from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { RouteComponentProps } from "react-router-dom";
import { IUser } from '../interfaces'
import { setUser } from "../Actions/actions";

interface IPropsGlobal {
  token: string;
  user: IUser;
  setUser: (u: IUser) => void;
}

const EditUser: React.FC<IPropsGlobal & RouteComponentProps> = props => {

  const [userNameValue, setUserNameValue] = React.useState(props.user.username);
  const [emailValue, setEmailValue] = React.useState(props.user.email);
  const [descriptionValue, setDescriptionValue] = React.useState(props.user.description);
  const [errorMessage, setErrorMessage] = React.useState("");

  const updateUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Cambio de user name:" + event.target.value);
    setUserNameValue(event.target.value);
  };

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const updateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value);
  };

  const send = () => {
    console.log("SENDDDDD: " + JSON.stringify({ username: userNameValue, email: emailValue, description: descriptionValue }));
    fetch("http://localhost:3000/api/users/" + props.user._id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + props.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: userNameValue, email: emailValue, description: descriptionValue })

    }).then(res => {
      console.log("Response from update user:" + res)
      if (res.ok) {
        res.json().then(response => {
          props.setUser(response);
          props.history.push("/userProfile");
        })
      } else if (res.status === 400) {
        res.text().then(text => {
          setErrorMessage("Error en los datos de usuario");
          console.log("Error en datos introducidos");
        });
      } else {
        setErrorMessage("Error en los datos de usuario");
        console.log("Error en datos introducidos");
      }
    }).catch(error => {
      setErrorMessage("Error en los datos de usuario");
      console.log("Error en datos introducidos " + error);
    });

  }


  const styleWhite = {
    color: 'white'
  };
  return (
    <div className="container">

      <div className="card-panel mynav back">
        <h5 style={styleWhite}>Modifica tus datos</h5>
      </div>
      <div className="form-group">
        <div className="input-field col s12">
          <input id="username" className="validate" value={userNameValue} type="text" onChange={updateUserName} />
          <label htmlFor="username">name</label>
        </div>
        <div className="input-field col s12">
          <input id="email" className="validate" value={emailValue} type="email" onChange={updateEmail} />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field col s12">
          <input id="description" className="validate" value={descriptionValue} type="text" onChange={updateDescription} />
          <label htmlFor="description">Sobre ti</label>
        </div>

        <div className="row red darken-2" style={styleWhite}>{errorMessage}</div>
      </div>

      <div className="flex-container">
        <div>
          <button className="waves-effect waves-light btn mybutton back" onClick={send}>
            <i className="material-icons right">account_circle</i>
            Aceptar
            </button>
        </div>
      </div >
    </div>
  );
}

const mapDispatchToProps = { setUser: setUser };

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  user: state.user
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(EditUser);
