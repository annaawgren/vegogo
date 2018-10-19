import React from "react";
import "./VegogoButton.scss";

export default function VegogoButton(props) {
  const { children, className } = props;

  return (
    <button {...props} className={"VegogoButton " + className}>
      {children}
    </button>
  );
}
