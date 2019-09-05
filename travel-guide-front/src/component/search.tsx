import React, { useEffect } from "react";
import TravelList from "./travelList"
import { Button } from 'react-materialize';
import { RouteComponentProps } from "react-router";

const Search: React.FC<any & RouteComponentProps> = props => {
  const [searchTerm, setSearchTerm] = React.useState();

  const updateSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const search = () => {
    props.history.push("/travels/" + searchTerm);
  };

  return (
    <div className="container">
      <h4>Explora experiencias de otros usuarios:</h4>
      <div className="row">
        <div className="col s10">
          <div className="input-field">
            <input id="search" type="text" className="validate " onChange={updateSearchTerm} />
            <label htmlFor="search">Introduce un destino</label>
          </div>
        </div>
        <div className="col s2">
          <Button className="modal-close waves-effect waves-light  mybuttonnav back" onClick={search}><i className="small material-icons left">search</i>Buscar</Button>
        </div>
      </div>
    </div>

  );
};

export default Search;
