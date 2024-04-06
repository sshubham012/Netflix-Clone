import React, { useEffect, useState } from "react";
import profileLogo from "../assets/default-blue.png";
import { useNavigate } from "react-router";

export default function Profiles() {
  const navigate = useNavigate();
  const isValidUser = localStorage.getItem("access_token");
  const handleNav = () => {
    navigate("/netflix-and-chill");
  };
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (!isValidUser) navigate("/");
    setUsername(localStorage.getItem("username"));
    setImageUrl(localStorage.getItem("image"));
  }, []);
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching
        </h1>
        <div className="flex items-center flex-col justfy-center gap-8 mt-10">
          <div onClick={handleNav}>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img
                  src={imageUrl ? imageUrl : profileLogo}
                  alt="UserProfile"
                />
              </div>
              <div className="mt-4 text-grey-400 text-2xl text-center group-hover:text-white">
                {username ? username : "Guest"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
