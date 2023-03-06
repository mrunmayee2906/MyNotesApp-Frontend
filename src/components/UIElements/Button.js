import "./Button.css";

const Button = (props) => {
  return (
    <button
      className="btn"
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
