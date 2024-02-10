import axios from "axios";
import React, { useState } from "react";
import "./styles.css";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { setIsSignedIn, setIsloading } from "../../features/noteSlice";
import Loader from "../Loader/Loader";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
function AuthenticateUser({ newAccount, setNewAccount, fetchNotes }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const createAccount = async (e) => {
    e.preventDefault();
    try {
      if (!username && !password) {
        alert("Enter valid username/password");
        dispatch(setIsloading(false));
        return;
      } else if (password !== confirmPassword) {
        alert("Password and confirm Password should match");
        dispatch(setIsloading(false));
        return;
      }
      dispatch(setIsloading(true));
      const newUser = await axios.post(
        "https://dynamic-notes.onrender.com/signup",
        {
          username,
          password,
        }
      );
      console.log(newUser);

      localStorage.setItem("token", newUser.data.token);
      setNewAccount(false);
      setUsername("");
      setPassword("");
      dispatch(setIsSignedIn(true));
      dispatch(setIsloading(false));
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        alert("User already exists with that username");
        return;
      }
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      dispatch(setIsloading(true));
      if (!username && !password) {
        alert("Enter valid username/password");
        dispatch(setIsloading(false));
        return;
      }
      if (token) {
        const signIn = await axios.post(
          "https://dynamic-notes.onrender.com/login",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Executing fetchnotes");
        fetchNotes();
      } else {
        const signIn = await axios.post(
          "https://dynamic-notes.onrender.com/login",
          {
            username,
            password,
          }
        );

        console.log(signIn);
        localStorage.setItem("token", signIn.data.token);
        setNewAccount(false);
        setUsername("");
        setPassword("");
        dispatch(setIsSignedIn(true));
        fetchNotes();
        dispatch(setIsloading(false));
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader className="loader" />
      ) : newAccount ? (
        <form onSubmit={createAccount}>
          <div className="signup">
            <input
              type="text"
              placeholder="Username"
              value={username}
              className="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <VisibilityTwoToneIcon
                className="showPassword"
                onClick={() => {
                  setShowPassword(!showPassword);
                  console.log("Clicked");
                }}
              />
            </div>
            <div className="password">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <VisibilityTwoToneIcon
                className="showPassword"
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                  console.log("Clicked");
                }}
              />
            </div>

            <Button text="Signup" />
            <p onClick={() => setNewAccount(false)}>
              Already have an account ? Click here to Login
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={login}>
          <div className="signup">
            <input
              type="text"
              placeholder="Username"
              value={username}
              className="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="password">
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              <VisibilityTwoToneIcon
                className="showPassword"
                onClick={() => {
                  setShowPassword(!showPassword);
                  console.log("Clicked");
                }}
              />
            </div>

            <Button text="Login" />
            <p
              onClick={() => {
                setNewAccount(true);
                setShowPassword(false)
              }}
            >
              Don't have an account ? Click here to Signup
            </p>
          </div>
        </form>
      )}
    </>
  );
}

export default AuthenticateUser;
