import React, {useRef, useEffect, useState} from "react";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./styles.css";
import { Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateSearchQuery } from "../../features/noteSlice";


function Header({ isSignedIn, setIsSignedIn, newAccount }) {
  const [isClicked, setIsClicked] = useState(false);
  
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  }, []);
const ref = useRef(null);
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      ref.current = document.querySelector(".right");; // Assign the ref when isSignedIn is true
    } else {
      ref.current = null; // Set ref to null when isSignedIn is false
    }
  }, [isSignedIn]);

    const logout = (e) => {
      console.log("clicked");
      localStorage.removeItem("token");

      setIsSignedIn(false);
    };
  console.log(isSignedIn);
  return (
    <div className="header">
      <Tooltip title="Notes">
        <motion.div
          className="left"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NotesRoundedIcon className="notes-icon" />
          <p className="notes-heading">
            No<span style={{ color: "white" }}>t</span>es
          </p>
        </motion.div>
      </Tooltip>
      <div
        className="search-parent"
        style={{ display: isSignedIn ? "flex" : "none" }}
      >
        <Tooltip title="Search by title or content">
          <div className={`right ${isClicked ? "clicked" : ""}`} ref={ref}>
            <SearchRoundedIcon
              className="search-icon"
              style={{ color: "white", fontSize: "1rem" }}
            />
            <input
              placeholder="Search by title or content"
              className="search-input"
              onChange={(e) =>
                dispatch(updateSearchQuery({ value: e.target.value }))
              }
            />
          </div>
        </Tooltip>
        <button
          className="logout"
          value={isSignedIn}
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;