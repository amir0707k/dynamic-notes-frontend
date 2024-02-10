import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let token = localStorage.getItem("token")

const initialState = {
  notes:  [] ,
  searchQuery: "",
  token:"",
  isSignedIn:token ? true : false,
  isLoading:false
};

export const noteSlice = createSlice({
  name: "Notes",
  initialState,
  reducers: {
    updateNotes: (state, action) => {
      console.log(state.notes);
      console.log(action.payload);
      state.notes = action.payload;
      console.log(state.notes)
    },
    addNote: (state, actions) => {
      console.log(state.notes)
      console.log(actions.payload);
      state.notes.unshift(actions.payload);
    },
    removeNote: (state, actions) => {
      state.notes = state.notes.filter(
        (current) => current.id !== actions.payload.id
      );
    },
    updateNote: (state, actions) => {
      const { key, updatedNote } = actions.payload;
      console.log(key, updatedNote);
      const noteIndex = state.notes.findIndex((note) => note.id === key);
      console.log(state.notes)
      console.log(noteIndex)
      if (noteIndex !== -1) {
        state.notes[noteIndex] = updatedNote;
      }
    },
    updateSearchQuery: (state, actions) => {
      state.searchQuery = actions.payload.value;
    },
    setToken: (state,action) => {
      state.token = action.payload.token;
    },
    setIsSignedIn: (state, action) => {
      console.log(action.payload)
      state.isSignedIn = action.payload
    }, 
    setIsloading:(state,action) => {
      state.isLoading = action.payload
    }
  },
});



export const {
  addNote,
  removeNote,
  updateNote,
  updateSearchQuery,
  updateNotes,
  setIsSignedIn,
  setIsloading,
} = noteSlice.actions;

export default noteSlice.reducer;
