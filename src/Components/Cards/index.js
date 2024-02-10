import React, { useState } from "react";
import "./styles.css";
import FileDownloadDoneRoundedIcon from "@mui/icons-material/FileDownloadDoneRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import { handleDelete } from "../../functions/handleDelete";
import { handleUpdate } from "../../functions/handleUpdate";
import { handleColorUpdate } from "../../functions/handleColorUpdate";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux"; 

function Card({ note }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [noteTitle, setNoteTitle] = useState(note.note);
  const [deleting, setDeleting] = useState(false);
  const [isSelectingColor, setIsSelectingColor] = useState(false);
  console.log(note)
  const dispatch = useDispatch();

  return (
    <>
      {deleting && (
        <div className="pop-up">
          <p>Are you sure you want to delete this note ?</p>
          <div className="delete-confirmation-buttons">
            <button onClick={() => handleDelete(note, dispatch)}>Yes</button>
            <button onClick={() => setDeleting(false)}>No</button>
          </div>
        </div>
      )}
      <>
        {isEditing && (
          <form
            className="edit-form"
            style={{ backgroundColor: note.background }}
          >
            <input
              value={title}
              className="title-input title-input-show"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              value={noteTitle}
              className="note-input note-input-show"
              id="note"
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <div>
              <FileDownloadDoneRoundedIcon
                className="icons create-icon"
                onClick={() =>
                  handleUpdate(
                    note,
                    title,
                    noteTitle,
                    setIsEditing,
                    note.background,
                    dispatch
                  )
                }
              />
              <ColorLensRoundedIcon className="icons delete-icon" />
            </div>
          </form>
        )}

        <motion.div
          className="card"
          style={{ backgroundColor: note.background }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="title">{title}</p>
          <p className="note">{noteTitle}</p>

          <div className="buttons">
            <CreateRoundedIcon
              className="icons edit-icon"
              onClick={() => setIsEditing(true)}
            />
            <DeleteRoundedIcon
              onClick={() => setDeleting(true)}
              className="icons delete-icon"
            />
            <ColorLensRoundedIcon
              className="icons delete-icon"
              onClick={() => {
                if (!isSelectingColor) {
                  setIsSelectingColor(true);
                } else {
                  setIsSelectingColor(false);
                }
              }}
            />

            {isSelectingColor ? (
              <div className="color-palette">
                <span
                  className="color red"
                  title="red"
                  onClick={() => handleColorUpdate(note, "red", dispatch)}
                ></span>
                <span
                  className="color peach"
                  title="peach"
                  onClick={() =>
                    handleColorUpdate(note, "var(--peach)", dispatch)
                  }
                ></span>
                <span
                  className="color sand"
                  title="sand"
                  onClick={() =>
                    handleColorUpdate(note, "var(--sand)", dispatch)
                  }
                ></span>
                <span
                  className="color mint"
                  title="mint"
                  onClick={() =>
                    handleColorUpdate(note, "var(--mint)", dispatch)
                  }
                ></span>
                <span
                  className="color sage"
                  title="sage"
                  onClick={() =>
                    handleColorUpdate(note, "var(--sage)", dispatch)
                  }
                ></span>
              </div>
            ) : (
              ""
            )}
          </div>
        </motion.div>
      </>
    </>
  );
}

export default Card;
