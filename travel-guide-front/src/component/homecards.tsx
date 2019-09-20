import React from "react";
import { RouteComponentProps } from "react-router";
import { Modal } from 'react-materialize';
import Login from './login'
import NewTravelModal from './newTravelModal'
import { IGlobalState } from "../Reducers/reducers";
import { connect } from "react-redux";
import { Button } from 'react-materialize';



interface IPropsGlobal {
  token: string;
}

const HomeCards: React.FC<IPropsGlobal & RouteComponentProps> = props => {

  const triggerLogin = <Button className="btn-floating halfway-fab waves-effect waves-light blue darken-2"><i className="material-icons">account_circle</i></Button>;
  const newTravelTrigger = <Button className="btn-floating halfway-fab waves-effect waves-light blue darken-2"><i className="material-icons">location_on</i></Button>;

  const goToUserProfile = () => {
    props.history.push("/userProfile")
  }
  const goToSearch = () => {
    props.history.push("/travels")
  }

  return (
    <div className="margins">
      <div className="flex-container">
        <div className="col s2">
          <div className="card">
            {!props.token &&
              <div className="card-image">
                <img alt="" src="/img/createTravel.jpg" />
                <Modal className="modalbox" trigger={triggerLogin} actions={null}>
                  <Login history={props.history} location={props.location} match={props.match} />
                </Modal>
              </div>
            }
            {props.token &&
              <div className="card-image">
                <img alt="" src="/img/createTravel.jpg" />
                <a href="/userProfile" className="btn-floating halfway-fab waves-effect waves-light blue darken-2"><i className="material-icons">account_circle</i></a>
              </div>
            }
            <div className="card-content">
              <p>A qué esperas para unirte a Travel Experiences! Haz click y date de alta o identifícate en nuestra plataforma</p>
            </div>
          </div>
        </div>
        <div className="col s2">
          <div className="card">
            <div className="card-image">
              <img alt="" src="/img/categoriesTravel.jpg" />
              <Button onClick={goToSearch} className="btn-floating halfway-fab waves-effect waves-light blue darken-2"><i className="material-icons">picture_in_picture</i></Button>
            </div>
            <div className="card-content">
              <p>Diferentes categorías. En Travel Experiences pensamos en todo tipo de viajeros para adaptarnos a tí</p>
            </div>
          </div>
        </div>
        <div className="col s2">
          <div className="card">
            <div className="card-image">
              <img alt="" src="/img/checkpoints.jpg" />
              <Modal className="modalbox" actions={null} trigger={newTravelTrigger}>
                <NewTravelModal callback={goToUserProfile} />
              </Modal>
            </div>
            <div className="card-content">
              <p>Crea tus viajes, añade experiencias y comparte públicamente o con quien desees</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};


const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});


export default connect(mapStateToProps)(HomeCards);
