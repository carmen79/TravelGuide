import React from "react";
import { RouteComponentProps } from "react-router";

const Footer: React.FC<any & RouteComponentProps> = props => {


  return (
    <div className="home">
      <div className="homeicons">
        <div className="row">
          <div className="col s3">
            <i className="medium material-icons">location_on</i>
          </div>
          <div className="col s3">
            <i className="medium material-icons">add_a_photo</i>
          </div>
          <div className="col s3">
            <i className="medium material-icons">comment</i>
          </div>
          <div className="col s3">
            <i className="medium material-icons">share</i>
          </div>
        </div>
        <div className="row">
          <div className="col s3">
            Busca un destino
            </div>
          <div className="col s3">
            Explora lugares
            </div>
          <div className="col s3">
            Comenta tu experienca
            </div>
          <div className="col s3">
            Comparte en la red
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
