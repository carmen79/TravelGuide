import React, { useState } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { Modal, Button } from 'react-materialize';
import { ITravel } from '../interfaces'
import { removeTravel } from "../Actions/actions";
import travelList from "./travelList";

interface IPropsGlobal {
  token: string;
  travel: ITravel;
  travels: ITravel[];
  removeTravel: (travel_id: string) => void;
}

const TravelCard: React.FC<IPropsGlobal> = props => {
  let travelProfileUrl = "/travelProfile/" + props.travel._id;

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
        // Refrescar redux
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
        <img src="/img/usercardback2.jpg" className="imgtravelcard" />
        <span className="card-title">Mi viaje a {props.travel.destino}</span>
      </div>
      <div className="card-content">
        <h5>{props.travel.descripcion}</h5>
        <p>Desde:  {props.travel.fechaInicio} Hasta: {props.travel.fechaFin} </p>
        <div className="card-action" >
          <a href={travelProfileUrl}>Edita tu experiencia</a>
          <Modal style={styleHeight} trigger={triggerDeleteTravel} actions={null} >
            <div >
              <div className="card-panel mynav back">
                <h5 style={styleWhite} >¿Confirmas que deseas cerrar eliminar esta experiencia?</h5>
              </div>

              <div className="flex-container">
                <div>
                  <button className="modal-close waves-effect waves-light btn mybutton back" onClick={deleteTravel}>
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
export default connect(mapStateToProps, mapDispatchToProps)(TravelCard);

