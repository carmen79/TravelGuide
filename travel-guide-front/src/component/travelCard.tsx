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
    <div className="card cardheight" >
      <div className="card-image" style={{ height: 150, overflow: 'hidden' }}>
        <a href={travelProfileUrl}>
          <img alt="" src={urlPhoto} className="" />
          <span className="card-title"><b> {props.travel.destino}</b></span>
        </a>
      </div>
      <div className="card-content">
        <h5>{props.travel.descripcion}</h5>
        <p>Desde:  {props.travel.fechaInicio} Hasta: {props.travel.fechaFin} </p>
      </div>
    </div >

  );
};

export default TravelCard;

