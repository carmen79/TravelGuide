import React from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { Button } from 'react-materialize';
import { IUser } from '../interfaces'
import { setUser } from "../Actions/actions";

interface IPropsGlobal {
  token: string;
  user: IUser;
  setUser: (u: IUser) => void;
}

const EditUserModal: React.FC<IPropsGlobal> = props => {

  const [userNameValue, setUserNameValue] = React.useState(props.user.username);
  const [emailValue, setEmailValue] = React.useState(props.user.email);
  const [descriptionValue, setDescriptionValue] = React.useState(props.user.description);
  const [errorMessage, setErrorMessage] = React.useState("");

  const updateUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameValue(event.target.value);
  };

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const updateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value);
  };

  const send = () => {
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
    <div className="margins">

      <div className="card-panel mynav back">
        <h5 style={styleWhite}>Modifica tus datos</h5>
      </div>
      <div className="form-group">
        <div className="input-field col s12">
          <input id="username" className="validate" value={userNameValue} type="text" onChange={updateUserName} />
          <label htmlFor="username">Nombre</label>
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

      <div className="row">
        <div className="col s6">
          <Button className="modal-close waves-effect waves-light  mybuttonnav back" onClick={send}><i className="small material-icons left">edit</i>Editar Perfil</Button>
        </div>
        <div className="col s6">
          <Button className="modal-close waves-effect waves-light  mybuttonnav back"><i className="small material-icons left">cancel</i>Cancelar</Button>
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
)(EditUserModal);
