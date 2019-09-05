import React from "react";
import { ITravel, ICheckpoint } from "../interfaces";
import { IGlobalState } from "../Reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../Actions/actions";
import { Button } from 'react-materialize';
import MapContainer from './map';

interface IPropsGlobal {
  token: string;
  addTravel: (travel: ITravel) => void;
  travel: ITravel;
  callback: any;
}

const NewCheckpoint: React.FC<IPropsGlobal> = props => {

  const [file, setFile] = React.useState();
  const [titleValue, setTitle] = React.useState("");
  const [lat, setLat] = React.useState();
  const [lng, setLng] = React.useState();
  const [descriptionValue, setDescription] = React.useState("");

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const updateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleMapClick = (event: any) => {
    setLat(event.lat);
    setLng(event.lng);
  }

  const handleFileUpload = (event: any) => {
    setFile(event.target.files[0]);
  }
  
  const addCheckpoint = () => {

    fetch("http://localhost:3000/api/checkpoint", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },

      body: JSON.stringify({
        title: titleValue,
        description: descriptionValue,
        lat: lat,
        lng: lng,
        travelId: props.travel._id
      })
    }).then(res => {
      if (res.ok) {
        res.json().then( (cp : ICheckpoint)  => {
          sendPicture(cp._id, file);
        });
      }
    });
  };

  const sendPicture = (checkpointId: string, theFile: any) => {
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
          callCallback();
        } else {
          console.log("UPLOAD checkpoint photo ERROR!");
        }
      }).catch(error => {
        console.log("UPLOAD checkpoint photo ERROR!");
        alert("Error cargando checkpoint photo.");
      });;
    }
  };
  
  function callCallback() {
    if (props.callback && typeof props.callback === 'function') {
      props.callback();
    }
  }

  let cp: ICheckpoint = {
    _id: "",
    description: props.travel.descripcion,
    title: props.travel.destino,
    lat: props.travel.lat,
    lng: props.travel.lng,
    photo: ""
  };
  return (
    <div className="">
      <div className="card-panel mynav back">
        <h5>Introduce los datos del lugar y selecciona una posición en el mapa</h5>
      </div>

      <div className="form-group row">
        <div className="col s6">
          <div>
            <label htmlFor="desc">Introduce título para este momento</label>
            <input id="desc" value={titleValue} type="text" onChange={updateTitle} />
          </div>
          <div>
            <label htmlFor="desc">Introduce una descripción</label>
            <input id="desc" value={descriptionValue} type="text" onChange={updateDescription} />
          </div>
          <div className="file-field input-field">
            <div className="btn">
              <span><i className="small material-icons left">add_a_photo</i></span>
              <input type="file" onChange={handleFileUpload} />
            </div>

            <div className="file-path-wrapper">
              <input className="file-path validate" type="text"
                placeholder="Selecciona imagen" />
            </div>
          </div>

          <div className="flex-container">
            <div>
              <Button className="modal-close waves-effect waves-light  mybuttonnav back" onClick={addCheckpoint}><i className="small material-icons left">library_add</i>Crear lugar</Button>
            </div>
            <div>
              <Button className="modal-close waves-effect waves-light  mybuttonnav back"><i className="small material-icons left">cancel</i>Cancelar</Button>
            </div>
          </div>
        </div>
        <div className="col s6">
          <MapContainer zoom={16} clickCallback={handleMapClick} checkpoint={cp} clickable={true} />
        </div>
      </div >
    </div >
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
