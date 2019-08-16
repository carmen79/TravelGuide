import React from "react";
import cities from "cities.json";
import { Autocomplete } from 'react-materialize';

const CitiesAutoComplete: React.FC<any> = props => {

  const [selectedCity, setSelectedCity] = React.useState("");

  var citiesString = "{";

  cities.map(city => {
    citiesString += "\"" + city.name + "\" : null, ";
  });
  citiesString += " \"null\" : null}";
  var myCitiesJson = JSON.parse(citiesString);

  const selectCity = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event && event.target && event.target.value && event.target.value !== "") {
      let obj = cities.find((data: any) => data.name === event.target.value);
      console.log("Found:" + JSON.stringify(obj));
      if (obj) {
        let jsoncity = { lat: new Number(obj.lat), lng: new Number(obj.lng) };

        setSelectedCity(JSON.stringify(jsoncity));
      }
    }
  };

  return (
    <div>
      <Autocomplete options={{
        data: myCitiesJson,
        minLength: 2,
        limit: 10,
      }}
        onChange={selectCity}
        placeholder="Introduce el destino de tu viaje"
        icon="location_on"
        id="auto"
      />
      <div>
        {console.log("Selected city to center:" + selectedCity)}
        {/*<MapContainer latLng={selectedCity} /> */}
      </div>
    </div>
  );
};

export default CitiesAutoComplete
