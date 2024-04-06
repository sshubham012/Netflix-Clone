import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import logo from "../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getGithubAccessToken,
  loginUser,
  registerUser,
} from "../state_manager/user/userSlice";
import { toast } from "react-toastify";
import { store } from "../state_manager/store";
import { useNavigate } from "react-router";

const CLIENT_ID = "fd47e71dea4f9e7ee15a";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const isValidUser = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleVariant = () => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  };

  const githubLogin = () => {
    window.location.assign(
      "https:/github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  };

  useEffect(() => {
    const queryParams = window.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const codeParam = urlParams.get("code");

    if (codeParam && !localStorage.getItem("accessToken")) {
      dispatch(getGithubAccessToken(codeParam));
    }
  }, []);

  const register = async () => {
    if (!email || !name || !password) {
      alert("Please Fill out all details");
      return;
    }
    const userData = {
      email,
      name,
      password,
    };
    dispatch(registerUser(userData));
  };
  const login = async () => {
    if (!email || !password) {
      toast.error("Please fill all details....");
      return;
    }
    const userData = {
      email,
      password,
    };
    const thiss = dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (isValidUser) {
      navigate("/profiles");
    }
  }, [isValidUser]);

  return (
    <div className="relative h-full w-full bg-[url('/src/assets/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src={logo} className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              type="submit"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => alert("logging using Google")}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                onClick={githubLogin}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
