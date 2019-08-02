import React from 'react';
import Login from './component/login'
import Navbar from './component/navbar'
import AddUser from './component/addUser'
// import jwt from "jsonwebtoken";
import './App.css';
import Homepage from './component/homepage';


const App: React.FC = () => {
  return (
    <div >
      <Navbar />
      <div className="container">
        <Homepage />
      </div>
      <div id="modalLogin" className="modalWindow">
        <Login />
      </div>
      <div id="modalRegister" className="modalWindow">
        <AddUser />
      </div>
    </div>
  );
}

export default App;
