import { Link } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  return (
    <h1 className="main-navigation__title">
      <Link to="/">MyNotes</Link>
    </h1>
  );
};

export default Logo;
