import React, { useContext } from "react";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth-context";
import ErrorModal from "./UIElements/ErrorModal";
import LoadingSpinner from "./UIElements/LoadingSpinner";

import "./UserNote.css";

const UserNote = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // to prevent re-renders

  const deleteNote = async () => {
    // console.log(addNote);
    try {
      await sendRequest(
        `http://localhost:5000/api/users/${auth.userID}/notes/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
    } catch (err) {
      // console.log(err);
    }

    props.onDelete(props.id); // we're getting a function from the parent component User.js
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <div className="note-actions">
          <button
            className="delete-btn"
            // onClick={(event) => {
            //   // console.log("delete button");
            //   props.onDelete(event, props.id);
            // }}
            onClick={deleteNote}
          >
            Delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserNote;
