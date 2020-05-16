import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import "./NavBar.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import logo from "../assets/logo.png";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      backgroundColor: theme.palette.primary.dark,
    },
    list: {
      width: 250,
    },
    listItem: {
      color: theme.palette.primary.contrastText,
    },
  })
);

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toogleIsMenuOpen = () => setIsMenuOpen(!isMenuOpen);
  const classes = useStyles();

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

          <Drawer
            open={isMenuOpen}
            onClose={toogleIsMenuOpen}
            PaperProps={{ className: classes.drawer }}
          >
            <List className={classes.list}>
              <ListItem button key="list">
                <Link to="/list">
                  <ListItemText
                    primary="Estabelecimentos"
                    className={classes.listItem}
                  />
                </Link>
              </ListItem>

              <Divider />

              <ListItem button key="map">
                <Link to="/map">
                  <ListItemText primary="Mapa" className={classes.listItem} />
                </Link>
              </ListItem>

              <Divider />

              <ListItem button key="about">
                <Link to="/about">
                  <ListItemText primary="Sobre" className={classes.listItem} />
                </Link>
              </ListItem>
            </List>
          </Drawer>
        </Hidden>

        <Link to="/">
          <img src={logo} alt="é-comvida"></img>
        </Link>

        <Hidden smDown>
          <span className="subtitle">que retomamos a economia</span>

          <Grid container justify="flex-end" alignItems="center">
            <Link to="/map">
              <Button variant="contained" color="primary">
                Anuncie aqui
              </Button>
            </Link>

            <Link to="/list" style={{ paddingLeft: "1rem" }}>
              <Button variant="contained" color="primary">
                Empresas
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
