import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { Slide, ToastContainer } from "react-toastify";

const ToastCtn = () => (
  <ToastContainer
    autoClose={5000}
    hideProgressBar
    closeButton={false}
    transition={Slide}
    draggable={false}
    pauseOnFocusLoss={false}
    closeOnClick={false}
    className="toaster"
    theme="dark"
    limit={3}
  />
);

export default React.memo(ToastCtn);
