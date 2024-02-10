import { configureStore } from "@reduxjs/toolkit";
import notesReducer from '../features/noteSlice'


export const store = configureStore({
    reducer:notesReducer
})