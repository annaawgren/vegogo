import React from "react";
import "./Loading.css";

function Loading(props) {
  return (
    <div className="Loading">
      <div className="Loading-headline" />
      <div className="Loading-image" />
      <div className="Loading-para" />
      <div className="Loading-para" />
      <div className="Loading-para" />
      {props.children && <div className="Loading-text">{props.children}</div>}
    </div>
  );
}

export default Loading;
