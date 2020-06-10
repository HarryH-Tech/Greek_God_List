import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../Config";

const AdminRoute = ({ component: Component, ...rest }) => (
  console.log(isAuthenticated()),
  (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().data.user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/user_god_list",
              state: { from: props.locations },
            }}
          />
        )
      }
    />
  )
);

export default AdminRoute;
