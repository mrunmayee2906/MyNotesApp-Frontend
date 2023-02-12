import { useContext } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import User from "./pages/User";
import ErrorPage from "./pages/ErrorPage";
// import { AuthContext } from "./context/auth-context";

const Router = () => {

  // const auth = useContext(AuthContext);

  const router = createBrowserRouter([
    // (auth.isLoggedIn && 
      {
      path: "/",
      element: <User />,
      // does not need the exact property
      errorElement: <ErrorPage />
    },
    // ),
    {
      path: "/auth",
      // element: (auth.isLoggedIn ? <Navigate to="/" replace/> : <Auth />),
      element: <Auth />,
      errorElement: <ErrorPage />
    },
    {
      path: "*",
      element: <Navigate to="/auth" />,
      errorElement: <ErrorPage />
    }
  ]);

  return router;
}

export default Router;
