import React from "react";

import { withRouter } from "react-router-dom";
import { deleteGod, getAllGods } from "../../../Config";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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
  description: {
    maxHeight: "30vh",
    overflowY: "scroll",
    textAlign: "justify",
  },
}));

function GodDeleteModal({
  setGodData,
  godData,
  setMessage,
  modalGod,
  open,
  handleClose,
}) {
  const classes = useStyles();

  const handleDelete = (id) => {
    try {
      deleteGod(id);

      handleClose();
      getAllGods().then((res) => {
        setGodData(res);
      });

      setMessage(`${modalGod.name} successfully deleted.`);
    } catch (err) {
      console.log(err);
    }
  };

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
          <p id="simple-modal-description" className={classes.description}>
            {modalGod && modalGod.description}
          </p>
          <Button
            style={{ float: "left" }}
            variant="contained"
            onClick={handleClose}
          >
            <CancelIcon /> Cancel
          </Button>

          <Button
            style={{ float: "right" }}
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(modalGod._id)}
          >
            <DeleteIcon /> Delete God
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default withRouter(GodDeleteModal);
