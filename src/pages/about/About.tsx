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
            A gente acha sensacional quem na crise conseguiu pensar nas pessoas
            e de forma criativa e sensível conseguiu passar por tudo isso.
            Empresas e empresários que apoiam as medidas de isolamento e de
            maneira empática enfrentam as dificuldades econômicas merecem o
            nosso respeito e não podem ser esquecidos.
          </p>

          <p>
            Queremos com esse aplicativo refrescar a memória de todos e
            agruparmos aqui essas "grandes" empresas. Enormes na maneira de
            agir! =)
          </p>

          <p>
            <Link to="/add" className={classes.highlight}>
              {`Mande `}
            </Link>
            pra nós as dicas com o nome da empresa e alguma forma de validarmos
            a maneira de conduzir as ações: seja por quem realizou doações,
            realizaram fechamento voluntário, pensou de forma carinhosa em seus
            colaboradores, manifestou apoio ao isolamento ou alguma outra ações
            que fez você pensar: nossa, vocês mandaram ver!
          </p>

          <p>Não deixe de nos contar! Elas merecem nosso respeito!</p>
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
