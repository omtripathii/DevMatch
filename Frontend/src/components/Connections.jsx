import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Search, MessageSquare, UserX } from "lucide-react";

const Connections = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.newData));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const [search, setSearch] = useState("");

  const filteredConnections = connections.filter((user) =>
    user.firstName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold text-center mb-4 text-black">
        My Connections
      </h2>

      {/* Search Bar */}
      <div className="relative mb-4 text-black">
        <input
          type="text"
          placeholder="Search connections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Search className="absolute left-3 top-3 text-gray-500" size={20} />
      </div>

      {/* Connections List */}
      <div className="space-y-4">
        {filteredConnections.length > 0 ? (
          filteredConnections.map((user) => (
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
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition text-sm">
                  <MessageSquare size={18} /> Message
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition text-sm">
                  <UserX size={18} /> Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No connections found.</p>
        )}
      </div>
    </div>
  );
};

export default Connections;
