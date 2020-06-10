import React from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../Config";

function PageNotFound() {
  console.log("HI");
  const redirectUser = () => {
    console.log(isAuthenticated().data);
    if (isAuthenticated().data.user.role === 0) {
      return <Redirect to="/user_god_list" />;
    } else if (isAuthenticated().data.user.role === 1) {
      return <Redirect to="/admin_god_list" />;
    } else {
      return <Redirect to="/" />;
    }
  };
  {
    redirectUser();
  }

  return <div>hi</div>;
}

export default PageNotFound;
