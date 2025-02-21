import React, { useEffect } from "react";
import UserCard from "./Usercard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.feed);

  const fetchFeedData = async () => {
    if (users && users.length > 0) return; // Check if users already exist
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      console.log(res.data);
      
    } catch (error) {
      console.error("Error fetching user feed:", error);
    }
  };
  useEffect(() => {
    fetchFeedData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {users?.length > 0 ? (
        <UserCard user={users[0]} />
      ) : (
        <p className="text-gray-600 text-xl">Loading or not enough users...</p>
      )}
    </div>
  );
};

export default Feed;
