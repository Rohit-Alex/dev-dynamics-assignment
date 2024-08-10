import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AllProvider from "Provider/AllProvider";
import ToastCtn from "Container/ToastCtn";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AllProvider>
    <App />
    <ToastCtn />
  </AllProvider>
);

reportWebVitals();
