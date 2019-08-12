import React from "react";
import cities from "cities.json";
import { Autocomplete } from 'react-materialize';

const CitiesAutoComplete: React.FC<any> = props => {
  var citiesString = "{";

  cities.map( city => {
    citiesString += "\"" + city.name + "\" : null, ";
  });
  citiesString += " \"null\" : null}";
  var myCitiesJson = JSON.parse(citiesString);

  const c = { Google: '', Apple: '', Microsoft: '' };
  return (
      <Autocomplete options={{
        data: myCitiesJson,
        minLength: 2,
        limit: 10
      }}
        placeholder="Selecciona Ciudad"
        icon="location_on"
        id="auto"
      />
  );
};

export default CitiesAutoComplete
