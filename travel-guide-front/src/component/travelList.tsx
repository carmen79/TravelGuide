import React, { useEffect } from "react";
import { ITravel } from '../interfaces';
import TravelCard from "./travelCard";
import { RouteComponentProps } from "react-router";
import { Button } from 'react-materialize';


const TravelList: React.FC<RouteComponentProps> = props => {

  const [travels, setTravels] = React.useState([]);

  const [searchTermValue, setSearchTermValue,] = React.useState("");
  const [categoryValue, setCategoryValue,] = React.useState("");

  const updateSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermValue(event.target.value);
  };

  const updateCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryValue(event.target.value);
  };

  const clear = () => {
    setCategoryValue("");
    setSearchTermValue("");
    (document.getElementById("search") as HTMLInputElement).value = "";
    (document.getElementById("category") as HTMLSelectElement).value = "";
  };

  const getTravels = () => {
    console.log("Getting by search term:" + searchTermValue);
    fetch("http://localhost:3000/api/travels?city=" + searchTermValue + "&category=" + categoryValue, {
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        res.json().then(travels => {
          setTravels(travels);
        });
      }
    });
  };

  const getPhotos = (travelId: string) => {
    fetch("http://localhost:3000/api/checkpoint/photos?travelId=" + travelId, {
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        res.json().then(arrayPhotos => {
          return arrayPhotos;
        });
      }
    });
  };

  useEffect(() => {
    getTravels();
  }, []);


  return (
    <div className="margins">
      <div >
        <div className="row">
          <h5>Selecciona los términos de búsqueda</h5>
        </div>
        <div className="row valign-wrapper">
          <div className="col s4">
            <div className="input-field">
              <input id="search" type="text" className="validate " onChange={updateSearchTerm} />
              <label htmlFor="search">Introduce un destino</label>
            </div>
          </div>
          <div className="col s4">
            <select id="category" defaultValue="" className="browser-default" onChange={updateCategory}>
              <option value="">Selecciona una categoría de viaje</option>
              <option value="Viaje en familia">Viaje en familia</option>
              <option value="Romántico">Romántico</option>
              <option value="Mochilero solitario">Mochilero solitario</option>
              <option value="Viaje en grupo con amigos">Viaje en grupo con amigos</option>
            </select>

          </div>
          <div className="col s2">
            <Button className="modal-close waves-effect waves-light  mybuttonnav back" onClick={getTravels}><i className="small material-icons left">search</i>Buscar</Button>
          </div>
          <div className="col s2">
            <Button className="modal-close waves-effect waves-light  mybuttonnav back" onClick={clear}><i className="small material-icons left">clear</i>Limpiar</Button>
          </div>
        </div>
      </div>
      {
        (!travels || travels.length === 0) &&
        <div className="container">
          <div className="row">
            <h1>:(</h1> <h5>No hemos encontrado experiencias para los términos de búsqueda seleccionados</h5>
          </div>
        </div>
      }
      <h4>Estas son las experiencias que hemos encontrado:</h4>
      {
        (travels && travels.length > 0) &&
        <div className="row">
          {travels.map((t: ITravel) => (
            <div key={t._id} style={{ height: 400 }} className="col s3 m3">
              <TravelCard travel={t} />
            </div>
          ))}
        </div>
      }
    </div >
  );
};

export default TravelList;
