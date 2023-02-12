import { useState } from "react";
import "./CreateNoteArea.css";

const CreateArea= (props) => {
  const [inputNote, setInputNote] = useState({
    title: "",
    content: ""
  });
  // const [inputContent, setInputContent] = useState("");

  const handleChange = (event) => {
    // console.log(event.target.value);
    const { value, name } = event.target;

    setInputNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  return (
    <div>
      {/* set a callback for submit, which takes the current note as input */}
      <form
        className="create-note"
        onSubmit={(event) => {
          props.onSubmit(event, inputNote);
          setInputNote({
            title: "",
            content: ""
          });
        }}
      >
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
        <button className="add-btn">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
