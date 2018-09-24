import React from "react";
import classnames from "classnames";
import toggleIconImg from "../images/icon-toggle.svg";
import "./ToggleIcon.css";

function ToggleIcon(props) {
  let openingHourIconClassNames = classnames({
    ToggleIcon: true,
    "ToggleIcon--opened": props.opened,
    "ToggleIcon--loading": props.loading
  });

  return (
    <img className={openingHourIconClassNames} src={toggleIconImg} alt="" />
  );
}

export default ToggleIcon;
