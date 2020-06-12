import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addGod } from "../../Config";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  container: {
    width: "70%",
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
  linkWrapper: {
    textAlign: "center",
  },
  pageContainer: {
    position: "relative",
    minHeight: "100vh",
  },
}));

export default function AddGod() {
  const [godDetails, setGodDetails] = useState({
    name: "bob  ",
    description: "iii",
    image: "iii",
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

  const validateGodDetails = (name, description, image) => {
    if (!name || !description || !image) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateGodDetails(name, description, image)) {
      addGod(godDetails).then((data) => {
        if (data.error) {
          setAppDetails({
            error: `Sorry. There was a problem adding ${name} has been added to the database. 😢 <br />Please try again.`,
          });
        } else {
          setAppDetails({
            message: `${name} has been added to the database. 😊`,
          });
          setGodDetails({ name: "ii", description: "pp", image: "uuu" });
        }
      });
    } else {
      setAppDetails({
        error: `Please ensure all fields are filled out.`,
      });
    }
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.linkWrapper}>
        <Link to="/admin_god_list" style={{ textDecoration: "none" }}>
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

      <div className={classes.container}>
        <form className={classes.form} noValidate autoComplete="off">
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
    </div>
  );
}
