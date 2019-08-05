import React from "react";
import { ITravel} from "../interfaces";
import { IGlobalState } from "../Reducers/reducers";
import { connect } from "react-redux";
import { RouteComponentProps, Redirect } from "react-router-dom";
import * as actions from "../Actions/actions";

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
        descripcion: descripcionValue
      })
    }).then(res => {
      if (res.ok) {
        res.json().then(t => {
          props.addTravel(t);
          props.history.push("/");
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="form-group">
        <div>
          <h5>Destino</h5>
          <input value={destinoValue} type="text" onChange={updateDestino} />
        </div>
        <div>
          <h5>Fecha Inicio</h5>
          <input value={fechaInicioValue} type="text" onChange={updateFechaInicio} />
        </div>
        <div>
          <h5>Fecha Fin</h5>
          <input value={fechaFinValue} type="text" onChange={updateFechaFin} />
        </div>
        <div>
          <h5>Descripción</h5>
          <input value={descripcionValue} type="text" onChange={updateDescripcion} />
        </div>


        <div>
          <button onClick={addTravel}>enviar</button>
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
