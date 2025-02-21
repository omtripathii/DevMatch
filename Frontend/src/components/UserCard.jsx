import React, { use, useState } from "react";
import { X, Heart } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
const UserCard = ({ user }) => {
  if (!user) {
    return <p className="text-black">No user available</p>;
  }
  const dispatch = useDispatch();
  const [toast, setToast] = useState(false);
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 1500);
    } catch (error) {
      console.log("Something went wrong " + error);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 h-[450px] bg-gray shadow-lg rounded-2xl overflow-hidden cursor-pointer">
        <img
          src={user.photoUrl}
          alt={user.firstName}
          className="w-full h-[350px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h2 className="text-white text-xl font-semibold">
            {user.firstName}, {user.age}
          </h2>
          <p className="text-gray-300">{user.about}</p>
          <p className="text-gray-300">
            {Array.isArray(user.skills)
              ? user.skills.join(", ")
              : user.skills?.split(", ").join(", ") || "No skills listed"}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-5">
        <button
          className="bg-gray-300 text-black rounded-full p-4 hover:bg-gray-400 transition"
          onClick={() => {
            handleSendRequest("ignored", user._id);
          }}
        >
          <X size={28} />
        </button>
        <button
          className="bg-red-500 text-white rounded-full p-4 hover:bg-red-600 transition"
          onClick={() => {
            handleSendRequest("interested", user._id);
          }}
        >
          <Heart size={28} />
        </button>
      </div>
      {toast && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Request Sent</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
