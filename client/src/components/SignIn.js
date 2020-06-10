import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

import { signIn, authenticate } from "../Config";
import { isAuthenticated } from "../Config";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  container: {
    width: "80%",
    textAlign: "center",
    margin: "5rem auto",
    border: "0.1rem solid #4477ff",
    borderRadius: "0.5rem",
    padding: "1rem",
    fontFamily: "arial",
    background:
      "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(48,249,7,1) 100%);",
  },

  button: {
    backgroundColor: "#44ff77",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#33ee44",
    },
  },

  input: {
    backgroundColor: "#fff",
    margin: "0.6rem auto",
    width: "95%",
  },

  loadingSpinner: {
    height: "5rem",
  },
  body: {
    backgroundImage:
      "url('https://i.pinimg.com/originals/ff/de/95/ffde958ff41322a21315cb061b0e995c.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  passwordIcon: {
    color: "black",
  },
  signUpText: {
    backgroundColor: "#fff",
    width: "50%",
    margin: "auto",
    padding: "1rem",
    borderRadius: "0.8rem",
  },
}));

const SignIn = () => {
  const classes = useStyles();

  const { user } = isAuthenticated();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [appDetails, setAppDetails] = useState({
    error: "",
    loading: false,
    showPassword: false,
    redirectToReferrer: false,
  });

  const { email, password } = userDetails;
  const { error, loading, showPassword, redirectToReferrer } = appDetails;

  function handleChange(e) {
    setAppDetails({ ...appDetails, error: false });
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    setAppDetails({ ...appDetails, error: false, loading: true });
    if (validateUserInput(email, password)) {
      signIn({ email, password }).then((data) => {
        console.log(data);
        if (data.error) {
          setAppDetails({
            ...appDetails,
            loading: false,
            error: data.error,
          });
        } else {
          authenticate(data, () => {
            setAppDetails({
              ...appDetails,
              redirectToReferrer: true,
            });
          });
        }
      });
    }
  }

  const validateUserInput = (email, password) => {
    if (!email) {
      setAppDetails({
        error: "Please enter an email address.",
      });
    } else if (!password) {
      setAppDetails({
        error: "Please enter a password.",
      });
    } else {
      return true;
    }
  };

  const redirectUser = () => {
    if (redirectToReferrer || isAuthenticated()) {
      console.log(user);
      if (
        isAuthenticated().data.user &&
        isAuthenticated().data.user.role === 1
      ) {
        return <Redirect to="/admin_god_list" />;
      } else if (
        isAuthenticated().data.user &&
        isAuthenticated().data.user.role === 0
      ) {
        return <Redirect to="/user_god_list" />;
      }
    }
  };

  const handleClickShowPassword = () => {
    setAppDetails({ ...appDetails, showPassword: !showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.body}>
      <Grid container justify="center">
        <div className={classes.container}>
          <h3>
            <u style={{ color: "white" }}>SIGN IN</u>{" "}
          </h3>
          <form className={classes.form}>
            <OutlinedInput
              onChange={handleChange}
              placeholder="Email"
              name="email"
              type="email"
              className={classes.input}
              endAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
            />
            <br />
            <br />
            <OutlinedInput
              onChange={handleChange}
              placeholder="Password"
              name="password"
              className={classes.input}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    className={classes.passwordIcon}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <br />

            {error && <Alert severity="error">{error}</Alert>}
            {loading && (
              <img
                className={classes.loadingSpinner}
                src="https://i.ya-webdesign.com/images/transparent-welcome-gif-background-3.gif"
                alt="Loading..."
              />
            )}
            <br />
            <Button
              variant="contained"
              className={classes.button}
              onClick={onSubmit}
              value="Submit"
            >
              Sign In
            </Button>
          </form>
          <br />
          <p className={classes.signUpText}>
            Don't have an account yet? Sign up <Link to="/signup">here</Link>.
          </p>
        </div>
        {redirectUser()}
      </Grid>
    </div>
  );
};

export default SignIn;
