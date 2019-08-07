import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import CitiesAutoComplete from "./cities_autocomplete";
import NewTravel from "./newTravel";


// Esto viene de la APP que es donde he decodificado el token
// son props del padre que uso en el hijo


const Homepage: React.FC<any> = props => {
  return (
    <div>
      hola METER AQUI EL COMPNENTE DE PROFLE
    </div>

  );
};

export default Homepage
