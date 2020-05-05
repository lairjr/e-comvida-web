import React, { useState } from "react";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toogleIsMenuOpen = () => setIsMenuOpen(!isMenuOpen);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={toogleIsMenuOpen} edge="start" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Drawer open={isMenuOpen} onClose={toogleIsMenuOpen}>
          <List>
            <ListItem button key="map">
              <Link to="/Map">
                <ListItemText primary="Mapa" />
              </Link>
            </ListItem>

            <ListItem button key="list">
              <Link to="/List">
                <ListItemText primary="Estabelecimentos" />
              </Link>
            </ListItem>
          </List>
        </Drawer>

        <Typography variant="h6">Fechados pela vida</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
