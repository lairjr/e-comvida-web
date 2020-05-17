import React, { useState } from "react";
import emailjs from "emailjs-com";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";

const EmailForm: React.FC = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);

  const sendEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID as string,
        process.env.REACT_APP_EMAILJS_FEEDBACK_TEMPLATE_ID as string,
        event.target as HTMLFormElement,
        process.env.REACT_APP_EMAILJS_USER_ID
      );

      if (result.status === 200) {
        setOpenSuccess(true);
      } else {
        setOpenFailure(true);
      }
    } catch {
      setOpenFailure(true);
    }
  };

  return (
    <form noValidate autoComplete="off" onSubmit={sendEmail}>
      <TextField
        label="Nome"
        type="text"
        variant="outlined"
        name="name"
        fullWidth
      />

      <TextField
        label="E-mail"
        type="text"
        variant="outlined"
        name="email"
        fullWidth
        style={{ marginTop: "1rem" }}
      />

      <TextField
        label="Assunto"
        type="text"
        variant="outlined"
        name="subject"
        fullWidth
        style={{ marginTop: "1rem" }}
      />

      <TextField
        label="Mensagem"
        type="text"
        variant="outlined"
        name="message"
        multiline
        fullWidth
        rows={6}
        style={{ marginTop: "1rem" }}
      />

      <Grid item xs={12} style={{ paddingTop: "1rem" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "1rem" }}
          type="submit"
        >
          Enviar
        </Button>
      </Grid>

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
        color="primary"
        message="Obrigado pelo feedback"
      />

      <Snackbar
        open={openFailure}
        autoHideDuration={6000}
        onClose={() => setOpenFailure(false)}
        color="secondary"
        message="Ops! Algum problema ocorreu"
      />
    </form>
  );
};

export default EmailForm;
