import { connect } from "react-redux";
import { setToken } from "../Actions/actions";
import { IGlobalState } from "../Reducers/reducers";
import { Link, RouteComponentProps, Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import AddUser from './addUser'
import { Modal, Button, Toast } from 'react-materialize';

interface IPropsGlobal {
  setTokenInterno: (t: string) => void;
}

const Login: React.FC<IPropsGlobal> = props => {
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [addUser, setAddUser] = React.useState(false);

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const getToken = () => {
    fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: emailValue, password: passwordValue })
    })
    .then(res => {
      console.log("Response from login:" + res)
      if (res.ok) {
        res.text().then (token => {
          console.log(token);
          props.setTokenInterno(token);
        })
      } else {
        setErrorMessage("Error en la identificación de usuario");
        console.log("Error in login!!!!!!!!!!!!!!!!!!");
      }
    }).catch(error => {
        console.log("Error in login!!!!!!!!!!!!!!!!!!: " + error);
    })
  };

  function clickForgetPassword () {
    console.log("Call update password and send an email");
  }

  function clickAddUser () {
    setAddUser(true);
  }

  function openAddUser() {
    return <AddUser />
  }

  function openLogin() {
    return  (
    <div >
      <div className="card-panel teal lighten-2">
        <h5 style={styleWhite}>Introduce tus datos</h5>
      </div>

      <div className="form-group">
        <div className="input-field col s1">
          <input id="email" className="validate" value={emailValue} type="text" onChange={updateEmail} />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field col s1">
          <input className="validate" id="password"
            value={passwordValue}
            type="password"
            onChange={updatePassword}
            data-testid="password_input"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="row red darken-2" style={styleWhite}>{errorMessage}</div>
        {errorMessage && 
          <div className="row">
            <div className="col s1 left-align tiny">¿Has olvidado tu password? Crea un nuevo password &nbsp; 
              <a href="/resetPassword" onClick={clickForgetPassword} className="modal-close btn-floating pulse"><i className="material-icons tiny">sync</i></a>
            </div>
            <div className="col s2 right-align tiny">¿Aún no eres usuario? Date de alta aquí! &nbsp; 
              <a onClick={clickAddUser} className="btn-floating pulse"><i className="material-icons tiny">add</i></a>
            </div>        
          </div>
        }
      </div>

      <div className="flex-container">
        <div>
          <button className="waves-effect waves-light btn" onClick={getToken}>
            <i className="material-icons left">account_circle</i>
            Identificarse
            </button>
        </div>
        <div>
          <button className="modal-close waves-effect waves-light btn">
            <i className="material-icons left">cancel</i>Cancelar</button>
        </div>
      </div>
    </div >);
            
  }

  const styleWhite = {
    color: 'white'
  };

  return (
    <div>
    {!addUser && openLogin()}
    {addUser && openAddUser()}
    </div>
  );
};

const mapDispatchToProps = { setTokenInterno: setToken };

export default connect(
  null,
  mapDispatchToProps
)(Login);
