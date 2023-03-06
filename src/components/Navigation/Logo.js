import { Link } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  return (
    <h1 className="main-navigation__title">
      {/* Link is like href, on clicking this we will be taken to the home route, specified by the to property */}
      <Link to="/">MyNotes</Link>
    </h1>
  );
};

export default Logo;
