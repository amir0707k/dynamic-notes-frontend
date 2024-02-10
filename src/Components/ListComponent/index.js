import React, { useEffect, useState } from "react";
import Card from "../Cards";
import "./styles.css";
import { handleSearch } from "../../functions/handleSearch";
import { useSelector } from "react-redux"; 

function ListComponent() {

  const notes = useSelector( state => state.notes) || [];
  const searchQuery = useSelector(state => state.searchQuery);
  const [filteredNotes, setFilteredNotes] = useState([]);
  useEffect(() => {
    handleSearch(filteredNotes, notes, searchQuery, setFilteredNotes);
  }, [searchQuery,notes]);

  return (
    <div className="mainpage-grid">
      {filteredNotes.map((note) => {
        {console.log(note)}
        return (
          <Card
          key={note.id}
            note={note}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        );
      })}
    </div>
  );
}

export default ListComponent;
