import { useState } from "react";
import MainNavigation from "../components/Navigation/MainNavigation";
import Footer from "../components/Footer";
import UserNote from "../components/UserNote";
import CreateNoteArea from "../components/NewNote";
import "./User.css";

const User = () => {
  // state to store the notes
  const [notes, setNotes] = useState([]);

  // add note when clicked on add button

  const addNote = (event, inputNote) => {
    // console.log(inputNote);
    // console.log(inputNote === {title: "", content: ""});
    // add note only when the title or content are not empty
    if (inputNote.title !== "" || inputNote.content !== "") {
      setNotes((prevNotes) => [inputNote, ...prevNotes]);
    }
    // to prevent the page from reloading when we click the button

    event.preventDefault();
  };

  const deleteNote = (event, id) => {
    // console.log("delete");
    setNotes((notes) => notes.filter((note, index) => index !== id));
    event.preventDefault();
  };

  return (
    <div>
      <MainNavigation />
      <CreateNoteArea onSubmit={addNote} />
      <div className="notes-container">
        {notes.map((note, index) => (
          <UserNote
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default User;
