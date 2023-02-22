import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userID, setuserID] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token); // using the token value to determine if loggedin or not
    setuserID(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); //1hr
    setTokenExpirationDate(tokenExpirationDate);
    // storing jwt token in browser local storage
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userID: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(), //to ensure that date does not get loast when converted to string
      })
      // we're saving userID and token in local storage, in text form
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setuserID(null);
    // removetoken from storage
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // to check if user is logged in
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    // if we have the data, we log in
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userID,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]); //as login function uses the hook useCallback, it'll run only once and we don't have to worry about re-renders

  return { token, login, logout, userID };
};
