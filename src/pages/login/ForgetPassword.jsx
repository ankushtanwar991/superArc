import { useState } from "react";
import { Link } from "react-router-dom";
import { userForgetPassword } from "../../firebase";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export const ForgetPassword = () => {
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    userForgetPassword(user)
      .then((res) =>{ 
     alert( "Please Reset your password, link has been sent to your email address.")
      console.log(res)
    })
      .catch((err) =>{
       alert("Account Doesn't Exist ");
        console.log(err.message);});
  };
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          p: 5,
          mt: 5,
          mb: 5,
          boxShadow: 6,
          borderRadius: 3,
        }}
      >
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" style={{ width: "100%" }} />
        </Link>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            placeholder="Enter Your Email"
            onChange={(e) => setUser(e.target.value)}
            defaultValue={user}
            fullWidth
            required
          />
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="themeDarkBlue"
            fullWidth
          >
            <Typography color="white">
              <b>Submit</b>
            </Typography>
          </Button>
        </form>
        <br />
        <Typography textAlign="center">OR</Typography>
        <Link to="/login">
          <Typography color="blue" textAlign="center">
            Login
          </Typography>
        </Link>
        <br />
      </Box>
    </Container>
  );
};
