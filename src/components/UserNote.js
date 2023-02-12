import "./UserNote.css";

function UserNote(props) {
  // const deleted = () => {
  //   console.log("clicked the delete button");
  // };

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <div className="note-actions">
        <button
          className="delete-btn"
          onClick={(event) => {
            // console.log("delete button");
            props.onDelete(event, props.id);
          }}
          // onClick={deleted}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserNote;
