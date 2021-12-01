import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { useDispatch } from "react-redux";

import { firebase } from "../firebase/firebase-config";

import { JournalScreen } from "../components/journal/JournalScreen";
import { login } from "../actions/auth";
import ReactLoading from "react-loading";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "750px",
        }}
      >
        <ReactLoading type={"spin"} color={"#5c62c5"} height={50} width={50} />
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={isLoggedIn}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            isAuthenticated={isLoggedIn}
            exact
            path="/"
            component={JournalScreen}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
