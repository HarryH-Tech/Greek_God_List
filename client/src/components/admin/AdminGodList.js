import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import GodDetailModal from "../user/GodDetailModal";
import DeleteGodModal from "./modals/DeleteGodModal";
import EditGodModal from "./modals/EditGodModal";

import { deleteMultipleGods, getAllGods } from "../../Config";

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
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 250,
  },
  card: {
    textAlign: "center",
    padding: "0.5rem",
  },

  gridItem: {
    margin: "0.6rem auto",
    width: "30%",
  },
  listContainer: {
    textAlign: "center",
    backgroundImage:
      "url('https://indianfolk.com/wp-content/uploads/2020/03/rubens-phaeton-1.1920x0.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

function GodList(props) {
  // Control which god appears in the modal
  const [modalGod, setModalGod] = useState(null);

  //Control which modal opens
  const [openGodDetailModal, setOpenGodDetailModal] = useState(false);
  const [openDeleteGodModal, setOpenDeleteGodModal] = useState(false);
  const [openEditGodModal, setOpenEditGodModal] = useState(false);

  const [godData, setGodData] = useState([]);
  const [message, setMessage] = useState("");

  const [checked, setChecked] = useState(false);
  const [godIds, setGodIds] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    getAllGods().then((res) => {
      console.log(res);
      setGodData(res);
    });
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

  const handleDeleteMultipleGods = (ids) => {
    deleteMultipleGods(ids);
    getAllGods().then((res) => {
      console.log(res);
      setGodData(res);
    });

    setMessage("Gods Deleted");
    setGodIds([]);
  };

  console.log(message);
  return (
    <div className={classes.listContainer}>
      <div>
        <Link to="/add_god" style={{ textDecoration: "none" }}>
          <Button
            style={{ marginTop: "0.5rem" }}
            variant="contained"
            color="primary"
          >
            Add God
          </Button>
        </Link>
        <br />
        <br />
        {godIds.length > 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteMultipleGods(godIds)}
          >
            Delete Gods
          </Button>
        )}
        <br />
        <br />
        {message && (
          <Alert severity="success" className={classes.alert}>
            <div>{message}</div>
          </Alert>
        )}
      </div>

      <Grid container xs={12}>
        {godData &&
          godData.map((god) => {
            return (
              <Grid className={classes.gridItem}>
                <Card key={god.id} className={classes.card}>
                  <Checkbox
                    checked={Boolean(god.__v)}
                    onChange={(event) => handleSelectItemChange(event, god)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    value={god._id}
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
            setGodData={setGodData}
            godData={godData}
          />
        )}
        {openEditGodModal && (
          <EditGodModal
            open={openEditGodModal}
            handleClose={() => setOpenEditGodModal(false)}
            modalGod={modalGod}
            setMessage={setMessage}
            setGodData={setGodData}
            godData={godData}
          />
        )}
      </Grid>
    </div>
  );
}

export default GodList;
