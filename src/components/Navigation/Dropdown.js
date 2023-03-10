import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./Dropdown.css";

const Dropdown = (props) => {
  const auth = useContext(AuthContext);

  const [buttonToggle, setButtonToggle] = useState(false);

  const onClickHandler = () => {
    /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
    setButtonToggle((prevValue) => !prevValue);
    console.log(auth);
  };

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(".drop-btn")) {
      setButtonToggle(false);
    }
  };

  return (
    <div className="dropdown">
      <ul className="dropdown-menu">
        <li className="dropdown-menu-items">
          <button
            type="button"
            aria-haspopup="menu"
            className="drop-btn"
            onClick={onClickHandler}
          >
            {auth.userInitials}
          </button>
          <ul
            className="dropdown-content"
            style={{ display: buttonToggle ? "block" : "none" }}
          >
            <li className="dropdown-menu-items">
              <Link to="/auth" onClick={auth.logout}>
                Log out
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
