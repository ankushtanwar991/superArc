import { useEffect, useState } from "react";
import { ReadContext } from "../../Context";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { emailPasswordLogin, googleLogin } from "../../firebase";
import {
  Box,
  Alert,
  Button,
  Snackbar,
  Container,
  TextField,
  InputLabel,
  IconButton,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

export const Login = () => {
  const navigate = useNavigate();
  const { userData } = ReadContext();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailPasswordLogin(user, pass)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (userData.emailVerified === false) setShowAlert(true);
  }, [userData]);

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
            // value={user}
            onChange={(e) => setUser(e.target.value)}
            fullWidth
            required
          />
          <br />
          <br />
          <FormControl sx={{ mb: 4 }} fullWidth required>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              label="Password"
              placeholder="Enter Your Password"
              type={showPass ? "text" : "password"}
              // value={pass}
              onChange={(e) => setPass(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="themeDarkBlue"
            fullWidth
          >
            <Typography color="white">Login</Typography>
          </Button>
        </form>
        <br />
        <Link to="/sign-up">
          <Typography textAlign="center">
            Didn't Have an Account?
            <span style={{ color: "blue" }}>SignUp</span>
          </Typography>
        </Link>
        <br />
        <Link to="/forget-password">
          <Typography color="blue" textAlign="center">
            Forgot Password?
          </Typography>
        </Link>
        <br />
        <br />
        <Button
          onClick={() => {
            googleLogin()
              .then(() => navigate("/"))
              .catch((err) => console.log(err));
          }}
          variant="outlined"
          color="primary"
          sx={{ p: 1 }}
          fullWidth
        >
          <img
            src="/images/google.png"
            alt="Google"
            style={{ width: "2rem" }}
          />
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Typography variant="body2">Sign In With Google</Typography>
        </Button>
        {/* <br />
        <br />
        <Button
          onClick={facebookLogin}
          variant="outlined"
          color="primary"
          sx={{ p: 1 }}
          fullWidth
        >
          <img
            src="/images/facebook.png"
            alt="Facebook"
            style={{ width: "2rem" }}
          />
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Typography>Sign In With Facebook</Typography>
        </Button> */}
      </Box>

      <Snackbar
        open={showAlert}
        autoHideDuration={2500}
        onClose={() => setShowAlert(!showAlert)}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setShowAlert(!showAlert)}
        >
          <Typography>
            <b>Please Verify Your Email</b>
          </Typography>
        </Alert>
      </Snackbar>
    </Container>
  );
};
