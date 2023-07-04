import { Container, TextField, Typography, Grid, Button, Snackbar, Alert } from "@mui/material";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
// const sgmail=require("@sendgrid/mail") 

export const Contact = () => {
  const formData = useRef();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_3gf4wy9', 'template_i0n2qjh', formData.current, 'LB_uN7Klv2nx2rHgW')
      .then((result) => {
        console.log(result.text);
        setShowSnackbar(!showSnackbar);
        e.target.reset()

      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        <b>Contact Us</b>
      </Typography>
      <Grid>
        <Grid container spacing={8}>
          <Grid item md={6}>
            <Grid
              container
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Grid item md={8} sx={{ display: "flex" }}>
                <Grid container>
                  <Grid container></Grid>
                </Grid>
              </Grid>
              <Grid item md={4}></Grid>
            </Grid>
            <br />

            <br />
            <form ref={formData} onSubmit={sendEmail}>
              <div>
                <TextField
                  placeholder="Full Name"
                  label="Full Name"
                  type="text"
                  name="user_name"
                  fullWidth
                  required
                />
              </div>
              <br />
              <div>
                <TextField type="email" name="user_email" placeholder="Email" label="Email" fullWidth required />
              </div>
              <br />
              <div>
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
              </div>
              <br />
              <Button type="submit" variant="contained" color="success">
                Contact Us
              </Button>
            </form>
          </Grid>
          <Grid item md={6}>
            <br />
            <br />
            <Typography variant="h5">
              <b>Contact</b>
            </Typography>
            <Typography>support@ServiceArc.app</Typography>
            <br />

            <Typography>
              <b>Based In</b>
            </Typography>
            <Typography>
              2809 Kirby Rd. Ste 116 #224 Memphis, TN 38119
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2500}
        onClose={() => setShowSnackbar(!showSnackbar)}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => setShowSnackbar(!showSnackbar)}
        >
          Your Query has been send
        </Alert>
      </Snackbar>
    </Container>
  );
};
