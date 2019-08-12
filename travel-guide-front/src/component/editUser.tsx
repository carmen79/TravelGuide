import React from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { RouteComponentProps } from "react-router-dom";
import { IUser } from '../interfaces'
import { setUser } from "../Actions/actions";

interface IPropsGlobal {
  token: string;
  user: IUser;
  setTokenInterno: (t: string) => void;
}

const AddUser: React.FC<IPropsGlobal & RouteComponentProps> = props => {
  const [userNameValue, setUserNameValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [confirmationPasswordValue, setConfirmationPasswordValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const updateUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameValue(event.target.value);
  };

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };
  const updateConfirmationPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationPasswordValue(event.target.value);
  };


  const getToken = () => {
    if (passwordValue !== confirmationPasswordValue) {
      setErrorMessage("ERROR PAD INC");
    } else {

      fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: userNameValue, email: emailValue, password: passwordValue })
      })
        .then(res => {
          console.log("Response from login:" + res)
          if (res.ok) {
            res.text().then(token => {
              console.log(token);
              props.setTokenInterno(token);
              props.history.push("/userProfile");
            })
          } else if (res.status === 400) {
            res.text().then(text => {
              setErrorMessage(text);
              console.log("Error en datos introducidos");
            });
          } else {
            setErrorMessage("Error en los datos de nuevo usuario");
            console.log("Error en datos introducidos");
          }
        }).catch(error => {
          console.log("Error en datos introducidos " + error);
        })
    }

  };
  const styleWhite = {
    color: 'white'
  };
  return (
    <div >

      <div className="card-panel mynav back">
        <h5 style={styleWhite}>Datos alta usuario</h5>
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
          <input className="validate" id="password"
            value={passwordValue}
            type="password"
            onChange={updatePassword}
            data-testid="password_input"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="input-field col s12">
          <input className="validate" id="confirmationPassword"
            value={confirmationPasswordValue}
            type="password"
            onChange={updateConfirmationPassword}
            data-testid="password_input"
          />
          <label htmlFor="password"> Confirme Password</label>
        </div>
        <div className="row red darken-2" style={styleWhite}>{errorMessage}</div>
      </div>

      <div className="flex-container">
        <div>
          <button className="waves-effect waves-light btn mybutton back" onClick={getToken}>
            <i className="material-icons right">account_circle</i>
            Enviar
            </button>
        </div>
        <div>
          <button className="modal-close waves-effect waves-light btn mybutton back">
            <i className="material-icons left">cancel</i>Cancelar</button>
        </div>

      </div >
    </div>
  );
};


const mapDispatchToProps = { setUserInterno: setUser };
const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  user: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
