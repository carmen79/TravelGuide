import React from "react";
import { connect } from "react-redux";
import { setToken } from "../Actions/actions";
import { IGlobalState } from "../Reducers/reducers";
import { Link } from "react-router-dom";

interface IPropsGlobal {
  setTokenInterno: (t: string) => void;
}

const AddUser: React.FC<IPropsGlobal> = props => {
  const [userNameValue, setUserNameValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  const updateUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameValue(event.target.value);
  };

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };
  const getToken = () => {
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: userNameValue, email: emailValue, password: passwordValue })
    })
      .then(res => res.text())
      .then(token => {
        console.log(token);
        //el token lo tengo y lo tengo que guardar en Redux
        props.setTokenInterno(token);
        // Aquí añadir la sesion storage

      });
  };
  const styleWhite = {
    color: 'white'
  };
  return (
    <div >

      <div className="card-panel teal lighten-2">
        <h5 style={styleWhite}>Datos alta usuario</h5>
      </div>
      <div className="form-group">
        <div className="input-field col s12">
          <input id="username" className="validate" value={userNameValue} type="text" onChange={updateUserName} />
          <label htmlFor="username">Nombre</label>
        </div>
        <div className="input-field col s12">
          <input id="email" className="validate" value={emailValue} type="text" onChange={updateEmail} />
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
      </div>

      <div className="flex-container">
        <div>
          <button className="waves-effect waves-light btn" onClick={getToken}>
            <i className="material-icons right">account_circle</i>
            Enviar
            </button>
        </div>
        <div>
          <a href="/close" className="waves-effect waves-light btn">
            <i className="material-icons left">cancel</i>Cancelar</a>
        </div>
       
    </div >
    </div>
  );
};


const mapDispatchToProps = { setTokenInterno: setToken };

export default connect(
  null,
  mapDispatchToProps
)(AddUser);
