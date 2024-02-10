import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import FileDownloadDoneRoundedIcon from "@mui/icons-material/FileDownloadDoneRounded";
import { handleSave } from "../../functions/handleSave";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

function InputComponent({ isSignedIn}) {
  const [isHidden, setIsHidden] = useState(true);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const ref = useRef(null);
  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  // }, []);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref]);
  // const handleClickOutside = (e) => {
  //   if (!ref.current.contains(e.target)) {
  //     setIsHidden(true);
  //   } else {
  //     setIsHidden(false);
  //   }
  // };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form className="main-form" ref={isSignedIn ? ref: null}>
        <input
          placeholder="Title"
          className={`title-input ${isHidden ? "" : "title-input-show"} `}
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          onClick={() => {
            setIsHidden(false);
          }}
          className={`note-input ${isHidden ? "" : "note-input-show"} `}
          placeholder="Take a note..."
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className={`buttons-div ${isHidden ? "" : "buttons-div-show"}`}>
          <FileDownloadDoneRoundedIcon
            className="icons create-icon"
            onClick={(e) => {
              e.preventDefault();
              handleSave(title, note, setTitle, setNote, dispatch, notes);
            }}
          />
        </div>
      </form>
    </motion.div>
  );
}

export default InputComponent;
