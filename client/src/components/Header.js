import React from "react";
import { Link, withRouter } from "react-router-dom";

import { isAuthenticated, signOut, isActive } from "../Config";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "0px !important",
  },
  navbar: {
    backgroundColor: "#4477ff",
  },
  title: {
    flexGrow: 1,
  },
  button: {
    textDecoration: "none",
    color: "#fff !important",
  },
}));

function Header({ history, location }) {
  const classes = useStyles();
  console.log(location.pathname);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Greek Gods List
          </Typography>

          {!isAuthenticated() ? (
            <Button>
              {location.pathname === "/signup" ? (
                <Link to="/" className={classes.button}>
                  Sign In
                </Link>
              ) : (
                <Link to="/signup" className={classes.button}>
                  Sign Up
                </Link>
              )}
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                style={isActive(history, "/")}
                onClick={() =>
                  signOut(() => {
                    history.push("/");
                  })
                }
              >
                Sign Out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);
