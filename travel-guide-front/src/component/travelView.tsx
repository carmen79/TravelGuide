import React, { useEffect } from "react";
import { ITravel, ICheckpoint } from "../interfaces";
import { RouteComponentProps } from "react-router";
import MapContainer from './map';
import { Carousel, Card, CardTitle, Modal } from 'react-materialize';
import * as Constants from '../Constants';


const TravelView: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const [travel, setTravel] = React.useState();
  const [checkpoints, setCheckpoints] = React.useState();
  const [currentCheckPoint, setCurrentCheckpoint] = React.useState();
  const [zoom, setZoom] = React.useState(12);

  const getTravel = () => {
    fetch("http://localhost:3000/api/travels/" + props.match.params.id, {
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        console.log("getTravel OK!!");
        res.json().then((travel: ITravel) => {
          console.log("travel recuperado: " + JSON.stringify(travel));
          setTravel(travel);
          getCheckpoints(travel);
        });
      }
    });
  };

  const getCheckpoints = (aTravel: ITravel) => {
    console.log("getCheckpoints");
    fetch("http://localhost:3000/api/checkpoint?travelId=" + aTravel._id, {
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        res.json().then((checkpoints: ICheckpoint[]) => {
          console.log("getCheckpoints OK!!" + JSON.stringify(checkpoints));
          setCheckpoints(checkpoints);
          let cp: ICheckpoint = {
            _id: "",
            description: aTravel.descripcion,
            title: aTravel.destino,
            lat: aTravel.lat,
            lng: aTravel.lng,
            photo: ""
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

  useEffect(() => {
    getTravel();
  }, []);


  const travelPhoto = travel ? travel.photo : "";


  return (
    <div className="margins">
      <h4>Esta es la experiencia en {travel && travel.destino}: "{travel && travel.descripcion}"</h4>
      <div className="card">
        <div className="card-content row">
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
            <div className="row">
              <div className="col s12 ">
                <h5>Resumen:</h5>
                <span>{travel && travel.summary}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col s6 ">
          <h5>Localizaciones</h5>
          {currentCheckPoint && <MapContainer zoom={zoom} checkpoint={currentCheckPoint} />}
        </div>
        <div className="col s6 ">
          <h5>La experiencia en imágenes</h5>
          {checkpoints &&
            <Carousel>
              <a target="_blank" href={Constants.URL_PHOTO_TRAVELS + travelPhoto}>
                <img src={Constants.URL_PHOTO_TRAVELS + travelPhoto} />
              </a>
              {checkpoints.map((cp: ICheckpoint) => (
                <a target="_blank" href={Constants.URL_PHOTO_CHECKPOINT + cp.photo}>
                  <img src={Constants.URL_PHOTO_CHECKPOINT + cp.photo} alt={cp.description} />
                </a>
              ))
              }

            </Carousel>
          }
        </div>
      </div>
      <div className="row">
        <h5>Lugares de interés</h5>
        {checkpoints &&
          checkpoints.map((cp: ICheckpoint) => (
            <div className="col s3" style={{ cursor: "pointer" }} onClick={() => selectCheckpoint(cp)}>
              <Card title={cp.title} header={<CardTitle image={Constants.URL_PHOTO_CHECKPOINT + cp.photo}></CardTitle>}>
                {cp.description}
              </Card>
            </div>
          ))
        }
        {(!checkpoints || checkpoints.length === 0) &&
          <h5>El usuario no ha registrado lugares de interés para esta experiencia</h5>
        }
      </div>
    </div >
  );
};


export default TravelView;
