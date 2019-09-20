import React from "react";
import { ITravel, ICheckpoint, IUser } from "../interfaces";
import { RouteComponentProps } from "react-router";
import MapContainer from './map';
import { Carousel, Card, CardTitle, Modal } from 'react-materialize';
import * as Constants from '../Constants';
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import NewCheckpoint from './newCheckpoint';
import EditCheckpoint from './editCheckpoint';
import Confirm from "./cofirm";
import UploadCheckpointPhoto from "./uploadCheckpointPhoto";
import EditTravel from "./editTravel";
import EditTravelSummary from "./editTravelSummary";

interface IPropsGlobal {
  token: string;
  user: IUser;
}

const UserTravelView: React.FC<IPropsGlobal & RouteComponentProps<{ id: string }>> = props => {
  const [travel, setTravel] = React.useState();
  const [checkpoints, setCheckpoints] = React.useState();
  const [currentCheckPoint, setCurrentCheckpoint] = React.useState();
  const [zoom, setZoom] = React.useState(12);

  const getTravel = () => {
    console.log("GET TRAVEL AGAIN");
    fetch("http://localhost:3000/api/travels/" + props.match.params.id, {
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        res.json().then((travel: ITravel) => {
          console.log("Travel recuperado: " + JSON.stringify(travel));
          getCheckpoints(travel);
          setTravel(travel);
        });
      }
    });
  };

  const getCheckpoints = (aTravel: ITravel) => {
    fetch("http://localhost:3000/api/checkpoint?travelId=" + aTravel._id, {
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        res.json().then((checkpoints: ICheckpoint[]) => {
          setCheckpoints(checkpoints);
          let cp: ICheckpoint = {
            _id: "",
            description: aTravel.descripcion,
            title: aTravel.destino,
            lat: aTravel.lat,
            lng: aTravel.lng,
            photo: aTravel.photo
          };
          setCurrentCheckpoint(cp);
        });
      }
    });
  };

  function selectCheckpoint(cp: ICheckpoint) {
    setZoom(17);
    setCurrentCheckpoint(cp);
  }

  function reloadCheckpoints() {
    let cp: ICheckpoint = {
      _id: "",
      description: travel.descripcion,
      title: travel.destino,
      lat: travel.lat,
      lng: travel.lng,
      photo: travel.photo
    };
    setCurrentCheckpoint(cp);
    getCheckpoints(travel);
  }

  if (!travel) {
    getTravel();
  }

  const send = (checkpointId: string, theFile: any) => {
    if (checkpointId && checkpointId !== "" && theFile && theFile !== "") {
      const data = new FormData();
      data.append("photo", theFile);

      fetch("http://localhost:3000/api/checkpoint/" + checkpointId + "/photo", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + props.token
        }, body: data
      }).then(res => {
        if (res.ok) {
          console.log("UPLOAD checkpoint photo OK!");
          reloadCheckpoints();
        } else {
          console.log("UPLOAD checkpoint photo ERROR!");
        }
      }).catch(error => {
        console.log("UPLOAD checkpoint photo ERROR!");
        alert("Error cargando checkpoint photo.");
      });;
    }
  };


  function deleteCheckpoint(checkpointId: string) {
    if (props.token) {
      fetch("http://localhost:3000/api/checkpoint/" + checkpointId, {
        method: "delete",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + props.token
        }
      }).then(res => {
        if (res.ok) {
          reloadCheckpoints();
        }
      });
    }
  }

  const triggerAddCheckpoint = <span style={{ cursor: "pointer" }}>Agrega una nueva visita <i className="small material-icons left">control_point</i></span>
  const triggerChangePhoto = <span className="cardlink" style={{ cursor: "pointer" }}>Cargar Foto</span>
  const deleteCheckpointTrigger = <span className="cardlink" style={{ cursor: "pointer" }}>Eliminar</span>
  const triggerEditCheckpoint = <span className="cardlink" style={{ cursor: "pointer" }}>Editar</span>
  const triggerEditTravel = <span className="cardlink" style={{ cursor: "pointer" }}>Editar viaje</span>
  const triggerEditTravelSummary = <span className="cardlink" style={{ cursor: "pointer" }}>Resumen de viaje</span>

  const styleModalCheckpoint = {
    height: '520px',
    width: '1100px'
  };

  const styleModalEditTravel = {
    height: '620px',
    width: '800px'
  };

  const styleModalEditTravelSummary = {
    height: '470px',
    width: '800px'
  };

  const travelPhoto = travel && travel.photo ? travel.photo : "";

  return (
    <div className="margins">
      <h4>{props.user.username}, esta es tu experiencia en  {travel && travel.destino}: "{travel && travel.descripcion}"</h4>
      <div className="card">
        <div className="card-content">
          <div className="row">
            <div className="col s4 ">
              <span className="valign-wrapper">
                <i className="material-icons medium traveliconblue">location_on</i> {travel && travel.destino}
              </span>
            </div>
            <div className="col s4 ">
              <span className="valign-wrapper">
                <i className="material-icons medium traveliconblue">date_range</i>
                {travel && "Desde " + travel.fechaInicio + " hasta " + travel.fechaFin}
              </span>
            </div>
            <div className="col s4 ">
              <span className="valign-wrapper">
                <i className="material-icons medium traveliconblue">picture_in_picture</i>
                {travel && travel.category && travel.category !== "" && travel.category}
                {(travel && (!travel.category || travel.category === "")) && "Sin categoría asignada"}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col s12 ">
              <h5>Resumen:</h5>
              <span>{travel && travel.summary}</span>
            </div>
          </div>
        </div>
        <div className="card-action" >
          {travel &&
            <Modal className="modalbox" style={styleModalEditTravel} trigger={triggerEditTravel} actions={null}>
              <EditTravel travel={travel} callback={getTravel} />
            </Modal>
          }
          {travel &&
            <Modal className="modalbox" style={styleModalEditTravelSummary} trigger={triggerEditTravelSummary} actions={null}>
              <EditTravelSummary travel={travel} callback={getTravel} />
            </Modal>
          }
        </div>
      </div>
      <div className="row">
        <div className="col s6 ">
          <h5>Localizaciones</h5>
          {currentCheckPoint && <MapContainer zoom={zoom} checkpoint={currentCheckPoint} />}
        </div>
        <div className="col s6 ">
          <h5>Tu experiencia en imágenes</h5>
          <small>(Añade o edita lugares para aumentar la galería)</small>
          {checkpoints &&
            <Carousel>
              {travelPhoto &&
                <a target="_blank" rel="noopener noreferrer" href={Constants.URL_PHOTO_TRAVELS + travelPhoto}>
                  <img alt="" src={Constants.URL_PHOTO_TRAVELS + travelPhoto} />
                </a>
              }

              {checkpoints.map((cp: ICheckpoint) => (
                <a key={cp._id} target="_blank" rel="noopener noreferrer" href={Constants.URL_PHOTO_CHECKPOINT + cp.photo}>
                  <img src={Constants.URL_PHOTO_CHECKPOINT + cp.photo} alt={cp.description} />
                </a>
              ))
              }
            </Carousel>
          }
        </div>
      </div>
      <div className="row">
        <h5>Estos son los lugares de interés de tu experiencia</h5>
        {travel &&
          <Modal className="modalbox" style={styleModalCheckpoint} trigger={triggerAddCheckpoint} actions={null}>
            <NewCheckpoint travel={travel} callback={getTravel} />
          </Modal>
        }
      </div>
      <div className="row">
        {checkpoints &&
          checkpoints.map((cp: ICheckpoint) => (
            <div key={cp._id} className="col s3" >
              <Card style={{ height: 400, overflow: 'hidden' }} key={"C" + cp._id}
                actions={[
                  <Modal className="modalbox" key={cp._id} style={styleModalCheckpoint} trigger={triggerEditCheckpoint} actions={null}>
                    <EditCheckpoint checkpoint={cp} callback={getTravel} />
                  </Modal>,
                  <UploadCheckpointPhoto key={"UP" + cp._id} callback={send} checkpointId={cp._id} trigger={triggerChangePhoto}></UploadCheckpointPhoto>,
                  <Confirm key={"CNF" + cp._id} msg="¿Confirmas la eliminación de este lugar?"
                    data={cp._id}
                    callback={deleteCheckpoint} trigger={deleteCheckpointTrigger}></Confirm>
                ]}
                title={cp.title}
                header={<CardTitle
                  style={{ cursor: "pointer", height: 150, overflow: 'hidden' }} onClick={() => selectCheckpoint(cp)}
                  image={Constants.URL_PHOTO_CHECKPOINT + cp.photo}></CardTitle>}>
                <div >
                  {cp.description}
                </div>

              </Card>

            </div>
          ))
        }
        {(!checkpoints || checkpoints.length === 0) &&
          <h5>Aun no has registrado lugares de interés para esta experiencia</h5>
        }
      </div>
    </div >
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  user: state.user
});

export default connect(mapStateToProps)(UserTravelView);
