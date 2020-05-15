import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function About() {
  return (
    <Container>
      <Grid container spacing={4} alignItems="center" direction="column">
        <Grid item xs={12} style={{ paddingTop: "5rem" }}>
          <Typography component="h5" variant="h5" color="primary">
            Sobre e-comvida
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <div
            style={{
              color: "#050404",
              fontSize: "1.3rem",
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            <p>
              Durante a pandemia, existem algumas empresas/empresários que estão
              realizando manifestações de apoio às medidas de isolamento social
              através de comunicados em suas redes sociais, notícias e notas
              públicas.
            </p>

            <p>
              Com essa App queremos disponibilizar as formas de contato dessas
              empresas para que pessoas interessados em consumir seus produtos.
            </p>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Typography component="h5" variant="h5" color="primary">
            Mande seu feedback
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <Grid container alignItems="center" direction="column" spacing={1}>
              <Grid item xs={12}>
                <TextField
                  label="Nome"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Assunto"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Mensagem"
                  type="text"
                  variant="outlined"
                  multiline
                  fullWidth
                  rows={6}
                />
              </Grid>

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
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
