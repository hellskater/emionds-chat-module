import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import Home from "./Home";
import Login from "./Login";
import Messages from "./messages/Messages";
import Profile from "./Profile";
import { oktaAuthConfig, oktaSignInConfig } from "../config/config";
import { UserProvider } from "../context/UserContext";

const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push("/login");
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Switch>
        <UserProvider>
          <Route path="/" exact={true} component={Home} />
          <SecureRoute path="/profile" component={Profile} />
          <SecureRoute path="/messages" component={Messages} />
          <Route
            path="/login"
            render={() => <Login config={oktaSignInConfig} />}
          />
          <Route path="/login/callback" component={LoginCallback} />
        </UserProvider>
      </Switch>
    </Security>
  );
};
export default AppWithRouterAccess;
