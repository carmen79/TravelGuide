import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";

interface IPropsGlobal {
  token: string;
}

const TravelList: React.FC<IPropsGlobal> = props => {

  const [travels, setTravels] = React.useState([]);


  const getTravels = () => {
    if (props.token) {
      console.log("Getting Travels from backend")
      fetch("http://localhost:3000/api/travels/mytravels", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + props.token
        }
      }).then(res => {
        if (res.ok) {
          res.json().then(travelsBd => {
            console.log(travelsBd);
            setTravels(travelsBd);
          });
        }
      });
    }
  };

  useEffect(() => {
    getTravels();
  }, []);


  return (
    <div>
      {(travels && travels.length > 0) &&
        <div>Pintar los travels</div>
      }
      {(!travels || travels.length == 0) &&
        <div>A qué esperas para dar de alta un viaje!!!</div>
      }
    </div>
  );
};



const mapStateToProps = (state: IGlobalState) => ({
  token: state.token

});
export default connect(mapStateToProps)(TravelList);
