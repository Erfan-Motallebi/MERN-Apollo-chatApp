import React, { useContext } from "react";
import { authContext } from "./context/context";
import { Redirect, Route } from "react-router-dom";

const RouteAuthCheck = ({ component: Component, ...rest }) => {
  const { user } = useContext(authContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default RouteAuthCheck;
