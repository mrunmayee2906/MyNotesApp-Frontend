import { useState, useContext } from "react";
// import { AuthContext } from "../context/auth-context";

const Auth = props => {

  // object from authcontext
  // const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
  });
  // const [inputContent, setInputContent] = useState("");

  const handleChange = (event) => {
    // console.log(event.target.value);
    const { value, name } = event.target;

    setUserInput(prevInput => ({
      ...prevInput,
      [name]: value
    }));
  };


  const switchModeHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = (event) => {
    console.log("entered");
    event.preventDefault();
    // auth.login();
    // console.log(auth.isLoggedIn);
  };

  return (
    <form onSubmit={authSubmitHandler}>
      <input 
        type="email" 
        placeholder="Email"
        name="email"
        value={userInput.email}
        onChange={handleChange}
        required
      />
      <input 
        type="password"
        placeholder="Password"
        name="password"
        value={userInput.password}
        onChange={handleChange}
        required
      />
      <button type="submit">{isLoginMode ? "Log in" : "Sign up"}</button>
      <p>{isLoginMode ? "Don't have an account? " : "Already have an account? "} <button onClick={switchModeHandler}>{isLoginMode ? "Sign up" : "Log in"}</button></p>
    </form>
  );
};

export default Auth;