import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    textAlign: "center",
    padding: "0.5rem",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    fontFamily: "arial",
  },
}));

function GodDeleteModal({ setMessage, modalGod, open, handleClose }) {
  const classes = useStyles();

  const handleDelete = () => {
    const message = (
      <Typography component="div" variant="body1">
        <Box bgcolor="secondary.main" color="secondary.contrastText">
          {modalGod.name} deleted successfully. 😊
        </Box>
      </Typography>
    );
    setMessage(message);
    handleClose();
  };

  const deleteGod = () => {
    axios
      .delete("http://localhost:4000/gods/delete_god/" + modalGod._id)
      .then((res) => console.log("DELETED" + res.data))
      .then(handleDelete())
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  };
  console.log(modalGod);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <img
            className={classes.media}
            src={modalGod && modalGod.image}
            alt={modalGod && modalGod.name}
          />
          <h2 id="simple-modal-title">{modalGod && modalGod.name}</h2>
          <p id="simple-modal-description">
            {modalGod && modalGod.description}
          </p>
          <Button variant="contained" onClick={handleClose}>
            <CancelIcon /> Cancel
          </Button>

          <Button
            style={{ float: "right" }}
            variant="contained"
            color="secondary"
            onClick={deleteGod}
          >
            <DeleteIcon /> Delete God
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default GodDeleteModal;
