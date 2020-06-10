import React, { useState } from "react";
import { signUp } from "../Config";

import { Link } from "react-router-dom";

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
    "&:hover": {
      backgroundColor: "#33ee44",
    },
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    margin: "0.6rem auto",
    width: "85%",
  },
  signInText: {
    backgroundColor: "#fff",
    width: "50%",
    margin: "auto",
    padding: "1rem",
    borderRadius: "0.8rem",
  },
  passwordInfo: {
    padding: "0.2rem",
    margin: "0rem !important",
  },
  loadingSpinner: {
    height: "5rem",
  },
  body: {
    backgroundImage:
      "url('https://i.ytimg.com/vi/DyBDy8urs1Q/maxresdefault.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  passwordIcon: {
    color: "black",
  },
}));

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [appDetails, setAppDetails] = useState({
    error: "",
    success: "",
    loading: false,
    showPassword: false,
    showConfirmPassword: false,
    passwordFieldFocus: false,
  });

  const { name, email, password, confirmPassword } = userDetails;
  const {
    success,
    error,
    loading,
    showPassword,
    showConfirmPassword,
    passwordFieldFocus,
  } = appDetails;

  function handleChange(e) {
    if (e.target.name === "password") {
      if (e.target.value.length > 6 && /\d/.test(e.target.value)) {
        setAppDetails({ ...appDetails, passwordFieldFocus: false });
      }
    }
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }

  function handleSignUp(e) {
    e.preventDefault();
    setAppDetails({ ...appDetails, loading: true });
    if (password === confirmPassword) {
      signUp({ name, email, password }).then((data) => {
        if (data.error) {
          setAppDetails({
            error: `${data.error} `,
            loading: false,
          });
        } else {
          setAppDetails({
            success: `Thanks for signing up ${name}. 😊`,
            loading: false,
          });
        }
      });
    } else {
      setAppDetails({
        error:
          "Please ensure that the password and confirm password fields match.",
        loading: false,
      });
    }
  }

  const handleClickShowPassword = () => {
    setAppDetails({ ...appDetails, showPassword: !appDetails.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setAppDetails({ ...appDetails, showConfirmPassword: !showConfirmPassword });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Grid container justify="center">
        <div className={classes.container}>
          <h3>
            <u style={{ color: "white" }}>SIGN UP</u>
          </h3>
          <form className={classes.form}>
            <OutlinedInput
              onChange={handleChange}
              placeholder="Username"
              name="name"
              type="text"
              className={classes.input}
              endAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
            <br />
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

            <OutlinedInput
              onChange={handleChange}
              onFocus={() =>
                setAppDetails({ ...appDetails, passwordFieldFocus: true })
              }
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
            {passwordFieldFocus && (
              <p className={classes.passwordInfo}>
                Password must be at least 6 characters long and contain a
                number.
              </p>
            )}
            <br />
            <OutlinedInput
              onChange={handleChange}
              placeholder="Confirm Password"
              name="confirmPassword"
              className={classes.input}
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    className={classes.passwordIcon}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <br />

            {error && <Alert severity="error">{error}</Alert>}
            {success && (
              <Alert severity="info">
                {success} Please Sign in <Link to="/">here</Link>.
              </Alert>
            )}
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
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </form>
          <br />
          <p className={classes.signInText}>
            Already have an account? <br />
            Sign in <Link to="/">here</Link>.
          </p>
        </div>
      </Grid>
    </div>
  );
};

export default SignUp;
