import { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useForm } from "../hooks/form-hooks";
import Input from "../components/FormElements/Input";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../util/validators";

import "./Auth.css";

const Auth = (props) => {
  // object from authcontext
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    // console.log(formState.inputs);
    event.preventDefault();
    // auth.login();
    // console.log(auth.isLoggedIn);
  };

  return (
    <div className="authentication">
      <form onSubmit={authSubmitHandler}>
        <Input
          className="form-control"
          element="input"
          id="email"
          type="email"
          placeholder="Email"
          onInput={inputHandler}
          validators={[VALIDATOR_EMAIL]}
          errorText="Please enter a valid email"
        />
        <Input
          className="form-control"
          element="input"
          id="password"
          type="password"
          placeholder="Password"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Password should be atleast 6 characters"
        />
        <button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Log in" : "Sign up"}
        </button>
      </form>
      <p>
        {isLoginMode ? "Don't have an account? " : "Already have an account? "}{" "}
        <button onClick={switchModeHandler}>
          {isLoginMode ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
