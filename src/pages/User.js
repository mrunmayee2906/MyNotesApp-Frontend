import React, { useState, useContext, useEffect } from "react";
import MainNavigation from "../components/Navigation/MainNavigation";
import Footer from "../components/Footer";
import UserNote from "../components/UserNote";
import NewNote from "../components/NewNote";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import "./User.css";

const User = () => {
  const auth = useContext(AuthContext);
  // state to store the notes
  const [notes, setNotes] = useState([]);
  // state to refresh when new note is added
  const [refresh, setRefresh] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // to prevent re-renders
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userID}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );

        setNotes(responseData.notes);
      } catch (err) {}
    };

    fetchNotes();
  }, [sendRequest, auth.userID, auth.token, refresh]);

  // add note when clicked on add button

  const addNoteToUI = (inputNote) => {
    // if (inputNote.title !== "" || inputNote.content !== "") {
    //   setNotes((prevNotes) => [inputNote, ...prevNotes]);
    // }
    // toggle the refersh value, and pass it as a dependency to the above useEffect to fetch the notes again
    setRefresh((prevValue) => !prevValue);
    // works!!!!!!!!!!!!!!!!
  };

  const deleteNote = (deletedPlaceId) => {
    // update notes array using setNotes
    setNotes((notes) => notes.filter((note) => note.id !== deletedPlaceId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="user-container">
        <MainNavigation />
        <div className="new-note">
          <NewNote onAdd={addNoteToUI} />
        </div>
        <div className="notes-container">
          {notes.map((note) => (
            <UserNote
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              onDelete={deleteNote}
            />
          ))}
        </div>

        <Footer className="user-footer" />
      </div>
    </React.Fragment>
  );
};

export default User;
