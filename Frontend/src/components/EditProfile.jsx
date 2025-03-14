import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills?.join(", ") || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const saveData = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          about,
          photoUrl,
          skills: skills.split(",").map((s) => s.trim()),
          age,
          gender,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 bg-white p-4 min-h-screen">
      {/* Edit Profile Form */}
      <div className="w-full md:w-1/2 lg:w-1/3">
        <div className="w-full max-w-md bg-gradient-to-br from-gray-100 to-gray-300 text-black shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-center mb-5">Edit Profile</h2>
          <form className="space-y-4">
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-black text-sm mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border rounded-lg text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-black text-sm mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 border rounded-lg text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-black text-sm mb-1">About</label>
              <textarea
                name="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full p-3 border rounded-lg text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-black text-sm mb-1">
                Profile Picture URL
              </label>
              <input
                type="text"
                name="photoUrl"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full p-3 border rounded-lg text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-black text-sm mb-1">Skills</label>
              <input
                type="text"
                name="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full p-3 border rounded-lg text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-black text-sm mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 border rounded-lg text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-black text-sm mb-1">Gender</label>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 border rounded-lg text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <p className="text-red-500">{error}</p>
            <button
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-600 text-black py-3 rounded-lg text-sm font-medium transition duration-300 shadow-md"
              onClick={saveData}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* UserCard Preview */}
      <div className="w-full md:w-1/2 lg:w-1/3 ">
        <UserCard
          user={{ firstName, lastName, about, photoUrl, skills, age, gender }}
        />
      </div>
      {toast && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
