import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailPasswordSignUp } from "../../firebase";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useContext } from "react";
import { SignUpContext } from "../../Router";


export const SignUp = () => {
  const navigate = useNavigate();
  const signUpData = useContext(SignUpContext)

  // const [name, setName] = useState("");
  // const [user, setUser] = useState("");
  // const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [enableBtn, setEnableBtn] = useState(true);
  const [showAlert, setShowAlert] = useState({ show: false, data: '' });
  const [confirmPass, setConfirmPass] = useState("");
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUpData.pass1 !== confirmPass) {
      setShowAlert({ show: true, data: 'Password Does Not Match' });
      return
    }
    else if (signUpData.pass1.length < 6) {
      setShowAlert({ show: true, data: 'Password must be 6 characters long !' })
    }
    else {
      navigate("./details");
      // emailPasswordSignUp(name, user, pass)
      //   .then((res) => {
      //     if (res === "Firebase: Error (auth/email-already-in-use).") {
      //       alert("E-Mail already in use");
      //     } else {
      //       navigate("./details");
      //     }
      //   })
      //   .catch((err) => console.log("Error", err));
    }
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
        <img src="/images/logo.png" alt="Logo" style={{ width: "100%" }} />
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            label="Name"
            placeholder="Enter Your Name"
            value={signUpData.name1}
            onChange={(e) => signUpData.setName1(e.target.value)}
            fullWidth
            required
          />
          <br />
          <br />
          <TextField
            type="email"
            label="Email"
            value={signUpData.email1}
            placeholder="Enter Your Email"
            onChange={(e) => signUpData.setEmail1(e.target.value)}
            fullWidth
            required
          />
          <br />
          <br />
          <FormControl sx={{ mb: 3 }} fullWidth>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              label="Password"
              placeholder="Enter Your Password"
              type={showPass ? "text" : "password"}
              value={signUpData.pass1}
              onChange={(e) => signUpData.setPass1(e.target.value.trim())}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              required
            />
          </FormControl>
          <FormControl sx={{ mb: 4 }} fullWidth>
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              label="Confirm Password"
              placeholder="Enter Your Password"
              type={showConfirmPass ? "text" : "password"}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value.trim())}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                  >
                    {showConfirmPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              required
            />
          </FormControl>
          <Box display="flex" alignItems="flex-start">
            <Checkbox onChange={() => setEnableBtn(!enableBtn)} />
            &nbsp; &nbsp; &nbsp;
            <Typography>
              I agree to the
              <Link to="/terms">
                &nbsp;
                <span style={{ color: "blue" }}>Terms and Condition</span>
                &nbsp;
              </Link>
              and
              <Link to="/privacy">
                &nbsp;
                <span style={{ color: "blue" }}>Privacy Statement</span>
                &nbsp;
              </Link>
              .
            </Typography>
          </Box>
          <br />
          <Button
            type="submit"
            variant="contained"
            color="themeDarkBlue"
            disabled={enableBtn}
            fullWidth
          >
            <Typography color="white">Sign Up</Typography>
          </Button>
        </form>
        <br />
        <Link to="/login">
          <Typography textAlign="center">
            Already Have an Account
            <span style={{ color: "blue" }}>? Login</span>
          </Typography>
        </Link>
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
          {showAlert.data}
        </Alert>
      </Snackbar>
    </Container>
  );
};
