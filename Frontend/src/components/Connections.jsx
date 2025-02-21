import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const [error, setError] = useState(null);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.newData);

      
    } catch (error) {
      setError(error);
    }
  };
  useEffect(()=>{fetchConnections()},[])
  return <div>Connections</div>;
};

export default Connections;
