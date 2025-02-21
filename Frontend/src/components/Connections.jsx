import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const connections = useSelector((store)=>store.connections)
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.newData);
      dispatch(addConnection(res?.data?.newData))
    } catch (error) {
      setError(error);
    }
  };
  useEffect(()=>{fetchConnections()},[])
  return <div>Connections</div>;
};

export default Connections;
