import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Checkbox from "@material-ui/core/Checkbox";

import GodDetailModal from "./modals/GodDetailModal";
import DeleteGodModal from "./modals/DeleteGodModal";
import EditGodModal from "./modals/EditGodModal";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
  },
  card: {
    textAlign: "center",
    padding: "0.5rem",
  },

  gridItem: {
    margin: "0.2rem auto",
  },
}));

function GodList(props) {
  //State to control which god appears in the modal
  const [modalGod, setModalGod] = useState(null);

  const [openGodDetailModal, setOpenGodDetailModal] = useState(false);
  const [openDeleteGodModal, setOpenDeleteGodModal] = useState(false);
  const [openEditGodModal, setOpenEditGodModal] = useState(false);

  const [godData, setGodData] = useState([]);
  const [message, setMessage] = useState("");

  const [checked, setChecked] = useState(false);
  const classes = useStyles();

  const [godIds, setGodIds] = useState([]);

  const getAllGods = () => {
    axios
      .get("http://localhost:4000/gods")
      .then((res) => setGodData(res.data))
      .then(
        godData.forEach((el) => {
          el.checked = "false;";
        })
      );
  };

  useEffect(() => {
    getAllGods();
  }, []);

  const handleOpen = (god) => {
    setOpenGodDetailModal(true);
    setModalGod(god);
  };

  const handleClose = () => {
    setOpenGodDetailModal(false);
  };

  const deleteGod = (god) => {
    setOpenDeleteGodModal(true);
    setModalGod(god);
  };

  const editGod = (god) => {
    console.log(godIds);
    setOpenEditGodModal(true);
    setModalGod(god);
  };

  const handleSelectItemChange = (event, god) => {
    god.__v = !god.__v;
    setChecked(!checked);

    var index = godIds.indexOf(god._id);
    if (index > -1) {
      godIds.splice(index, 1);
    } else {
      godIds.push(god._id);
    }

    console.log(godIds);
  };

  const deleteMultipleGods = () => {
    console.log(godIds);
    axios
      .delete("http://localhost:4000/gods/delete_gods/" + godIds)
      .then((res) => console.log("DELETED" + res.data))
      .then(getAllGods())
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div style={{ textAlign: "center", margin: "0.6rem " }}>
        <Link to="/add_god" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Add God
          </Button>
        </Link>
        <br />
        <br />
        {godIds.length > 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={deleteMultipleGods}
          >
            Delete Gods
          </Button>
        )}
        {message && message}
      </div>

      <Grid container xs={12}>
        {godData &&
          godData.map((god) => {
            return (
              <Grid className={classes.gridItem}>
                <Card key={god.id} className={classes.card}>
                  <Checkbox
                    // key={god.__v}
                    checked={Boolean(god.__v)}
                    onChange={(event) => handleSelectItemChange(event, god)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    value={god._id}
                    // style={{ float: "left" }}
                  />
                  <CardMedia
                    image={god.image}
                    className={classes.media}
                    title={god.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {god.name}
                    </Typography>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleOpen(god)}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                  <DeleteIcon
                    style={{ cursor: "pointer", color: "red", float: "left" }}
                    onClick={() => deleteGod(god)}
                  />{" "}
                  <CreateIcon
                    style={{
                      cursor: "pointer",
                      color: "green",
                      float: "right",
                    }}
                    onClick={() => editGod(god)}
                  />
                </Card>
              </Grid>
            );
          })}
        {openGodDetailModal && (
          <GodDetailModal
            open={openGodDetailModal}
            handleClose={handleClose}
            modalGod={modalGod}
          />
        )}
        {openDeleteGodModal && (
          <DeleteGodModal
            open={openDeleteGodModal}
            handleClose={() => setOpenDeleteGodModal(false)}
            modalGod={modalGod}
            setMessage={setMessage}
          />
        )}
        {openEditGodModal && (
          <EditGodModal
            open={openEditGodModal}
            handleClose={() => setOpenEditGodModal(false)}
            modalGod={modalGod}
            setMessage={setMessage}
          />
        )}
      </Grid>
    </>
  );
}

export default GodList;
