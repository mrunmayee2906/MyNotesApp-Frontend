import { useState } from "react";
import { Link} from "react-router-dom";

import "./Dropdown.css";

const Dropdown = props => {

  const [buttonToggle, setButtonToggle] = useState(false);


  const onClickHandler = () => {
    /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
    setButtonToggle(prevValue => (!prevValue));
    console.log(buttonToggle);
    // document.getElementById("myDropdown").classList.toggle("show");

  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.drop-btn')) {
      // var dropdowns = document.getElementsByClassName("dropdown-content");
      // var i;
      // for (i = 0; i < dropdowns.length; i++) {
      //   var openDropdown = dropdowns[i];
      //   if (openDropdown.classList.contains('show')) {
      //     openDropdown.classList.remove('show');
      //   }
      // }
      setButtonToggle(false);
    }
  }

  return (
    <div className="dropdown">
      <button onClick={onClickHandler} className="drop-btn">AT</button>
      <div className="dropdown-content" style={{display: buttonToggle ? "block" : "none"}}>
        <Link to="/auth">Log out</Link>
      </div>
    </div>
  );
};

export default Dropdown;