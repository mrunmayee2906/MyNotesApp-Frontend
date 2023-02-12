// import logo from './logo.svg';
// import './App.css';
// to setup routing 
// use this moving forward since v6.4
import { useCallback, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./Router";
// import { AuthContext } from "./context/auth-context";


const App = () => {

  const router = Router();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const login = useCallback(() => {
  //   console.log("Entered login callback");
  //   setIsLoggedIn(prevLoggedIn => (true));
  //   console.log(isLoggedIn);
  // }, []);

  // const logout = useCallback(() => {
  //   setIsLoggedIn(prevLoggedIn => (false));
  // }, []);

  return (
    // <div>
    //   <h1>MyNotes App</h1>
    // </div>
    // <AuthContext.Provider value={{
    //   isLoggedIn: isLoggedIn, 
    //   login: login, 
    //   logout: logout
    // }}>
      <RouterProvider router={router} />
    // </AuthContext.Provider>
  );
}

export default App;