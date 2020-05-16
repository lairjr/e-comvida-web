import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gradient: {
      background: `linear-gradient(45deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.light})`,
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    },
    highlight: {
      color: theme.palette.primary.main,
      fontFamily: theme.typography.fontFamily,
      fontWeight: 700,
    },
    text: {
      color: theme.palette.secondary.main,
      fontFamily: theme.typography.fontFamily,
      fontSize: "1.3rem",
      maxWidth: "700px",
      textAlign: "center",
    },
  })
);

function Add() {
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={4} alignItems="center" direction="column">
        <Grid item xs={12} style={{ paddingTop: "3rem" }}>
          <Typography component="h4" variant="h4" className={classes.gradient}>
            Queremos saber quem você é
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.text}>
          <form noValidate autoComplete="off">
            <TextField
              label="Nome da empresa"
              type="text"
              variant="outlined"
              fullWidth
            />

            <TextField
              label="Endereco"
              type="text"
              variant="outlined"
              fullWidth
              style={{ marginTop: "1rem" }}
            />

            <TextField
              label="Descricao"
              type="text"
              variant="outlined"
              fullWidth
              style={{ marginTop: "1rem" }}
            />

            <Grid item xs={12} style={{ paddingTop: "1rem" }}>
              <Button variant="contained" color="secondary">
                Cancelar
              </Button>

              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "1rem" }}
              >
                Enviar
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Add;
