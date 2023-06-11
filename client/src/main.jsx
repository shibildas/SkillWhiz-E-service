import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user";
import adminReducer from "./redux/admin";
import expertReducer from "./redux/expert";
import alertReducer from "./redux/alert";

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    expert: expertReducer,
    alert: alertReducer,
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
