import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res?.data?.newData);
      dispatch(addRequests(res?.data?.newData));
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  return <div>Requests</div>;
};

export default Requests;
