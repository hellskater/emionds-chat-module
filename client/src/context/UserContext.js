import React, { createContext, useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";

const UserContext = createContext(undefined);

const UserProvider = ({ children }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUser({});
    } else {
      oktaAuth
        .getUser()
        .then((info) => {
          setUser(info);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [authState, oktaAuth]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
