// import logo from './logo.svg';
// import './App.css';
// import { useCallback, useEffect, useState } from "react";
// to setup routing
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import Router from "./Router";
import { useState } from "react";
import Auth from "./pages/Auth";
import User from "./pages/User";
import ErrorPage from "./pages/ErrorPage";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

const App = () => {
  // const router = Router();
  const { token, login, logout, userID } = useAuth();

  const [userInitials, setUserInitials] = useState();

  let routes;

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
        // initials: {
        userInitials: userInitials,
        setUserInitials: setUserInitials,
        // },
        login: login,
        logout: logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;
