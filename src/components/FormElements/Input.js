// Component for form inputs (used in auth page)

import { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";
import "./Input.css";

// reducer function
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        // This copies the old state object and copies all key-value pairs of that old object into this new object and then we can override selected keys, selected properties,
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialIsValid || true,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  // handler for onChange property
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  // to not show the user validation error before even they had a chance to click on the element
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  // if we want input or textarea
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.val}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.val}
      />
    );

  return (
    // to add dynamic class for different input types
    <div
      className={`${props.formControl} ${
        // show invalid when input state is not valid and when it is touched
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      {/* for in HTML is htmlFor in JSX */}
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
