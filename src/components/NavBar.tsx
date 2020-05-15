import React, { useState } from "react";
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
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import logo from "../logo.png";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toogleIsMenuOpen = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Container
      style={{ alignItems: "center", display: "flex", maxHeight: "7rem" }}
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
          <Typography variant="h6" className="title">
            | Economia da vida durante a pandemia
          </Typography>

          <Grid container justify="flex-end" alignItems="center">
            <Link to="/about">
              <Button>Sobre</Button>
            </Link>

            <Link to="/list">
              <Button>Empresas</Button>
            </Link>

            <Link to="/map">
              <Button>Mapa</Button>
            </Link>
          </Grid>
        </Hidden>
      </Grid>
    </Container>

    // <AppBar position="static">
    //   <Toolbar>

    //     <Container>
    //       <Grid container spacing={3}>
    //         <Grid item>
    //           <Typography variant="h6" className="title">
    //             Fechados pela vida
    //           </Typography>
    //         </Grid>

    //         <Hidden smDown>
    //           <Grid container justify="flex-end" alignItems="center">
    //             <Link to="/about">
    //               <Button>Sobre</Button>
    //             </Link>

    //             <Link to="/list">
    //               <Button>Empresas</Button>
    //             </Link>

    //             <Link to="/map">
    //               <Button>Mapa</Button>
    //             </Link>
    //           </Grid>
    //         </Hidden>
    //       </Grid>
    //     </Container>
    //   </Toolbar>
    // </AppBar>
  );
}

export default NavBar;
