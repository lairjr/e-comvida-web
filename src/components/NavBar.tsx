import React, { useState } from "react";
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
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import logo from "../assets/logo.png";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toogleIsMenuOpen = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Container
      style={{
        alignItems: "center",
        display: "flex",
        maxHeight: "4rem",
        marginTop: "2rem",
      }}
    >
      <Grid container alignItems="center">
        <Hidden mdUp>
          <IconButton onClick={toogleIsMenuOpen} edge="start" aria-label="menu">
            <MenuIcon />
          </IconButton>

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

              <ListItem button key="about">
                <Link to="/about">
                  <ListItemText primary="About" />
                </Link>
              </ListItem>
            </List>
          </Drawer>
        </Hidden>

        <img src={logo} alt="É com vida"></img>

        <Hidden smDown>
          <span className="subtitle">economia da vida durante a pandemia</span>

          <Grid container justify="flex-end" alignItems="center">
            <Link to="/list">
              <Button variant="contained" color="primary">
                Empresas
              </Button>
            </Link>

            <Link to="/map" style={{ paddingLeft: "1rem" }}>
              <Button variant="contained" color="primary">
                Anuncie aqui
              </Button>
            </Link>

            <Link to="/about" style={{ paddingLeft: "1rem" }}>
              <Button variant="contained" color="primary">
                Sobre
              </Button>
            </Link>
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
}

export default NavBar;
