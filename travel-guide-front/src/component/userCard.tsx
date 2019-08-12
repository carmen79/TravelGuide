import React, { useState } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { Modal, Button } from 'react-materialize';
import { IUser } from '../interfaces'
import { setUser } from "../Actions/actions";
import * as Constants from '../Constants';
import { userInfo } from "os";

interface IPropsGlobal {
  token: string;
  user: IUser;
  setUserInterno: (u: IUser) => void;
}

const UserCard: React.FC<IPropsGlobal> = props => {
  const [file, setFile] = useState();

  var urlPhoto = "/img/nouser.jpg";

  if (props.user.avatar) {
    urlPhoto = Constants.URL_PHOTO_AVATAR + props.user.avatar;
  }
  var triggerChangePhoto = <img src={urlPhoto} className="waves-effect waves-light imgusercard" />;

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

  const myStyle = { width: '300px' };

  return (
    <div>
      {props.user && render()}
    </div>
  );

  function render() {
    return (
      <div>
        <div className="card" style={myStyle}>
          <div className="card-image imgcardback" >
            <span className="card-title">{props.user.username}</span>
          </div>
          <div className="card-content">
            <div className="row">
              <div className="col s1">
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
              </div>
              <div className="col s11 push-s4">
                {props.user.email}
              </div>
            </div>
            <p>
              {!props.user.description && "Edita tu perfil e introduce una descripción"}
              {props.user.description && props.user.description}
            </p>
          </div>
          <div className="card-action">
            <a href="#">Editar perfil</a>
          </div>
        </div>
      </div>

    );
  }
};

const mapDispatchToProps = { setUserInterno: setUser };
const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  user: state.user
});
export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
