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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    // console.log("Entered login callback");
    setIsLoggedIn(true);
    // console.log(isLoggedIn);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
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
          element={<Navigate to="/auth" />}
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
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;
