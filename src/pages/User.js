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
  // console.log(auth.token);
  // state to store the notes
  const [notes, setNotes] = useState([]);
  // const [addNote, setAddNote] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // to prevent re-renders
  useEffect(() => {
    const fetchNotes = async () => {
      // console.log(addNote);
      // console.log(auth);
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${auth.userID}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );

        setNotes(responseData.notes);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchNotes();
  }, [sendRequest, auth.userID, auth.token]);

  // add note when clicked on add button

  const addNoteToUI = (inputNote) => {
    if (inputNote.title !== "" || inputNote.content !== "") {
      setNotes((prevNotes) => [inputNote, ...prevNotes]);
    }
  };

  const deleteNote = (deletedPlaceId) => {
    // update notes array using setNotes
    setNotes((notes) => notes.filter((note) => note.id !== deletedPlaceId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div>
        <MainNavigation />
        {/* <NewNote onSubmit={addNote} /> */}
        <NewNote onAdd={addNoteToUI} />
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

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default User;
