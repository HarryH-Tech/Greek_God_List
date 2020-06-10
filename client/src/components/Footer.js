import React from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

function Footer(props) {
  const classes = useStyles();

  const FooterStyles = {
    width: "100%",
    backgroundColor: "#4477ff",
    height: "10vh",
    bottom: "0",
  };

  return (
    <>
      <div style={FooterStyles}></div>
    </>
  );
}

export default Footer;
