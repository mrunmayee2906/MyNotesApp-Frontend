import { createContext } from "react";

// create context to share data between components

export const AuthContext = createContext({
  // initialise
  isLoggedIn: false,
  token: null,
  userID: null,
  login: () => {},
  logout: () => {},
});
