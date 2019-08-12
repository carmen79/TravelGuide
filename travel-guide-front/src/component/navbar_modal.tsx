import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { setToken } from "../Actions/actions";
import { RouteComponentProps } from 'react-router-dom'
import Login from './login'
import AddUser from './addUser'
import { Modal, Button } from 'react-materialize';
import { IUser } from '../interfaces'
import * as Constants from '../Constants';


interface IPropsGlobal {
  token: string;
  user: IUser;
  setToken: (t: string | null) => void;
}

const NavbarModal: React.FC<IPropsGlobal & RouteComponentProps> = props => {

  var urlPhoto = "/img/nouser.jpg";

  if (props.user.avatar) {
    urlPhoto = Constants.URL_PHOTO_AVATAR + props.user.avatar;
  }

  const removeToken = () => {
    console.log("SET TOKEN NULL");
    props.setToken(null);
    props.history.push("/");
  }

  const triggerLogin = <Button className="waves-effect waves-light  mybuttonnav back"><i className="small material-icons left">account_circle</i>Identificarse</Button>;
  const triggerAddUser = <Button className="waves-effect waves-light mybuttonnav back"><i className="small material-icons left">add_circle_outline</i>Registrarse</Button>;
  const triggerCloseSesion = <Button className="waves-effect waves-light mybuttonnav back">Cerrar Sesión</Button>;

  function renderNoUser() {
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li className="navbar-brand mb-0 h1">
          <Modal trigger={triggerLogin} actions={null}>
            <Login history={props.history} location={props.location} match={props.match} />
          </Modal>
        </li>
        <li className="navbar-brand mb-0 h1">
          <Modal trigger={triggerAddUser} actions={null} >
            <AddUser history={props.history} location={props.location} match={props.match} />
          </Modal>
        </li>
      </ul>
    );
  }

  const styleWhite = {
    color: 'white'
  };

  const styleHeight = {
    height: '200px'
  };

  const goToUserProfile = () => {
    props.history.push("/userProfile");
  }

  function renderUser() {
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li className="waves-effect waves-light" onClick={goToUserProfile} >
          <img src={urlPhoto} className="imguser" />
        </li>
        <li className="waves-effect waves-light mynav profile" onClick={goToUserProfile} >
          {props.user.username}
        </li>
        <li id="loginLi">
          <Modal style={styleHeight} trigger={triggerCloseSesion} actions={null} >
            <div >
              <div className="card-panel mynav back">
                <h5 style={styleWhite} >¿Estás seguro que deseas cerrar la sesión?</h5>
              </div>

              <div className="flex-container">
                <div>
                  <button className="waves-effect waves-light btn mybutton back" onClick={removeToken}>
                    <i className="material-icons left">check_circle</i>
                    Sí
                  </button>
                </div>
                <div>
                  <button className="modal-close waves-effect waves-light btn mybutton back">
                    <i className="material-icons left">cancel</i>Cancelar</button>
                </div>
              </div>
            </div >
          </Modal>
        </li>
      </ul >
    );
  }

  return (

    <nav className="nav-wrapper mynav back">
      <a href="/" className="brand-logo">Travel
       Experiences</a>
      {!props.token && renderNoUser()}
      {props.token && renderUser()}
    </nav>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  user: state.user
});
const mapDispatchToProps = { setToken: setToken };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarModal);
