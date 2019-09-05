import React from "react";
import UserCard from "./userCard";
import UserTravelList from "./userTravelList"

const UserProfile: React.FC<any> = props => {
  return (
    <div>
      <div className="flex-container">
        <UserCard />
      </div>
      <div>
        <UserTravelList />
      </div>
    </div>

  );
};

export default UserProfile
