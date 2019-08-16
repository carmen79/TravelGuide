import React, { useEffect } from "react";
import UserCard from "./userCard";
import TravelList from "./travelList"

const UserProfile: React.FC<any> = props => {
  return (
    <div>
      <div className="flex-container">
        <UserCard />
      </div>
      <div>
        <TravelList />
      </div>
    </div>

  );
};

export default UserProfile
