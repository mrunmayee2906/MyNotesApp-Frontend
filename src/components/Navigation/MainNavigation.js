import MainHeader from "./MainHeader";
import Dropdown from "./Dropdown";
import Logo from "./Logo";

import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <MainHeader>
      <Logo />
      <nav className="main-navigation__header-nav">
        <Dropdown />
      </nav>
      {/* <hr /> */}
    </MainHeader>
  );
};

export default MainNavigation;
