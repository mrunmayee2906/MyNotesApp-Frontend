import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import Dropdown from "./Dropdown";

import "./MainNavigation.css"

const MainNavigation = props => {
  return (
    <MainHeader>
      <h1 className="main-navigation__title">
      {/* Link is like href, on clicking this we will be taken to the home route, specified by the to property */}
        <Link to="/">MyNotes</Link>
      </h1>
      <nav className="main-navigation__header-nav">
        <Dropdown />
      </nav>
      {/* <hr /> */}
    </MainHeader>
  )
};

export default MainNavigation;

