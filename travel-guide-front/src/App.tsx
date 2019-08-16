import React from 'react';
import NavbarModal from './component/navbar_modal'
import './App.css';
import Homepage from './component/homepage';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import UserProfile from './component/userProfile';
import { connect } from "react-redux";
import { IGlobalState } from "./Reducers/reducers";
import CitiesAutoComplete from './component/cities_autocomplete';
import MapContainer from './component/map';
import NewTravel from './component/newTravel';
import EditUser from './component/editUser';
import TravelProfile from './component/travelProfile';

interface IPropsGlobalApp {
  token: string;
}

const latlng = { lat: "36.71681150164842", lng: "-4.410549675933794" }

const App: React.FC<IPropsGlobalApp> = props => {
  return (
    <BrowserRouter>

      <Route path="/" component={NavbarModal} />
      {props.token && <Route path="/userProfile" exact component={UserProfile} />}
      <Route path="/" exact component={Homepage} />
      <Route path="/cities" exact component={CitiesAutoComplete} />
      <Route path="/map" exact render={(props) => <MapContainer latLng={JSON.stringify(latlng)} />} />
      <Route path="/newTravel" exact component={NewTravel} />
      <Route path="/editUser" exact component={EditUser} />
      <Route path="/travelProfile/:id" component={TravelProfile} />

    </BrowserRouter>
  );

}

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});
export default connect(mapStateToProps)(App);

