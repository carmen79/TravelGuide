import React from 'react';
import NavbarModal from './component/navbar_modal'
import './App.css';
import Homepage from './component/homepage';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import UserProfile from './component/userProfile';
import { connect } from "react-redux";
import { IGlobalState } from "./Reducers/reducers";
import NewTravel from './component/newTravel';
import EditUser from './component/editUser';
import TravelView from './component/travelView';
import UserTravelView from './component/userTravelView';
import HomeCards from './component/homecards';
import TravelList from './component/travelList';
import Footer from './component/footer';
import addUser from './component/addUser';

interface IPropsGlobalApp {
  token: string;
}

const App: React.FC<IPropsGlobalApp> = props => {
  return (
    <BrowserRouter>

      <Route path="/" component={NavbarModal} />
      {props.token && <Route path="/userProfile" exact component={UserProfile} />}
      <Route path="/" exact component={Homepage} />
      <Route path="/" exact component={HomeCards} />
      <Route path="/" exact component={Footer} />
      <Route path="/userTravelView/:id" component={UserTravelView} />
      <Route path="/travelView/:id" component={TravelView} />
      <Route path="/travels" component={TravelList} />
      <Route path="/newUser" component={addUser} />

      {props.token && <Route path="/editUser" exact component={EditUser} />}
      <Route exact path="/editUser" render={() => (
        !props.token &&
        <Redirect to="/" />
      )} />

      {props.token && <Route path="/newTravel" exact component={NewTravel} />}
      <Route exact path="/newTravel" render={() => (
        !props.token &&
        <Redirect to="/" />
      )} />

    </BrowserRouter>
  );

}

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});
export default connect(mapStateToProps)(App);

