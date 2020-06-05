import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  wrapper: {
    width: "50ch",
    margin: "1rem auto",
    textAlign: "center",
    border: "0.1rem solid #4477ff",
    borderRadius: "0.5rem",
    padding: "1rem",
  },
  button: {
    margin: theme.spacing(1),
  },
  alert: {
    width: "60%",
    margin: "auto",
    textAlign: "center",
    "& div": {
      fontWeight: "bold",
    },
  },
}));

export default function AddGod() {
  const [godDetails, setGodDetails] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [appDetails, setAppDetails] = useState({
    message: "",
    error: "",
  });

  const { name, description, image } = godDetails;
  const { message, error } = appDetails;
  const classes = useStyles();

  function onChange(e) {
    setGodDetails({ ...godDetails, [e.target.name]: e.target.value });
  }

  function validateGodDetails() {
    if (!name || !description || !image) {
      console.log("error2");
      setAppDetails({ error: "Please ensure all fields are filled out." });
      return false;
    } else {
      return true;
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(godDetails);
    if (validateGodDetails()) {
      axios
        .post("http://localhost:4000/gods/add_god", godDetails)

        .catch(
          (err) => console.log(err),
          setAppDetails({
            error: `Sorry. There was a problem adding ${name} has been added to the database. 😢 <br />Please try again.`,
          })
        );
      setAppDetails({ message: `${name} has been added to the database. 😊` });
      setGodDetails({ name: "", description: "", image: "" });
    }
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Link to="/list" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Home
          </Button>
        </Link>
      </div>
      {error && (
        <Alert severity="info" className={classes.alert}>
          <div>{error}</div>
        </Alert>
      )}
      {message && (
        <Alert severity="success" className={classes.alert}>
          <div>{message}</div>
        </Alert>
      )}

      <div className={classes.wrapper}>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              required
              id="standard-basic"
              label="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div>
            <TextField
              required
              id="standard-multiline-flexible"
              label="Description:"
              multiline
              rowsMax={8}
              style={{ width: "80%" }}
              name="description"
              value={description}
              placeholder="Description"
              onChange={onChange}
            />
          </div>
          <div>
            <TextField
              required
              id="standard-basic"
              label="Image URL"
              name="image"
              value={image}
              onChange={onChange}
            />
          </div>
          <br />
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={onSubmit}
            >
              Add God
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
