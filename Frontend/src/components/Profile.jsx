import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import UserCard from "./Usercard";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 p-6 bg-white min-h-screen">

        <div className="w-full md:w-1/2 lg:w-1/3">
          <EditProfile user={user} />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 my-20">
          <UserCard user={user} />
        </div>
      </div>
    )
  );
};

export default Profile;
