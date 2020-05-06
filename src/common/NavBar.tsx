import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import "./NavBar.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toogleIsMenuOpen = () => setIsMenuOpen(!isMenuOpen);

  return (
    <AppBar position="static">
      <Toolbar>
        <Hidden mdUp>
          <IconButton onClick={toogleIsMenuOpen} edge="start" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Hidden>

        <Drawer open={isMenuOpen} onClose={toogleIsMenuOpen}>
          <List>
            <ListItem button key="list">
              <Link to="/list">
                <ListItemText primary="Estabelecimentos" />
              </Link>
            </ListItem>

            <ListItem button key="map">
              <Link to="/map">
                <ListItemText primary="Mapa" />
              </Link>
            </ListItem>
          </List>
        </Drawer>

        <Typography variant="h6" className="title">
          Fechados pela vida
        </Typography>

        <Hidden smDown>
          <Link to="/list">
            <Button>Empresas</Button>
          </Link>

          <Link to="/map">
            <Button>Mapa</Button>
          </Link>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
