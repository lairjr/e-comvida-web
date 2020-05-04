import React from "react";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">News</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
