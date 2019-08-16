import React from "react";
import { ITravel } from "../interfaces";
import { IGlobalState } from "../Reducers/reducers";
import { connect } from "react-redux";
import { RouteComponentProps, Redirect } from "react-router-dom";
import * as actions from "../Actions/actions";
import { Button } from 'react-materialize';
import cities from "cities.json";
import { Autocomplete } from 'react-materialize';

interface IPropsGlobal {
  token: string;
  addTravel: (travel: ITravel) => void;
  travel: ITravel[];
}

const NewTravel: React.FC<IPropsGlobal & RouteComponentProps> = props => {
  const [destinoValue, setDestino] = React.useState("");
  const [fechaInicioValue, setFechaInicio] = React.useState("");
  const [fechaFinValue, setFechaFin] = React.useState("");
  const [descripcionValue, setDescripcion] = React.useState("");
  const [publicValue, setPublic] = React.useState(true);

  var citiesString = "{";

  cities.map(city => {
    citiesString += "\"" + city.name + " (" + city.country + ")\" : null, ";
  });
  citiesString += " \"null\" : null}";
  var myCitiesJson = JSON.parse(citiesString);

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
    // Obtener la latitud y longitud una vez tenemos el nombre, buscar en cities.json
    let cityJson = undefined;
    let lat = Number();
    let lng = Number();
    if (destinoValue) {
      cityJson = cities.find((data: any) => data.name === destinoValue);
      if (cityJson) {
        lat = Number(cityJson.lat);
        lng = Number(cityJson.lng);
      }
    }

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
        lat: lat,
        lng: lng,
        public: publicValue
      })
    }).then(res => {
      if (res.ok) {
        res.json().then(t => {
          props.addTravel(t);
          props.history.push("/userProfile");
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="form-group">
        <div>
          <Autocomplete options={{
            data: myCitiesJson,
            minLength: 2,
            limit: 10,
          }}
            onChange={updateDestino}
            placeholder="Introduce el destino de tu viaje"
            icon="location_on"
            id="auto"
          />
        </div>
        <div className="input field col s6">
          <h6>Fecha Inicio</h6>
          <i className="material-icons prefix">date_range</i>
          <input id="datefrom" value={fechaInicioValue} type="date" onChange={updateFechaInicio} className="validate" />
        </div>
        <div className="input field col s6">
          <h6>Fecha Fin</h6>
          <i className="material-icons prefix">date_range</i>
          <input id="dateto" value={fechaFinValue} type="date" onChange={updateFechaFin} className="validate" />
        </div>
        <div>
          <label htmlFor="desc">Introduce una descripción de tu viaje</label>
          <input id="desc" value={descripcionValue} type="text" onChange={updateDescripcion} />
        </div>
        <div>
          <label>
            <input id="public" onChange={updatePublic} type="checkbox" className="filled-in" />
            <span>¿Quieres que tu experiencia sea visible a otros usuarios?</span>
          </label>
        </div>

        <div>
          <Button className="waves-effect waves-light  mybuttonnav back" onClick={addTravel}><i className="small material-icons left">library_add</i>Crear Experiencia</Button>
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
)(NewTravel);
