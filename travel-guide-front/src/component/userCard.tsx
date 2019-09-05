import React, { useState } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { Modal, Button } from 'react-materialize';
import { IUser } from '../interfaces'
import { setUser, addTravel } from "../Actions/actions";
import * as Constants from '../Constants';
import { ITravel } from '../interfaces';
import NewTravelModal from './newTravelModal'
import EditUserModal from "./editUserModal";

interface IPropsGlobal {
  token: string;
  user: IUser;
  travels: ITravel[];
  setUserInterno: (u: IUser) => void;
  addTravel: (travel: ITravel) => void;
}

const UserCard: React.FC<IPropsGlobal> = props => {
  const [file, setFile] = useState();

  var urlPhoto = "/img/nouser.jpg";

  if (props.user && props.user.avatar) {
    urlPhoto = Constants.URL_PHOTO_AVATAR + props.user.avatar;
  }
  var triggerChangePhoto = <img src={urlPhoto} className="waves-effect waves-light imgusercard" />;
  var dateFrom = "";
  if (props.user && props.user.time) {
    dateFrom = new Date(props.user.time).toLocaleDateString();
  }

  const send = () => {
    const data = new FormData();
    data.append("avatar", file);

    fetch("http://localhost:3000/api/users/avatar/" + props.user._id, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + props.token
      }, body: data
    }).then(res => {
      console.log("Response from upload avatar:" + res);
      if (res.ok) {
        console.log("UPLOAD AVATAR OK!");
        res.json().then(userJson => {
          props.setUserInterno(userJson);
        })
      } else {
        console.log("UPLOAD AVATAR ERROR!");
      }
    }).catch(error => {
      console.log("UPLOAD AVATAR ERROR!");
      alert("Error cargando avatar.");
    });;
  };

  const handleFileUpload = (event: any) => {
    setFile(event.target.files[0]);
  }

  const newTravelCallback = (travel: ITravel) => {
    props.addTravel(travel);
  }

  const editUserTrigger = <a href="/editUser">Editar perfil</a>
  const newTravelTrigger = <a href="/newTravel">Inicia una nueva experiencia</a>
  return (
    <div className="card">
      <div className="card-image imgusercardback" >
      </div>
      <div className="card-content">
        <div className="row">
          <div className="col s4">
            <Modal trigger={triggerChangePhoto} actions={null}>
              <div className="card-panel mynav back">
                <h5>Actualiza tu foto de perfil</h5>
              </div>
              <div className="row">
                <form >
                  <div className="file-field input-field">
                    <div className="btn">
                      <span><i className="small material-icons left">add_a_photo</i></span>
                      <input type="file" onChange={handleFileUpload} />
                    </div>

                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text"
                        placeholder="Selecciona fichero" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex-container">
                <div>
                  <Button onClick={send} className="waves-effect waves-light mybuttonnav back modal-close"><i className="small material-icons left">account_circle</i>Cargar foto</Button>
                </div>
                <div>
                  <Button className="waves-effect waves-light mybuttonnav back modal-close"><i className="small material-icons left">cancel</i>Cancelar</Button>
                </div>
              </div>
            </Modal>
            <p>
              <br /><b>Tu dirección de correo actual:</b><br /><i className="tiny material-icons">email</i> {props.user.email}
            </p>
            <p>
              <br /><b>Sobre ti:</b><br />
              <i>
                {!props.user.description && "Edita tu perfil e introduce una descripción para que los usuarios sepan más de ti"}
                <blockquote>
                  {props.user.description && props.user.description}
                </blockquote>
              </i>
              {dateFrom &&
                <p>
                  Compartiendo experiencias desde {dateFrom}
                </p>
              }
            </p>
          </div>
          <div className="col s8 ">
            <h4>Hola {props.user.username}!</h4>
            <h6>Desde tu perfil podrás modificar tu datos o crear nuevas experiencias para compartir.</h6>
            <p>
              {props.travels && props.travels.length > 0 &&
                "Abajo tienes tu lista de viajes! Puedes verlos o editarlos cuando lo desees."}
              {!props.travels || props.travels.length === 0 &&
                "Aún no has dado de alta experiencias, anímate y compártelas en tu red!"}
            </p>
          </div>
        </div>
      </div>
      <div className="card-action">
        <Modal actions={null} trigger={editUserTrigger}>
          <EditUserModal />
        </Modal>
        <Modal actions={null} trigger={newTravelTrigger}>
          <NewTravelModal callback={newTravelCallback} />
        </Modal>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  setUserInterno: setUser,
  addTravel: addTravel
};
const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  user: state.user,
  travels: state.travels
});
export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
