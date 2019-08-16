import React from "react";
import { ITravel } from "../interfaces";
import { IGlobalState } from "../Reducers/reducers";
import { connect } from "react-redux";
import { RouteComponentProps, Redirect } from "react-router-dom";
import * as actions from "../Actions/actions";
import { Button } from 'react-materialize';
import cities from "cities.json";
import { Autocomplete } from 'react-materialize';
import MapContainer from './map';

interface IPropsGlobal {
  token: string;
  addTravel: (travel: ITravel) => void;
  travel: ITravel;
}

const NewCheckpoint: React.FC<IPropsGlobal> = props => {
  const [destinoValue, setDestino] = React.useState("");
  const [fechaInicioValue, setFechaInicio] = React.useState("");
  const [fechaFinValue, setFechaFin] = React.useState("");
  const [descripcionValue, setDescripcion] = React.useState("");
  const [publicValue, setPublic] = React.useState(true);

  const latlng = { lat: props.travel.lat, lng: props.travel.lng }

  const updateDestino = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("DEST: " + event.target.value);
    setDestino(event.target.value);
  };
  const updateFechaInicio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFechaInicio(event.target.value);
  };
  const updateFechaFin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFechaFin(event.target.value);
  };
  const updateDescripcion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescripcion(event.target.value);
  };
  const updatePublic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublic(event.target.checked);
  };

  const addTravel = () => {

    fetch("http://localhost:3000/api/travels", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },

      body: JSON.stringify({
        destino: destinoValue,
        fechaInicio: fechaInicioValue,
        fechaFin: fechaFinValue,
        descripcion: descripcionValue,
        lat: 0,
        lng: 0,
        public: publicValue
      })
    }).then(res => {
      if (res.ok) {
        res.json().then(t => {
          props.addTravel(t);
        });
      }
    });
  };

  return (
    <div className="">
      <div className="card-panel mynav back">
        <h5>Introduce los datos del lugar y selecciona una posición en el mapa</h5>
      </div>

      <div className="form-group">
        Aquí tenemos que poner los campos de formulario de un checkpoint y el mapa.
        Cuando hacemos click en el mapa, la lat. y lng se guardan para ese checkpoint.
        También hay que cargar una foto
        <div>
          <Button className="waves-effect waves-light  mybuttonnav back" onClick={addTravel}><i className="small material-icons left">library_add</i>Crear lugar</Button>
        </div>
        <div className="col s12">
          {/*<MapContainer zoom={8} latLng={JSON.stringify(latlng)} />*/}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  travels: state.travels
});
const mapDispatchToProps = {
  addTravel: actions.addTravel
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCheckpoint);
