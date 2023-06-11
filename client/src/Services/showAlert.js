import { setAlert } from "../redux/alert";

export function showAlertSuccess(dispatch, msg) {
  dispatch(
    setAlert({
      type: "alert-success",
      icon: true,
      message: msg,
      show: true,
    })
  );
}

export function showAlertError(dispatch, msg) {
  dispatch(
    setAlert({
      type: "alert-error",
      icon: false,
      message: msg,
      show: true,
    })
  );
}
export function showAlertWarning(dispatch, msg) {
  dispatch(
    setAlert({
      type: "alert-warning",
      icon: false,
      message: msg,
      show: true,
    })
  );
}
