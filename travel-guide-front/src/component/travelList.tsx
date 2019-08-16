import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { ITravel } from '../interfaces';
import { setTravels } from "../Actions/actions";
import TravelCard from "./travelCard";

interface IPropsGlobal {
  token: string;
  travels: ITravel[];
  setTravels: (travels: ITravel[]) => void;
}

const TravelList: React.FC<IPropsGlobal> = props => {

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
          res.json().then(travels => {
            console.log(travels);
            props.setTravels(travels);
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
      {(props.travels && props.travels.length > 0) &&
        <div className="row">
          {props.travels.map((t: ITravel) => (
            <div className="col s4">
              <TravelCard travel={t} />
            </div>
          ))}
        </div>
      }
    </div>
  );
};


const mapDispatchToProps = { setTravels: setTravels };

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  travels: state.travels,
});
export default connect(mapStateToProps, mapDispatchToProps)(TravelList);
