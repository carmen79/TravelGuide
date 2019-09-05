import React from "react";
import { ITravel, ICheckpoint } from "../interfaces";
import { IGlobalState } from "../Reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../Actions/actions";
import { Button } from 'react-materialize';
import MapContainer from './map';

interface IPropsGlobal {
  token: string;
  checkpoint: ICheckpoint;
  callback: any;
}

const EditCheckpoint: React.FC<IPropsGlobal> = props => {
  const [titleValue, setTitle] = React.useState(props.checkpoint.title);
  const [descriptionValue, setDescription] = React.useState(props.checkpoint.description);
  const [lat, setLat] = React.useState(props.checkpoint.lat);
  const [lng, setLng] = React.useState(props.checkpoint.lng);

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

  const editCheckpoint = () => {

    fetch("http://localhost:3000/api/checkpoint/" + props.checkpoint._id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },

      body: JSON.stringify({
        title: titleValue,
        description: descriptionValue,
        lat: lat,
        lng: lng
      })
    }).then(res => {
      if (res.ok) {
        callCallback();
      }
    });
  };

  function callCallback() {
    if (props.callback && typeof props.callback === 'function') {
      props.callback();
    }
  }

  return (
    <div className="">
      <div className="card-panel mynav back">
        <h5>Introduce los datos del lugar y selecciona una posición en el mapa</h5>
      </div>

      <div className="form-group row">
        <div className="col s6">
          <div>
            <label htmlFor="title">Introduce título para este momento</label>
            <input id="title" value={titleValue} type="text" onChange={updateTitle} />
          </div>
          <div>
            <label htmlFor="desc">Introduce una descripción</label>
            <input id="desc" value={descriptionValue} type="text" onChange={updateDescription} />
          </div>

          <div className="flex-container">
            <div>
              <Button className="modal-close waves-effect waves-light  mybuttonnav back" onClick={editCheckpoint}><i className="small material-icons left">library_add</i>Editar lugar</Button>
            </div>
            <div>
              <Button className="modal-close waves-effect waves-light  mybuttonnav back"><i className="small material-icons left">cancel</i>Cancelar</Button>
            </div>
          </div>
        </div>
        <div className="col s6">
          <MapContainer zoom={16} clickCallback={handleMapClick} checkpoint={props.checkpoint} clickable={true} />
        </div>
      </div >
    </div >
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});
export default connect(
  mapStateToProps,
  null
)(EditCheckpoint);
