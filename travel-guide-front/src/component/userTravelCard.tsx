import React from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { ITravel } from '../interfaces'
import { removeTravel } from "../Actions/actions";
import Confirm from "./cofirm";
import * as Constants from '../Constants';

interface IPropsGlobal {
  token: string;
  travel: ITravel;
  removeTravel: (travel_id: string) => void;
}

const UserTravelCard: React.FC<IPropsGlobal> = props => {
  let travelProfileUrl = "/userTravelView/" + props.travel._id;
  let urlPhoto = "/img/notravel.jpg"

  if (props.travel.photo) {
    urlPhoto = Constants.URL_PHOTO_TRAVELS + props.travel.photo;
  }

  const deleteTravel = () => {
    console.log("Deleting travel with id: " + props.travel._id);
    fetch("http://localhost:3000/api/travels/" + props.travel._id, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then((res) => {
      if (res.ok) {
        console.log("Viaje borrado correctamente");
        props.removeTravel(props.travel._id);
      }
    });
  };

  const triggerDeleteTravel = <a href="#" onClick={deleteTravel}>Eliminar Viaje</a>

  const styleWhite = {
    color: 'white'
  };

  const styleHeight = {
    height: '200px'
  };

  return (
    <div className="card" >
      <div className="card-image" >
        <img src={urlPhoto} className="imgtravelcard" />
        <span className="card-title"><b>Mi viaje a {props.travel.destino}</b></span>
      </div>
      <div className="card-content">
        <h5>{props.travel.descripcion}</h5>
        <p>Desde:  {props.travel.fechaInicio} Hasta: {props.travel.fechaFin} </p>
        <div className="card-action" >
          <a href={travelProfileUrl}>Edita tu experiencia</a>
          <Confirm msg="¿Confirmas que deseas cerrar eliminar esta experiencia?"
            callback={deleteTravel} trigger={triggerDeleteTravel}></Confirm>
        </div>

      </div>
    </div>

  );
};

const mapDispatchToProps = {
  removeTravel: removeTravel
};
const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  travels: state.travels,
});
export default connect(mapStateToProps, mapDispatchToProps)(UserTravelCard);


