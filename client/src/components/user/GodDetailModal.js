import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
  },

  paper: {
    textAlign: "center",
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "arial",
  },
  godDescription: {
    textAlign: "justify",
    overflowY: "hidden",
  },
}));

function GodDetailModal({ modalGod, open, handleClose }) {
  const classes = useStyles();
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
          <p id="simple-modal-description" className={classes.godDescription}>
            {modalGod && modalGod.description}
          </p>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default GodDetailModal;
