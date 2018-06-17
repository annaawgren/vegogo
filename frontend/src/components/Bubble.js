import React from "react";
import bubbleDark from "../images/bubble-dark.svg";
import bubbleYellow from "../images/bubble-yellow.svg";
import bubbleGreen from "../images/bubble-green.svg";
import bubbleRed from "../images/bubble-red.svg";
import "./Bubble.css";

function Bubble(props) {
  let { color = "yellow", text = "" } = props;

  let img;
  switch (color) {
    case "dark":
      img = <img className="Bubble-img" src={bubbleDark} alt="" />;
      break;
    case "yellow":
      img = <img className="Bubble-img" src={bubbleYellow} alt="" />;
      break;
    case "green":
      img = <img className="Bubble-img" src={bubbleGreen} alt="" />;
      break;
    case "red":
    default:
      img = <img className="Bubble-img" src={bubbleRed} alt="" />;
      break;
  }

  return (
    <div className={`Bubble Bubble--${color}`}>
      {img}
      {text && <p className="Bubble-text">{text}</p>}
    </div>
  );
}

export default Bubble;
