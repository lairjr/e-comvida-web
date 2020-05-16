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
              The source code is licensed{" "}
              <a
                href="https://github.com/lairjr/e-comvida-web/blob/master/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
              >
                MIT
              </a>
              . The website content is licensed CC BY NC SA 4.0.
            </Grid>

            <Grid item xs={2} style={{ textAlign: "end" }}>
              build: <em>0.0.{process.env.REACT_APP_BUILD_NUMBER}</em> |
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <a
                  href="https://github.com/lairjr/e-comvida-web"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                </a>
              </IconButton>
            </Grid>
          </Grid>
        </Hidden>

        <Hidden mdUp>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <strong>e-comvida</strong>
              <span> - </span>
              The source code is licensed{" "}
              <a
                href="https://github.com/lairjr/e-comvida-web/blob/master/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
              >
                MIT
              </a>
              . The website content is licensed CC BY NC SA 4.0.
            </Grid>

            <Grid item xs={12}>
              <em>0.0.{process.env.REACT_APP_BUILD_NUMBER}</em> |
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <a
                  href="https://github.com/lairjr/e-comvida-web"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                </a>
              </IconButton>
            </Grid>
          </Grid>
        </Hidden>
      </footer>
    </Container>
  );
}

export default Footer;
