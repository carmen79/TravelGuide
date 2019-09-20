import React from "react";
import { ITravel } from "../interfaces";
import { IGlobalState } from "../Reducers/reducers";
import { connect } from "react-redux";
import { Button } from 'react-materialize';
import cities from "cities.json";
import { Autocomplete } from 'react-materialize';

interface IPropsGlobal {
  token: string;
  travel: ITravel;
  callback: any;
}

const EditTravel: React.FC<IPropsGlobal> = props => {
  const [destinoValue, setDestino] = React.useState(props.travel.destino);
  const [fechaInicioValue, setFechaInicio] = React.useState(props.travel.fechaInicio);
  const [fechaFinValue, setFechaFin] = React.useState(props.travel.fechaFin);
  const [descripcionValue, setDescripcion] = React.useState(props.travel.descripcion);
  const [publicValue, setPublic] = React.useState(props.travel.public);
  const [categoryValue, setCategory] = React.useState(props.travel.category);
  const [file, setFile] = React.useState();

  var citiesString = "{";

  (cities as Array<any>).forEach(city => {
    citiesString += "\"" + city.name + " (" + city.country + ")\" : null, ";
  });
  citiesString += " \"null\" : null}";
  var myCitiesJson = JSON.parse(citiesString);

  const updateDestino = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  const updateCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };
  const handleFileUpload = (event: any) => {
    setFile(event.target.files[0]);
  }

  const addTravel = () => {
    // Obtener la latitud y longitud una vez tenemos el nombre, buscar en cities.json
    let cityJson = undefined;
    let lat = Number();
    let lng = Number();
    if (destinoValue) {
      cityJson = (cities as Array<any>).find((data: any) => data.name === destinoValue);
      if (cityJson) {
        lat = Number(cityJson.lat);
        lng = Number(cityJson.lng);
      }
    }

    fetch("http://localhost:3000/api/travels/" + props.travel._id, {
      method: "put",
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
        public: publicValue,
        category: categoryValue
      })
    }).then(res => {
      if (res.ok) {
        if (file) {
          sendPicture(props.travel, file);
        } else {
          props.callback();
        }
      }
    });
  };

  const sendPicture = (travel: ITravel, theFile: any) => {
    if (travel && travel._id !== "" && theFile && theFile !== "") {
      const data = new FormData();
      data.append("photo", theFile);

      fetch("http://localhost:3000/api/travels/" + travel._id + "/photo", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + props.token
        }, body: data
      }).then(res => {
        if (res.ok) {
          console.log("UPLOAD travel photo OK!");
          props.callback();
        } else {
          console.log("UPLOAD travel photo ERROR!");
        }
      }).catch(error => {
        console.log("UPLOAD travel photo ERROR!");
        alert("Error cargando travel photo.");
      });;
    }
  };

  const publicSelected = props.travel.public;

  return (
    <div className="margins height100">
      <div className="card-panel mynav back">
        <h4>Edita los datos de tu experiencia</h4>
      </div>
      <Autocomplete options={{
        data: myCitiesJson,
        minLength: 2,
        limit: 10,
      }}
        value={props.travel && props.travel.destino}
        onChange={updateDestino}
        placeholder="Introduce el destino de tu viaje"
        icon="location_on"
        id="auto"
      />
      <div className="row">
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
        <div className="input field col s12">
          <label htmlFor="desc">Introduce una descripción de tu viaje</label>
          <input id="desc" value={descripcionValue} type="text" onChange={updateDescripcion} />
        </div>
        <div className="input field col s12">
          <select className="browser-default" defaultValue={props.travel.category} onChange={updateCategory}>
            <option value="Viaje en familia" >Viaje en familia</option>
            <option value="Romántico" >Romántico</option>
            <option value="Mochilero solitario" >Mochilero solitario</option>
            <option value="Viaje en grupo con amigos" >Viaje en grupo con amigos</option>
          </select>
          <label>Selecciona una categoría</label>
        </div>
        <p>&nbsp;</p>
        <div className="file-field input-field">
          <div className="btn">
            <span><i className="small material-icons left">add_a_photo</i></span>
            <input type="file" onChange={handleFileUpload} />
          </div>

          <div className="file-path-wrapper">
            <input className="file-path validate" type="text"
              placeholder="Selecciona una nueva foto de portada de tu viaje" />
          </div>
        </div>

        <div className="input field col s12">
          <label>
            <input id="public" onChange={updatePublic} type="checkbox" className="filled-in" defaultChecked={publicSelected} />
            <span>¿Quieres que tu experiencia sea visible a otros usuarios?</span>
          </label>
        </div>
        <p>&nbsp;</p>
        <div className="input field col s6">
          <Button className="modal-close waves-effect waves-light  mybuttonnav back" onClick={addTravel}><i className="small material-icons left">edit</i>Editar Experiencia</Button>
        </div>
        <div className="input field col s6">
          <Button className="modal-close waves-effect waves-light  mybuttonnav back"><i className="small material-icons left">cancel</i>Cancelar</Button>
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
});

export default connect(
  mapStateToProps
)(EditTravel);
