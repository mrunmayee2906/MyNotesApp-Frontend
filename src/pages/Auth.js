import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useForm } from "../hooks/form-hook.js";
import { useHttpClient } from "../hooks/http-hook";
import Input from "../components/FormElements/Input";
import Button from "../components/UIElements/Button";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../util/validators";
import Logo from "../components/Navigation/Logo";
import "./Auth.css";

const Auth = (props) => {
  // object from authcontext
  const auth = useContext(AuthContext);
  // to check if user is logged in or not
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  const switchModeHandler = () => {
    if (!isLoginMode) {
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    // console.log(formState.inputs);
    event.preventDefault();

    // to point to backend
    // signup if not in loginmode
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          // headers attached to the outgoing reuest
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            // the backend will know that it is receiving json data
            "Content-Type": "application/json",
            Authorization: `Bearer + ${auth.token}`,
          }
        );

        auth.setUserInitials(formState.inputs.email.value.slice(0, 1));
        // console.log(auth.userInitials);
        // in the backend we send the response which contains the user object
        // we can extract the userID from the user object here and use in the auth-context to pass this info to every component that requires userID
        // console.log(responseData);
        auth.login(responseData.userID, responseData.token);
      } catch (error) {
        // console.log(error);
      }
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          // headers attached to the outgoing reuest
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            // the backend will know that it is receiving json data
            "Content-Type": "application/json",
            Authorization: `Bearer + ${auth.token}`,
          }
        );

        auth.setUserInitials(formState.inputs.email.value.slice(0, 1));

        auth.login(responseData.userID, responseData.token);
      } catch (error) {
        // console.log(error);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="authentication">
        <ErrorModal error={error} onClear={clearError} />

        <header className="authentication__header">
          <Logo />
        </header>
        <div className="authentication__container">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="form-wrap">
            <form onSubmit={authSubmitHandler}>
              <Input
                className="form-control"
                element="input"
                id="email"
                type="email"
                placeholder="Email"
                onInput={inputHandler}
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email"
                initialIsValid={false}
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
                initialIsValid={false}
              />
              <Button
                type="submit"
                disabled={!formState.isValid}
                text={isLoginMode ? "Log in" : "Sign up"}
              />
            </form>
          </div>
          <footer className="form__footer">
            <p>
              {isLoginMode
                ? "Don't have an account? "
                : "Already have an account? "}{" "}
              <Button
                onClick={switchModeHandler}
                text={isLoginMode ? "Sign up" : "Log in"}
              />
            </p>
          </footer>
        </div>
        <footer>
          <p>Copyright &copy; NotesApp 2023</p>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Auth;
