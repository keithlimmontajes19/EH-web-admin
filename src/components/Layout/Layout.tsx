import { ReactElement, useEffect } from "react";
import { Redirect, Router } from "react-router-dom";

/* styles utils*/
import {} from "./styled";
import { notificationAlert } from "utils/alerts";
import history from "utils/history";

/* components */
import MainLayout from "views/private/MainLayout";
import LoginLayout from "views/public/LoginLayout";

/* reducer action */
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "ducks/store";
import { closeNotification } from "ducks/alert/actionCreator";
import { getUserDetails } from "ducks/authentication/actionCreator";

const ComponentLayout = (): any => {
  const dispatch = useDispatch();
  const { authentication, alert }: any = useSelector<RootState>(
    (state) => state
  );
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    alert.onShow &&
      setTimeout(() => {
        notificationAlert(alert.type, alert.message, () =>
          dispatch(closeNotification())
        );
      }, 500);
  }, [alert.onShow]);

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails());
      dispatch({ type: "GET_AUTHENTICATION_SUCCESS" });
    } else {
      dispatch({ type: "GET_AUTHENTICATION_FAILED" });
    }
  }, [token]);

  return (
    <Router history={history}>
      {token && authentication.authenticated && <Redirect to="/home" />}
      {token ? <MainLayout /> : <LoginLayout />}
    </Router>
  );
};

export default ComponentLayout;
