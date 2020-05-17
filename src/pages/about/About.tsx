import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import EmailForm from "../../components/EmailForm";

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

function About() {
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={4} alignItems="center" direction="column">
        <Grid item xs={12} style={{ paddingTop: "3rem" }}>
          <Typography component="h4" variant="h4" className={classes.gradient}>
            Sobre
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.text}>
          <p>
            Durante a pandemia, existem algumas empresas/empresários que estão
            realizando manifestações de apoio às medidas de isolamento social
            através de divercas acoes.
          </p>

          <p>
            Com essa App queremos disponibilizar as formas de contato dessas
            empresas para que pessoas interessados em consumir seus produtos.
          </p>

          <p>
            As formas de apoio são aceitas para
            <Link to="/add" className={classes.highlight}>
              {` cadastro `}
            </Link>
            da empresa seguido de uma fonte oficial para verificação são:
          </p>

          <Typography component="p" variant="h5" color="primary">
            Doações
          </Typography>

          <p>Texto de o que é considerado doacao.</p>

          <Typography component="p" variant="h5" color="primary">
            Fechamento voluntário
          </Typography>

          <p>Texto de o que é fechamento voluntario.</p>

          <Typography component="p" variant="h5" color="primary">
            Manifestação pública de apoio
          </Typography>

          <p>Text sobre o que é manifestacao publica</p>
        </Grid>

        <Grid item xs={12}>
          <Typography component="h4" variant="h4" className={classes.gradient}>
            Mande seu feedback
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.text}>
          <EmailForm />
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
