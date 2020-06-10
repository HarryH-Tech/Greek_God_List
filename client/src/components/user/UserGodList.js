import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import GodDetailModal from "./GodDetailModal";
import { isAuthenticated, getAllGods } from "../../Config";

import "../../App.css";

const useStyles = makeStyles((theme) => ({
  grid: {
    //marginBottom: "60px",
    paddingBottom: "2rem",
  },
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
  heading: {
    textAlign: "center",
    fontFamily: "arial",
    border: "0.2rem solid #44ff77",
    borderRadius: "0.6rem ",
    backgroundColor: "#bbffbb",
    width: "30%",
    margin: "0 auto 0.6rem auto",
    padding: "0.8rem",
  },
}));

function GodList(props) {
  const [redirect, setRedirect] = useState(false);

  // Control which god appears in the modal
  const [modalGod, setModalGod] = useState(null);

  //Control which modal opens
  const [openGodDetailModal, setOpenGodDetailModal] = useState(false);

  const [godData, setGodData] = useState([]);
  const [message, setMessage] = useState("");

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

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const user = isAuthenticated().data.user;

  return (
    <div className="list-container">
      <br />
      <h3 className={classes.heading}>Hi {capitalize(user.name)}</h3>

      <Grid container xs={12}>
        {godData &&
          godData.map((god) => {
            return (
              <Grid className={classes.gridItem}>
                <Card key={god.id} className={classes.card}>
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
        {openGodDetailModal && (
          <GodDetailModal
            open={openGodDetailModal}
            handleClose={handleClose}
            modalGod={modalGod}
          />
        )}
      </Grid>
    </div>
  );
}

export default GodList;
