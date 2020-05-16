import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "./Footer.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";

function Footer() {
  return (
    <Container className="footer-container">
      <Divider />

      <footer>
        <Hidden smDown>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={10}>
              <strong>e-comvida</strong>
              <span> - </span>
              The source code is licensed MIT. The website content is licensed
              CC BY NC SA 4.0.
            </Grid>

            <Grid item xs={2} style={{ textAlign: "end" }}>
              build: 0.0.1 |
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <GitHubIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Hidden>

        <Hidden mdUp>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <strong>e-comvida</strong>
              <span> - </span>
              The source code is licensed MIT. The website content is licensed
              CC BY NC SA 4.0.
            </Grid>

            <Grid item xs={12}>
              0.0.1 |
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <GitHubIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Hidden>
      </footer>
    </Container>
  );
}

export default Footer;
