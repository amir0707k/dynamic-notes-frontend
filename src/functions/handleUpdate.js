import axios from "axios";
import { setIsSignedIn, updateNote } from "../features/noteSlice";

export const handleUpdate = async (
  note,
  title,
  noteTitle,
  setIsEditing,
  bgColor,
  dispatch
) => {
  const editedNote = {
    ...note,
    title,
    note: noteTitle,
    background: bgColor,
  };
  dispatch(
    updateNote({
      updatedNote: editedNote,
    })
  );
  try {
    const token = localStorage.getItem("token");
    console.log(editedNote);
    const editNote = await axios.put(
      `https://dynamic-notes.onrender.com/notes/${note.id}`,
      editedNote,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
  } catch (e) {
    console.log(e);
    if (e.response.status === 403) {
      alert("You have been logged out!");
      localStorage.removeItem("token")
      dispatch(setIsSignedIn(false))
    }
  }

  setIsEditing(false);
};
