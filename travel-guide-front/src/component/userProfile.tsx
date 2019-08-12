import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../Reducers/reducers";
import UserCard from "./userCard";
import TravelList from "./travelList"



const UserProfile: React.FC<any> = props => {
  return (
    <div className="flex-container left">
      <div>
        <UserCard />
      </div>

      <div>
        <div>UserState</div>

        <div>
          <TravelList />
        </div>

      </div>

    </div>

  );
};

export default UserProfile
