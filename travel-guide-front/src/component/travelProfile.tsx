import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { setTravels } from "../Actions/actions";
import { ITravel } from "../interfaces";
import { RouteComponentProps } from "react-router";
import MapContainer from './map';
import NewCheckpoint from './newCheckpoint';
import { Modal, Button } from 'react-materialize';

interface IPropsGlobal {
  token: string;
  travels: ITravel[];
  setTravels: (travels: ITravel[]) => void;
}

const TravelProfile: React.FC<IPropsGlobal & RouteComponentProps<{ id: string }>> = props => {

  const travel: ITravel | undefined = props.travels.find(t => t._id === props.match.params.id);
  if (!travel) {
    props.history.push("/");
  }

  const latlng = { lat: travel.lat, lng: travel.lng }
  const triggerAddCheckpoint = <Button className="waves-effect waves-light  mybuttonnav back"><i className="small material-icons left">add</i></Button>;

  return (
    <div className="container">
      <div className="row">
        <div className="col s8">
          <h5>Detalle de tu experiencia</h5>
          <i className="material-icons">location_on</i> {travel && travel.destino}
          <p className="verticalcenter">
            <i className="material-icons">date_range</i>
            {travel && "Desde " + travel.fechaInicio + " hasta " + travel.fechaFin}
          </p>
          <p>
            <i className="material-icons">dehaze</i>
            {travel && travel.descripcion}
          </p>
        </div>
        <div className="col s4">
          Aquí va el mapa cuando lo tenga integrado
          {/*<MapContainer zoom={8} latLng={JSON.stringify(latlng)} />*/}
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <Modal trigger={triggerAddCheckpoint} actions={null}>
            <NewCheckpoint travel={travel} />
          </Modal>
          &nbsp;Añade un nuevo lugar a tu experiencia
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          Incluir aquí va el diario de viaje.
          Será una tabla simple con dos campos
          - travelId
          - comment

      </div>
      </div>
    </div>
  );
};


const mapDispatchToProps = { setTravels: setTravels };

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  travels: state.travels,
});
export default connect(mapStateToProps, mapDispatchToProps)(TravelProfile);
