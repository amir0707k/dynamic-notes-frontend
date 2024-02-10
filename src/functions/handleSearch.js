import axios from "axios";

export const handleSearch = async (filteredNotes, notes, searchQuery, setFilteredNotes) => {
  
  try{
    // let token = localStorage.getItem("token");
    // let noteData = await axios.get(`http://localhost:3000/notes/search?search=${searchQuery}`, {
    //   headers:{
    //     Authorization: `Bearer ${token}`
    //   }
    // });
    // console.log(noteData.data)
    //  setFilteredNotes(noteData.data.searchList);


      if (notes) {
        const filtered = notes.filter((note) => {
          return (
            note.title
              .toLowerCase()
              .includes(searchQuery.trim().toLowerCase()) ||
            note.note.toLowerCase().includes(searchQuery.trim().toLowerCase())
          );
        });
        setFilteredNotes(filtered);
      }

  }catch(e){
    console.log(e);
  }

  
};