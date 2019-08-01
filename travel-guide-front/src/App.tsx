import React from 'react';

import Login from './component/login'
import Navbar from './component/navbar'
// import jwt from "jsonwebtoken";
import './App.css';


const App: React.FC = () => {
  return (
    <div className="container">
      <Navbar/>
    <div className= "container">
      <Login/>
    </div>
    </div>
  );
}

export default App;
 