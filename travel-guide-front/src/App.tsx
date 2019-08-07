import React from 'react';
import Login from './component/login'
import NavbarModal from './component/navbar_modal'
import AddUser from './component/addUser'
// import jwt from "jsonwebtoken";
import './App.css';
import Homepage from './component/homepage';
import NewTravel from './component/newTravel';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <BrowserRouter>

      <Route path="/" component={NavbarModal} />
      <Route path="/" exact component={Homepage} />
    
    </BrowserRouter>
  );

}

export default App;
