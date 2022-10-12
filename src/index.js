import React from "react";
import ReactDOM from "react-dom";

// import store and provider
import store from "./store";

// Connects the react application to redux.
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
