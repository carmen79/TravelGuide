import React from "react";
// import { IDecode } from "../interface";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import jwt from "jsonwebtoken";
import { setToken } from "../Actions/actions";
import { Redirect } from 'react-router-dom'
import Login from './login'
import AddUser from './addUser'
import { Modal, Button } from 'react-materialize';


interface IPropsGlobal {
  token: string;
  setToken: (t: string) => void;
}

// Esto viene de la APP que es donde he decodificado el token
// son props del padre que uso en el hijo

const Navbar: React.FC<IPropsGlobal> = props => {
  var userName = "";
  if (props.token) {
    const decode = jwt.decode(props.token);
    if (typeof decode !== "string" && decode !== null) {
      userName = decode.username;
    }
  }
  const removeToken = () => {
    props.setToken("null");
    return <Redirect to="/" />;
  }

  function renderNoUser() {
    return (
      <div>
        <span className="navbar-brand mb-0 h1">Hola, a qué esperas para entrar en nuestra web!!!</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li id="loginLi">
            <a href="#modalLogin">Identificarse</a>
          </li>
          <li id="registerLi">
            <a href="#modalRegister">Registrarse</a>
          </li>
        </ul>

      </div>);
  }
  function renderUser() {
    return (
      <div>
        <span className="navbar-brand mb-0 h1">Hola {userName}!</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li id="loginLi">
            <button className="waves-effect waves-light btn" onClick={removeToken}>
              Cerrar Sesión
            </button>
          </li>

        </ul>
      </div>);
  }

  return (

    <nav className="navbar navbar-dark bg-primary">
      {!props.token && renderNoUser()}
      {props.token && renderUser()}

    </nav>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});
const mapDispatchToProps = { setToken: setToken };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
