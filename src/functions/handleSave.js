import axios from "axios";
import { addNote } from "../features/noteSlice";

export const handleSave = async (
  title,
  note,
  setTitle,
  setNote,
  dispatch,
  notes
) => {
  try {
    console.log("executed");
    if (note.trim() === "" && title.trim() === "") {
      setTitle("Enter some title");
      setNote("Enter some description");
      return;
    } else {

      

      const newNote = {
        title,
        note,
        background: "",
        id:
          new Date().getTime().toString() + Math.floor(Math.random() * 1000000),
      };

       let token = localStorage.getItem("token");
       const result = axios.post(
         "https://dynamic-notes.onrender.com/notes",
         newNote,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );

       result.then((data) => console.log(data));

      await dispatch(addNote(newNote));

      console.log(newNote.id);

     
    }
    setTitle("");
    setNote("");
  } catch (e) {
    console.log(e)
    if(e.response.status === 403){
      alert("You have been logged out!");
      localStorage.removeItem("token");
    }
  }
};
