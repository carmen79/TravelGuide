import React from "react";
import { RouteComponentProps } from "react-router";
import { Modal } from 'react-materialize';
import Login from './login'
import NewTravelModal from './newTravelModal'
import { IGlobalState } from "../Reducers/reducers";
import { connect } from "react-redux";



interface IPropsGlobal {
  token: string;
}

const HomeCards: React.FC<IPropsGlobal & RouteComponentProps> = props => {

  const triggerLogin = <a className="btn-floating halfway-fab waves-effect waves-light orange darken-4"><i className="material-icons">account_circle</i></a>;
  const newTravelTrigger = <a className="btn-floating halfway-fab waves-effect waves-light orange darken-4"><i className="material-icons">location_on</i></a>;

  const goToUserProfile = () => {
    props.history.push("/userProfile")
  }
  return (
    <div className="margins">
      <div className="flex-container">
        <div className="col s2">
          <div className="card">
            {!props.token &&
              <div className="card-image">
                <img src="/img/createTravel.jpg" />
                <Modal trigger={triggerLogin} actions={null}>
                  <Login history={props.history} location={props.location} match={props.match} />
                </Modal>
              </div>
            }
            {props.token &&
              <div className="card-image">
                <img src="/img/createTravel.jpg" />
                <a href="/userProfile" className="btn-floating halfway-fab waves-effect waves-light orange darken-4"><i className="material-icons">account_circle</i></a>
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
              <img src="/img/categoriesTravel.jpg" />
              <a className="btn-floating halfway-fab waves-effect waves-light orange darken-4"><i className="material-icons">picture_in_picture</i></a>
            </div>
            <div className="card-content">
              <p>Diferentes categorías. En Travel Experiences pensamos en todo tipo de viajeros para adaptarnos a tí</p>
            </div>
          </div>
        </div>
        <div className="col s2">
          <div className="card">
            <div className="card-image">
              <img src="/img/checkpoints.jpg" />
              <Modal actions={null} trigger={newTravelTrigger}>
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
