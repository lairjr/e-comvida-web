import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GitHubIcon from "@material-ui/icons/GitHub";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxHeight: "113px",
      paddingTop: "3rem",
    },
    footer: {
      padding: ".5rem 0",
    },
    appName: {
      color: theme.palette.primary.main,
      fontFamily: theme.typography.fontFamily,
      fontWeight: 700,
      fontSize: "1rem",
    },
    text: {
      color: theme.palette.secondary.main,
      fontFamily: theme.typography.fontFamily,
      fontSize: "1rem",
    },
  })
);

function Footer() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
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
              <span className={classes.appName}>é-comvida</span>

              <span className={classes.text}> - </span>

              <span className={classes.text}>The source code is licensed </span>

              <a
                href="https://github.com/lairjr/e-comvida-web/blob/master/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.appName}
              >
                MIT
              </a>

              <span className={classes.text}>
                . The website content is licensed CC BY NC SA 4.0.
              </span>
            </Grid>

            <Grid item xs={2} style={{ textAlign: "end" }}>
              <span className={classes.text}>
                build: <em>0.0.{process.env.REACT_APP_BUILD_NUMBER}</em> |
              </span>

              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <a
                  href="https://github.com/lairjr/e-comvida-web"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon color="primary" />
                </a>
              </IconButton>
            </Grid>
          </Grid>
        </Hidden>

        <Hidden mdUp>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <span className={classes.appName}>é-comvida</span>

              <span className={classes.text}> - </span>

              <span className={classes.text}>The source code is licensed </span>

              <a
                href="https://github.com/lairjr/e-comvida-web/blob/master/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.appName}
              >
                MIT
              </a>

              <span className={classes.text}>
                . The website content is licensed CC BY NC SA 4.0.
              </span>
            </Grid>

            <Grid item xs={12}>
              <span className={classes.text}>
                <em>0.0.{process.env.REACT_APP_BUILD_NUMBER}</em> |
              </span>

              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <a
                  href="https://github.com/lairjr/e-comvida-web"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon color="primary" />
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
