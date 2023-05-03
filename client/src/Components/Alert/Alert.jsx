import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../../redux/alert";

const Alert = () => {
  const { show, type, message, icon } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    let timeout;
    if (show) {
      timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, show]);

  return (
    show ? (
      <>
        <div className={`alert ${type} shadow-lg my-2 max-w-screen-xl`}>
          <div>
            {icon ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <span>{message}</span>
          </div>
        </div>
      </>
    ):<div className="md:h-14 my-2 bg-opacity-0">

    </div>
  );
};

export default Alert;
