import "react-app-polyfill/ie9"; // For IE 9-11 support
import React from "react";
// import Component from "react";
import ReactDOM from "react-dom";
// import { render } from 'react-snapshot';
import "./index.scss";
import App from "./App";
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();
