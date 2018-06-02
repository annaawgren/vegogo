import React from "react"
import "./App.css"

import vegogologo from "./images/vegogo-white.png"


class Helloworld extends React.Component {

  render() {
    return(
      <div className="helloworld-bg">
        <img src={vegogologo} alt="vegogo logo" />
      </div>

    )
  }
}


export default Helloworld
