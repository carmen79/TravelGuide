import React from 'react';
import NavbarModal from './component/navbar_modal'
import './App.css';
import Homepage from './component/homepage';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import UserProfile from './component/userProfile';
import { connect } from "react-redux";
import { IGlobalState } from "./Reducers/reducers";
import CitiesAutoComplete from './component/cities_autocomplete';

interface IPropsGlobalApp {
  token: string;
}

const App: React.FC<IPropsGlobalApp> = props => {
  return (
    <BrowserRouter>

      <Route path="/" component={NavbarModal} />
      {props.token && <Route path="/userProfile" exact component={UserProfile} />}
      <Route path="/" exact component={Homepage} />
      <Route path="/cities" exact component={CitiesAutoComplete} />

    </BrowserRouter>
  );

}

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});
export default connect(mapStateToProps)(App);

