import React from "react";
import { ITravel } from "../interfaces";
import { IGlobalState } from "../Reducers/reducers";
import { connect } from "react-redux";
import { Button } from 'react-materialize';

interface IPropsGlobal {
  token: string;
  travel: ITravel;
  callback: any;
}

const EditTravelSummary: React.FC<IPropsGlobal> = props => {
  const [summary, setSummary] = React.useState(props.travel.destino);

  const updateSummary = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(event.target.value);
  };

  const addSummary = () => {

    fetch("http://localhost:3000/api/travels/" + props.travel._id + "/summary", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },

      body: JSON.stringify({
        summary: summary,
      })
    }).then(res => {
      if (res.ok) {
        props.callback();
      }
    });
  };

  return (
    <div className="margins height100">
      <div className="card-panel mynav back">
        <h4>Edita el resumen de tu experiencia</h4>
      </div>
      <div className="row">
        <h5>Introduce información útil para otros viajeros</h5>
        <div className="input-field col s12">
          <textarea style={{ height: 200 }} wrap={"true"} rows={20} className="materialize-textarea" defaultValue={props.travel.summary} onChange={updateSummary}></textarea>
        </div>
        <div className="col s6">
          <Button className="modal-close waves-effect waves-light  mybuttonnav back" onClick={addSummary}><i className="small material-icons left">edit</i>Editar Experiencia</Button>
        </div>
        <div className="col s6">
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
)(EditTravelSummary);
