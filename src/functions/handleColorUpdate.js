import axios from "axios";
import { setIsSignedIn, updateNote } from "../features/noteSlice";



export const handleColorUpdate = async (
  note,
  bgColor,
  dispatch
) => {
  const editedNote = {
    ...note,
    background: bgColor,
  };
  dispatch(updateNote({
    key:note.id,
    updatedNote: editedNote
  }))
  try{
let token = localStorage.getItem("token");
    const editNote = await axios.put(
      `https://dynamic-notes.onrender.com/notes/${editedNote.id}`,
      editedNote,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }catch(e){
    console.log(e);
    if(e.response.status === 403){
      alert("You have been logged out!")
      localStorage.removeItem("token");
      dispatch(setIsSignedIn(false));
    }
  }
  
    
    
};
