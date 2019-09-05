import React from "react";
import { Modal, Button } from 'react-materialize';

interface IProps {
  callback: any;
  checkpointId: any;
  trigger: any;
}

const UploadCheckpointPhoto: React.FC<IProps> = props => {
  const [file, setFile] = React.useState();

  function callCallback() {
    if (props.callback && typeof props.callback === 'function') {
      props.callback(props.checkpointId, file);
    }
  }

  const handleFileUpload = (event: any) => {
    setFile(event.target.files[0]);
  }

  return (
    <Modal trigger={props.trigger} actions={null}>
      <div className="card-panel mynav back">
        <h5>Selecciona una foto para este lugar</h5>
      </div>
      <div className="row">
        <form >
          <div className="file-field input-field">
            <div className="btn">
              <span><i className="small material-icons left">add_a_photo</i></span>
              <input type="file" onChange={handleFileUpload} />
            </div>

            <div className="file-path-wrapper">
              <input className="file-path validate" type="text"
                placeholder="Selecciona fichero" />
            </div>
          </div>
        </form>
      </div>
      <div className="flex-container">
        <div>
          <Button onClick={callCallback} className="waves-effect waves-light mybuttonnav back modal-close"><i className="small material-icons left">account_circle</i>Cargar foto</Button>
        </div>
        <div>
          <Button className="waves-effect waves-light mybuttonnav back modal-close"><i className="small material-icons left">cancel</i>Cancelar</Button>
        </div>
      </div>
    </Modal>

  );
};

export default UploadCheckpointPhoto;
