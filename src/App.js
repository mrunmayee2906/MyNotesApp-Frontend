// import logo from './logo.svg';
// import './App.css';
import { useCallback, useState } from "react";
// to setup routing
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import Router from "./Router";
import Auth from "./pages/Auth";
import User from "./pages/User";
import ErrorPage from "./pages/ErrorPage";
import { AuthContext } from "./context/auth-context";

const App = () => {
  // const router = Router();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // we'll check the token, instead of isLoggedIn
  const [token, setToken] = useState(false);
  const [userID, setUserID] = useState(null); //keep track of current user

  const login = useCallback((uid, token) => {
    // console.log("Entered login callback");
    // setIsLoggedIn(true);
    setToken(token); // using the token value to determine if loggedin or not
    // console.log(isLoggedIn);
    setUserID(uid);
  }, []);

  const logout = useCallback(() => {
    // setIsLoggedIn(false);
    setToken(null);
    setUserID(null);
  }, []);

  let routes;

  // if (isLoggedIn) {
  if (token) {
    //using token to authenticate
    routes = (
      <Routes>
        <Route path="/" element={<User />} errorElement={<ErrorPage />} />
        <Route
          path="/auth"
          element={<Navigate to="/" />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="*"
          element={<Navigate to="/" />}
          errorElement={<ErrorPage />}
        />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/auth" element={<Auth />} errorElement={<ErrorPage />} />
        <Route
          path="*"
          element={<Navigate to="/auth" />}
          errorElement={<ErrorPage />}
        />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token, // to convert to boolean
        token: token, // as we'll need the token when we send reusts
        userID: userID,
        login: login,
        logout: logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;
