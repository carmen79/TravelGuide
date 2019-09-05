import React from "react";
import Search from "./search";
import { Button } from 'react-materialize';


const Homepage: React.FC<any> = props => {

  const search = () => {
    props.history.push("/travels");
  };

  return (
    <div className="home">
      <div className="home bg">
        <div className="flex-container">
          <h3>Viajar es una gran experiencia</h3>
        </div>
        <div className="flex-container">
          <h3>Vivirla y compartirla es aún mejor</h3>
        </div>
        <div className="flex-container">
          <div className="blueType">
            <h1>Únete a Travel Experiences </h1>

            <Button className="modal-close waves-effect waves-light  mybuttonnav back bigtext" onClick={search} >Explora</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage
