import React from "react";
import { ITravel } from '../interfaces'
import * as Constants from '../Constants';

interface IPropsGlobal {
  travel: ITravel;
}

const TravelCard: React.FC<IPropsGlobal> = props => {
  let travelProfileUrl = "/travelView/" + props.travel._id;
  let urlPhoto = "/img/notravel.jpg"

  if (props.travel.photo) {
    urlPhoto = Constants.URL_PHOTO_TRAVELS + props.travel.photo;
  }

  return (
    <div className="card" >
      <div className="card-image" >
        <img src={urlPhoto} className="imgtravelcard" />
        <span className="card-title"><b> {props.travel.destino}</b></span>
      </div>
      <div className="card-content">
        <h5>{props.travel.descripcion}</h5>
        <p>Desde:  {props.travel.fechaInicio} Hasta: {props.travel.fechaFin} </p>
        <div className="card-action" >
          <a href={travelProfileUrl}>Detalle de la experiencia</a>
        </div>
      </div>
    </div>

  );
};

export default TravelCard;

