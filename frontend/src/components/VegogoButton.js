import React from "react";
import classnames from "classnames";
import "./VegogoButton.scss";

export default function VegogoButton(props) {
  const { children, className, icon } = props;

  let classes = classnames({
    VegogoButton: true,
    "VegogoButton--withIcon": icon ? true : false,
    className
  });

  return (
    <button {...props} className={classes}>
      {icon && <img src={icon} alt="" className="VegogoButton-icon" />}
      {children}
    </button>
  );
}
