import React from "react";
// import { IDecode } from "../interface";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import jwt from "jsonwebtoken";
import { setToken } from "../Actions/actions";
import { Redirect, RouteComponentProps } from 'react-router-dom'
import Login from './login'
import AddUser from './addUser'
import { Modal, Button } from 'react-materialize';


interface IPropsGlobal {
  token: string;
  setToken: (t: string | null) => void;
}

// Esto viene de la APP que es donde he decodificado el token
// son props del padre que uso en el hijo

const NavbarModal: React.FC<IPropsGlobal & RouteComponentProps> = props => {
  var userName = "";
  if (props.token) {
    const decode = jwt.decode(props.token);
    if (typeof decode !== "string" && decode !== null) {
      userName = decode.username;
    }
  }
  const removeToken = () => {
    console.log("SET TOKEN NULL");
    props.setToken(null);
  }

  const triggerLogin = <Button className="waves-effect waves-light  mybuttonnav back"><i className="small material-icons left">account_circle</i>Identificarse</Button>;
  const triggerAddUser = <Button className="waves-effect waves-light mybuttonnav back"><i className="small material-icons left">add_circle_outline</i>Registrarse</Button>;

  function renderNoUser() {
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li className="navbar-brand mb-0 h1">
          <Modal trigger={triggerLogin} actions={null}>
            <Login history={props.history} location={props.location} match={props.match}/>
          </Modal>
        </li>
        <li className="navbar-brand mb-0 h1">
          <Modal trigger={triggerAddUser} actions={null} >
            <AddUser />
          </Modal>
        </li>
      </ul>
    );
  }
  

  function renderUser() {
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down"> 
        <li className="navbar-brand mb-0 h1">
          <img src="/img/nouser.jpg" className="imguser" >

            </img>
        </li>
      <li className="navbar-brand mb-0 h1">{userName}</li>
      <li id="loginLi">
        <button className="waves-effect waves-light btn" onClick={removeToken}>
          Cerrar Sesión
            </button>
      </li>
      </ul >
    );
  }

return (

  <nav className="nav-wrapper  mynav back">
    <a href="/" className="brand-logo">Travel Experiences</a>
    {!props.token && renderNoUser()}
    {props.token && renderUser()}
  </nav>
);
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});
const mapDispatchToProps = { setToken: setToken };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarModal);
