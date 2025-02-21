import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { Check, X, Search } from "lucide-react";
import axios from "axios";

const Requests = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [search, setSearch] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      // Extract `data` and properly format it for the UI
      const formattedRequests = res?.data?.data?.map((request) => ({
        _id: request._id, // Request ID (needed for API calls)
        userId: request.fromUserId._id,
        firstName: request.fromUserId.firstName,
        lastName: request.fromUserId.lastName,
        about: request.fromUserId.about,
        photoUrl: request.fromUserId.photoUrl,
        skills: request.fromUserId.skills || [],
        status: request.status, // Important for showing request status
      })) || [];

      dispatch(addRequests(formattedRequests));
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((user) =>
    user.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const requestReview = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      fetchRequests(); // Refresh list after review
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl my-9">
      <h2 className="text-2xl font-semibold text-center mb-4 text-black">
        Pending Requests
      </h2>

      {/* Search Bar */}
      <div className="relative mb-4 text-black">
        <input
          type="text"
          placeholder="Search Requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Search className="absolute left-3 top-3 text-gray-500" size={20} />
      </div>

      {/* Connections List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((user) => (
            <div
              key={user._id}
              className="flex flex-col sm:flex-row items-center bg-gray-100 p-4 rounded-lg shadow-md transition hover:shadow-lg text-black"
            >
              <img
                src={user.photoUrl}
                alt={user.firstName}
                className="w-16 h-16 rounded-full object-cover border border-gray-300"
              />
              <div className="sm:ml-4 flex-1 text-center sm:text-left mt-3 sm:mt-0">
                <h3 className="text-lg font-medium">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-500">{user.about}</p>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-2 mt-3 sm:mt-0">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition text-sm"
                  onClick={() => requestReview("accepted", user._id)}
                >
                  <Check size={18} /> Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition text-sm"
                  onClick={() => requestReview("rejected", user._id)}
                >
                  <X size={18} /> Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No Requests found.</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
