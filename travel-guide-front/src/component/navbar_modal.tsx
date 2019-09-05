import React from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { setToken, setUser, setTravels } from "../Actions/actions";
import { RouteComponentProps } from 'react-router-dom'
import Login from './login'
import AddUser from './addUser'
import { Modal, Button } from 'react-materialize';
import { IUser, ITravel } from '../interfaces'
import * as Constants from '../Constants';
import Confirm from "./cofirm";


interface IPropsGlobal {
  token: string;
  user: IUser;
  setToken: (t: string | null) => void;
  setUser: (u: IUser | null) => void;
  setTravels: (tv: ITravel | null) => void;
}

const NavbarModal: React.FC<IPropsGlobal & RouteComponentProps> = props => {

  var urlPhoto = "/img/nouser.jpg";

  if (props.user && props.user.avatar) {
    urlPhoto = Constants.URL_PHOTO_AVATAR + props.user.avatar;
  }

  const removeToken = () => {
    props.setToken(null);
    props.setUser(null);
    props.setTravels(null);
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
      <ul id="nav-mobile" className="right hide-on-med-and-down ">
        <li className="waves-effect waves-light" onClick={goToUserProfile} >
          <img src={urlPhoto} className="imguser" />
        </li>
        <li className="waves-effect waves-light mynav profile" onClick={goToUserProfile} >
          {props.user && props.user.username}
        </li>
        <li id="loginLi">
          <Confirm msg="¿Estás seguro que deseas cerrar la sesión?" callback={removeToken} trigger={triggerCloseSesion}  >

          </Confirm>

        </li>
      </ul >
    );
  }

  return (

    <nav className="nav-wrapper mynav back">
      <a href="/" className="brand-logo">Travel <img height="50px" width="50px" margin-top="12px" src="/img/logotransp.png"></img>
        &nbsp;Experiences</a>
      {!props.token && renderNoUser()}
      {props.token && renderUser()}
    </nav>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  user: state.user
});
const mapDispatchToProps = { setToken: setToken, setUser: setUser, setTravels: setTravels };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarModal);
