import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth-context";
import ErrorModal from "./UIElements/ErrorModal";
import LoadingSpinner from "./UIElements/LoadingSpinner";

import "./NewNote.css";

const NewNote = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [inputNote, setInputNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setInputNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const noteSubmitHandler = async (event) => {
    event.preventDefault();

    if (inputNote.title !== "" || inputNote.content !== "") {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userID}/notes`,
          "POST",
          JSON.stringify({
            title: inputNote.title,
            content: inputNote.content,
            userID: auth.userID,
          }),
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          }
        );
        // check if we need to redirect to "/" by using history
      } catch (err) {
        console.log(err);
      }

      // add note to UI
      props.onAdd(inputNote);

      setInputNote({
        title: "",
        content: "",
      });
      navigate("/");
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="create-note">
        <form onSubmit={noteSubmitHandler}>
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={inputNote.title}
          />
          <textarea
            name="content"
            placeholder="Take a note..."
            rows="3"
            onChange={handleChange}
            value={inputNote.content}
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default NewNote;
