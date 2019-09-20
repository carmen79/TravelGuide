import React from "react";
import { Modal } from 'react-materialize';

interface IProps {
  msg: string;
  callback: any;
  trigger: any;
  data?: any;
}

const Confirm: React.FC<IProps> = props => {
  function callCallback() {
    if (props.callback && typeof props.callback === 'function') {
      props.callback(props.data);
    }
  }

  const styleWhite = {
    color: 'white'
  };

  const styleHeight = {
    height: '200px'
  };

  return (
    <Modal className="modalbox" style={styleHeight} trigger={props.trigger} actions={null} >
      <div >
        <div className="card-panel mynav back">
          <h5 style={styleWhite} >{props.msg}</h5>
        </div>

        <div className="flex-container">
          <div>
            <button className="modal-close waves-effect waves-light btn mybuttonnav back" onClick={callCallback}>
              <i className="material-icons left">check_circle</i>
              Sí
            </button>
          </div>
          <div>
            <button className="modal-close waves-effect waves-light btn mybuttonnav back">
              <i className="material-icons left">cancel</i>Cancelar</button>
          </div>
        </div>
      </div >
    </Modal>

  );
};

export default Confirm
