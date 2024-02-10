import axios from "axios";
import { removeNote, setIsSignedIn } from "../features/noteSlice";

export const handleDelete = async (note, dispatch) => {
  try {
    let token = localStorage.getItem("token");
    const deleteNote = await axios.delete(
      `https://dynamic-notes.onrender.com/notes/${note.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(
      removeNote({
        id: note.id,
      })
    );
  } catch (e) {
    console.log(e);
    if (e.response.status === 403) {
      alert("You have been logged out!");
      localStorage.removeItem("token");
      dispatch(setIsSignedIn(false));
    }
  }
};
