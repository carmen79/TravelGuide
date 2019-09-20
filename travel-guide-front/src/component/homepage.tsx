import React from "react";
import { Button } from 'react-materialize';


const Homepage: React.FC<any> = props => {

  const search = () => {
    props.history.push("/travels");
  };

  return (
    <div className="home">
      <div className="home bg">
        <div className="flex-container">
          Viajar es una gran experiencia.
        </div>
        <div className="flex-container">
          Vivirla y compartirla es aún mejor.
        </div>
        <div className="flex-container">
          <div className="blueType">
            Únete a Travel Experiences<br /><br />
            <Button className="modal-close waves-effect waves-light  mybuttonnav back bigtext" onClick={search} >Explora</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage
