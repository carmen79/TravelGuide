import React from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import { ITravel } from '../interfaces';
import { setTravels } from "../Actions/actions";
import UserTravelCard from "./userTravelCard";

interface IPropsGlobal {
  token: string;
  travels: ITravel[];
  setTravels: (travels: ITravel[]) => void;
}

const UserTravelList: React.FC<IPropsGlobal> = props => {

  const getTravels = () => {
    if (props.token) {
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

  if (!props.travels) {
    getTravels();
  }

  return (
    <div>
      {(props.travels && props.travels.length > 0) &&
        <div className="row">
          {props.travels.map((t: ITravel) => (
            <div key={t._id} className="col s3">
              <UserTravelCard travel={t} />
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
export default connect(mapStateToProps, mapDispatchToProps)(UserTravelList);
