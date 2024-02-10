import axios from "axios";
import "./App.css";
import BackToTop from "./Components/BackToTop";
import Header from "./Components/Header";
import ListComponent from "./Components/ListComponent";
import InputComponent from "./Components/MainComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSignedIn, updateNotes } from "./features/noteSlice";
import AuthenticateUser from "./Components/UserAuth/Signup";

// import { fetchNotes, updateNote, updateNotes } from './features/noteSlice';


function App() {

  const dispatch = useDispatch();
  let token = localStorage.getItem("token")|| "";
  const fetchNotes = async () => {
    try {
      token = localStorage.getItem("token");
      const res = await axios.get("https://dynamic-notes.onrender.com/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.data;
      console.log(data);
      if (res.status === 204) {
        console.log("No Notes available");
        dispatch(updateNotes([]));
      } else{
        dispatch(updateNotes(data));
      }
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 403) {
        alert("You are not logged in");
        dispatch(setIsSignedIn(false));
        localStorage.removeItem("token");
      }
    }
  };


  const isSignedIn = useSelector(state => state.isSignedIn);
  const [newAccount, setNewAccount] = useState(token ? false : true);

  console.log(isSignedIn)
  useEffect(() => {
    console.log(isSignedIn)
    if (isSignedIn) {
      fetchNotes();
    }
  }, [isSignedIn]);

  console.log(newAccount)
  return (
    <>
      {isSignedIn ? (
        <div className="App">
          
          <Header isSignedIn={isSignedIn} newAccount={newAccount} />
          <InputComponent isSignedIn={isSignedIn} />
          <ListComponent />
          <BackToTop />
        </div>
      ) : (
        <>
          <Header isSignedIn={isSignedIn} />
          <AuthenticateUser
            newAccount={newAccount}
            setNewAccount={setNewAccount}
            fetchNotes={fetchNotes}
          />
        </>
      )}
    </>
  );
}

export default App;
