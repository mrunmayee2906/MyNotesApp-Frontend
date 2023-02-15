import { useState, useCallback, useReducer } from "react";

import Input from "./FormElements/Input";
import { VALIDATOR_REQUIRE } from "../util/validators";
import { useForm } from "../hooks/form-hooks";
import "./NewNote.css";

const NewNote = (props) => {
  // const [inputNote, setInputNote] = useState({
  //   title: "",
  //   content: "",
  // });
  // // const [inputContent, setInputContent] = useState("");

  // const handleChange = (event) => {
  //   // console.log(event.target.value);
  //   const { value, name } = event.target;

  //   setInputNote((prevNote) => ({
  //     ...prevNote,
  //     [name]: value,
  //   }));
  // };

  const [formState, inputHandler] = useForm(
    {
      // title and content together
      title: {
        value: "",
        isValid: false,
      },
      content: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const noteSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <div>
      {/* set a callback for submit, which takes the current note as input */}
      <form
        className="create-note"
        // onSubmit={(event) => {
        //   props.onSubmit(event, inputNote);
        //   setInputNote({
        //     title: "",
        //     content: "",
        //   });
        // }}
        onSubmit={noteSubmitHandler}
      >
        <Input
          id="title"
          element="input"
          type="text"
          placeholder="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid email id"
          onInput={inputHandler}
        />
        <Input
          id="content"
          element="textarea"
          placeholder="Take a note..."
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Password length should be min 6 characters"
          onInput={inputHandler}
        />
        <input
          name="title"
          placeholder="Title"
          // onChange={handleChange}
          // value={inputNote.title}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          // onChange={handleChange}
          // value={inputNote.content}
        />
        <button type="submit" className="add-btn" disabled={!formState.isValid}>
          Add
        </button>
      </form>
    </div>
  );
};

export default NewNote;
