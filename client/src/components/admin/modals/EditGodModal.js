import React, { useState } from "react";
import { confirmEdit, getAllGods } from "../../../Config";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
  },

  modal: {
    width: "100%",
    maxWidth: "100vw",
    position: "fixed",
    top: "10%",
    left: "0",
    transform: "translate(0, -2%)",
    overflowY: "scroll",

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

function EditGodModal({
  setGodData,
  godData,
  setMessage,
  modalGod,
  open,
  handleClose,
}) {
  const [godDetails, setGodDetails] = useState({
    name: modalGod.name,
    description: modalGod.description,
    image: modalGod.image,
  });

  const { name, description, image } = godDetails;
  const classes = useStyles();

  function onChange(e) {
    setGodDetails({ ...godDetails, [e.target.name]: e.target.value });
  }

  const editGod = (id, details) => {
    confirmEdit(id, details).then((res) => console.log(res));
    handleClose();
    getAllGods().then((res) => {
      console.log(res);
      setGodData(res);
    });

    setMessage(`${name} successfully edited.`);
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

          <div>
            <TextField
              id="simple-modal-title"
              value={name}
              onChange={onChange}
              name="name"
              label="Name"
            />
          </div>
          <br />
          <div>
            <TextField
              value={description}
              onChange={onChange}
              name="description"
              id="simple-modal-description"
              rowsMax={8}
              style={{ width: "100%" }}
              label="Description"
              multiline
            />
          </div>
          <br />
          <div>
            <TextField
              value={image}
              onChange={onChange}
              name="image"
              style={{ width: "100%" }}
              id="simple-modal-description"
              label="Image URL"
              multiline
            />
          </div>
          <br />

          <div>
            <Button variant="contained" onClick={handleClose}>
              <CancelIcon /> Cancel
            </Button>{" "}
            <Button
              style={{ backgroundColor: "#44ff99", float: "right" }}
              variant="contained"
              onClick={() => editGod(modalGod._id, godDetails)}
            >
              <CheckIcon /> Confirm Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EditGodModal;
