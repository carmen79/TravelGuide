import React from "react";
// import { IDecode } from "../interface";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";

// interface IPropsGlobal {
//   decode: IDecode;
// }

// Esto viene de la APP que es donde he decodificado el token
// son props del padre que uso en el hijo

const Navbar: React.FC<any> = props => {
  const a = 1;
  return (
    <nav className="navbar navbar-dark bg-primary">
      <span className="navbar-brand mb-0 h1">Hello, (a)</span>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li id="loginLi">
          <a href="#modalLogin">Identificarse</a>
        </li>
        <li id="registerLi">
          <a href="#modalRegister">Registrarse</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
