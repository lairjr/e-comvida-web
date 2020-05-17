import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { Form, Field } from "react-final-form";
import Button from "@material-ui/core/Button";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import CitySelect from "../../components/CitySelect";
import SectorSelect from "../../components/SectorSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import SupportSelect from "../../components/SupportSelect";

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

interface AddFormValues {
  name: string;
}

function Add() {
  const classes = useStyles();

  const onCityChange = (event: any, value: any) => {
    console.log(value);
  };

  const onSectorChange = (event: any, value: any) => {
    console.log(value);
  };

  const onSupportChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    console.log(event);
  };

  const onSubmit = (value: AddFormValues) => {
    console.log("submit", value);
  };

  return (
    <Container>
      <Grid container spacing={4} alignItems="center" direction="column">
        <Grid item xs={12} style={{ paddingTop: "3rem" }}>
          <Typography component="h4" variant="h4" className={classes.gradient}>
            Queremos saber quem você é
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.text}>
          <Form
            onSubmit={onSubmit}
            initialValues={{ name: "" }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form noValidate autoComplete="off">
                <Field name="name">
                  {(props) => (
                    <TextField
                      label="Nome da empresa"
                      type="text"
                      variant="outlined"
                      fullWidth
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>

                <Field name="city">
                  {(props) => (
                    <CitySelect
                      onChange={onCityChange}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          fullWidth
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                          label="Cidade"
                          variant="outlined"
                          style={{ marginTop: "1rem" }}
                        />
                      )}
                    />
                  )}
                </Field>

                <SectorSelect
                  onChange={onSectorChange}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Atividade da empresa"
                      variant="outlined"
                      style={{ marginTop: "1rem" }}
                    />
                  )}
                />

                <Field name="address">
                  {(props) => (
                    <TextField
                      label="Endereco"
                      type="text"
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: "1rem" }}
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>

                <Field name="description">
                  {(props) => (
                    <TextField
                      label="Descricao"
                      type="text"
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: "1rem" }}
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>

                <Field name="phone">
                  {(props) => (
                    <TextField
                      label="Telefone"
                      type="text"
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: "1rem" }}
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>

                <Field name="whatsapp">
                  {(props) => (
                    <TextField
                      label="Whatsapp"
                      type="text"
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: "1rem" }}
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>

                <Field name="facebook">
                  {(props) => (
                    <TextField
                      label="Facebook URL"
                      type="text"
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: "1rem" }}
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>

                <Field name="instagram">
                  {(props) => (
                    <TextField
                      label="Instagram URL"
                      type="text"
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: "1rem" }}
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>

                <Field name="site">
                  {(props) => (
                    <TextField
                      label="Site URL"
                      type="text"
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: "1rem" }}
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>

                {JSON.stringify(values)}

                <Typography
                  variant="subtitle1"
                  color="primary"
                  style={{ marginTop: "1rem", textAlign: "left" }}
                >
                  Contribuicões
                </Typography>

                <Grid container style={{ paddingTop: "1rem" }} spacing={1}>
                  <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="sector">Tipo de apoio</InputLabel>

                      <SupportSelect onChange={onSupportChange} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={8}>
                    <TextField
                      label="Fonte"
                      type="text"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} style={{ paddingTop: "1rem" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Cancelar
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting || pristine}
                    style={{ marginLeft: "1rem" }}
                  >
                    Enviar
                  </Button>
                </Grid>
              </form>
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Add;
