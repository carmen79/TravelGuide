import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import cities from "cities.json";
import { Autocomplete } from 'react-materialize';

// Esto viene de la APP que es donde he decodificado el token
// son props del padre que uso en el hijo

const CitiesAutoComplete: React.FC<any> = props => {
  const c = { cab: null, bac: null };
  return (
    <div>
      <h1> Example for materialize autocomplete</h1>
      <Autocomplete options={{
        data: { 'Google': '', 'Apple': '', 'Microsoft': '' },
        minLength: 2,
        limit: 10
      }}
        placeholder="Selecciona Ciudad"
        icon="location_on"
        id="auto"
      />
    </div>
  );
};

export default CitiesAutoComplete
