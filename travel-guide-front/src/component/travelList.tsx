import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { Link } from "react-router-dom";
import { ITravel } from '../interfaces';
import { setTravel } from "../Actions/actions";

interface IPropsGlobal {
  token: string;
  travel: ITravel[];
  setTravel: (travels: ITravel []) => void;
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
            props.setTravel(travels);
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
      {(props.travel && props.travel.length > 0) &&
       <div className="container">
       {props.travel.map((t:any) =>  (
         <div className="row" key={t.destino}>
           <div className="col-4">
             <Link to={"/travels/" + t._id}>
               {t.destino}
             </Link>
           </div>
         </div>
       ))}
    
     </div>
      }
      {(!props.travel || props.travel.length == 0) &&
        <div> Ya puedes dar de alta tu primer viaje!!!</div>
      }
    </div>
  );
};


const mapDispatchToProps = { setTravel: setTravel };

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  travels:state.travels

});
export default connect(mapStateToProps, mapDispatchToProps )(TravelList);
