import React from "react";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { render } from "react-dom";
require("jquery");

render(<App />, document.getElementById("root"));
registerServiceWorker();
