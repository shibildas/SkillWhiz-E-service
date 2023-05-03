import React from "react";

const Toast = ({msg}) => {
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-info">
        <div>
          <span>{msg}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
