import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import CitiesAutoComplete from "./cities_autocomplete";
import NavbarModal from "./navbar_modal";


// Esto viene de la APP que es donde he decodificado el token
// son props del padre que uso en el hijo

const Homepage: React.FC<any> = props => {
  return (
    <div>
      hola
    </div>

  );
};

export default Homepage
