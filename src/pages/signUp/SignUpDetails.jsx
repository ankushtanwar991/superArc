import { useEffect, useState } from "react";
import { ReadContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { createDocument, emailPasswordSignUp } from "../../firebase";
import {
  Box,
  Grid,
  Alert,
  Button,
  Checkbox,
  Snackbar,
  Container,
  TextField,
  Typography,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import style from "./style.module.css";
import { useContext } from "react";
import { SignUpContext } from "../../Router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export const SignUpDetails = () => {
  const { userData } = ReadContext();
  const navigate = useNavigate();

  const paymentMethods = ["Cash", "Card", "Check", "PayPal/Other"];
  const signUpData = useContext(SignUpContext)
  const [payment, setPayment] = useState([]);
  const [consPhone, setConsPhone] = useState("");
  const [contPhone, setContPhone] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [businessExp, setBusinessExp] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessDesc, setBusinessDesc] = useState("");
  const [userType, setUserType] = useState("Consumer");

  const addPaymentMethods = (inx, data1, event) => {
    if (event.target.checked) {
      setPayment(payment => [...payment, data1])
      console.log(payment);
    } else {
      console.log(payment);
      const a = payment.filter(r => r !== data1);
      console.log(a);

      setPayment(a)
    }
  };

  const handleConsumer = (e) => {
    e.preventDefault();
    // console.log(userData.uid)
    
    console.log(signUpData.name1)
    // console.log(signUpData.email1)
    // console.log(signUpData.pass1)
    emailPasswordSignUp(signUpData.name1, signUpData.email1, signUpData.pass1)
      .then((res) => {
        // console.log(res)
        // console.log(userData.uid)
        if (res === "Firebase: Error (auth/email-already-in-use).") {
          alert("E-Mail already in use");
          navigate('/sign-up')
        } else {

          onAuthStateChanged(auth, (user) => {
            if (user) {
              console.log(user)
              const data = {
                userType,
                phone: consPhone,
                userId: user.uid,
                email: user.email,
                userName: signUpData.name1,
                isActive: true
              };
              createDocument("users", user.uid, data)
                .then(() => navigate("/"))
                .catch((err) => console.log(err));
              // console.log(user, 'yessssssssssssssssssssssssssssss')
            }
            else {
              // console.log(user, 'kokokokokokokokookokokokookokookoooo')
            }
          })
        }
    })
      .catch((err) => console.log("Error", err));


  };

  const handleContractor = (e) => {
    e.preventDefault();

    
    emailPasswordSignUp(signUpData.name1, signUpData.email1, signUpData.pass1)
      .then((res) => {
        // console.log(res)
        // console.log(userData.uid)
        if (res === "Firebase: Error (auth/email-already-in-use).") {
          alert("E-Mail already in use");
          navigate('/sign-up')
        } else {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              const data = {
                userType,
                businessExp,
                businessName,
                businessDesc,
                phone: contPhone,
                payment: payment,
                userId: user.uid,
                email: user.email,
                userName: signUpData.name1,
                isActive: true
              };
              createDocument("users", user.uid, data)
                .then(() => navigate("/"))
                .catch((err) => console.log(err));
              // console.log(user, 'yessssssssssssssssssssssssssssss')
            }
            else {
              // console.log(user, 'kokokokokokokokookokokokookokookoooo')
            }
          })
        }
      })
      .catch((err) => console.log("Error", err));

    // createDocument("users", userData.uid, data)
    //   .then(() => navigate("/"))
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    setShowAlert(true);
  }, []);

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
        <Grid container spacing={2}>
          <Grid item md={6} xs={6}>
            <Button
              color={userType === "Consumer" ? "themeYellow" : "secondary"}
              onClick={() => setUserType("Consumer")}
              variant="contained"
              fullWidth
            >
              <Typography variant="body1" sx={{ padding: '5px' }}>
                <b>Customer</b>
              </Typography>
            </Button>
          </Grid>

          <Grid item md={6} xs={6}>
            <Button
              color={userType === "Contractor" ? "themeDarkBlue" : "secondary"}
              onClick={() => setUserType("Contractor")}
              variant="contained"
              fullWidth
            >
              <Typography color="white" variant="body1" sx={{ padding: '5px' }}>
                <b>Contractor</b>
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <br />
        <br />
        {userType === "Consumer" ? (
          <>
            <Typography textAlign="center" variant="h6">
              <b>Customer Details</b>
            </Typography>
            <br />
            <form onSubmit={handleConsumer}>
              <TextField
                label="Phone"
                placeholder="Enter Phone Number"
                type="number"
                value={consPhone}
                onChange={(e) => setConsPhone(e.target.value)}
                fullWidth
                required
              />
              <br />
              <br />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                <b>Submit</b>
              </Button>
            </form>
          </>
        ) : (
          <></>
        )}

        {userType === "Contractor" ? (
          <>
            <Typography textAlign="center" variant="h6">
              <b>Contractor Details</b>
            </Typography>
            <br />
            <form onSubmit={handleContractor}>
              <TextField
                label="Phone"
                placeholder="Enter Phone Number"
                type="number"
                value={contPhone}
                onChange={(e) => setContPhone(e.target.value)}
                fullWidth
                required
              />
              <br />
              <br />
              <Grid container spacing={1}>
                <Grid item md={6}>
                  <TextField
                    label="Business Name"
                    placeholder="Enter Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item md={6} className={style.width_sec}>
                  <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">
                      Business Experience
                    </InputLabel>
                    <Select

                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // type="number"
                      label="Business Experience"
                      // placeholder="Enter Your Experience"
                      value={businessExp}
                      onChange={(e) => setBusinessExp(e.target.value)}
                      fullWidth
                      required
                    >
                      <MenuItem value={1}>0-1</MenuItem>
                      <MenuItem value={2}>1-2</MenuItem>
                      <MenuItem value={3}>2-3</MenuItem>
                      <MenuItem value={4}>3-4</MenuItem>
                      <MenuItem value={5}>4-5</MenuItem>
                      <MenuItem value={6}>5-6</MenuItem>
                      <MenuItem value={7}>6-7</MenuItem>
                      <MenuItem value={8}>7-8</MenuItem>
                      <MenuItem value={9}>8-9</MenuItem>
                      <MenuItem value={10}>9-10</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <TextField
                label="Business Description"
                placeholder="Enter Business Description"
                value={businessDesc}
                onChange={(e) => setBusinessDesc(e.target.value)}
                rows={4}
                multiline
                fullWidth
                required
              />
              <br />
              <br />
              <Typography>
                <b>Accepted Payment Methods</b>
              </Typography>
              <br />
              <Grid container spacing={1}>
                {paymentMethods.map((e, index) => {
                  return (
                    <Grid item md={6} key={index}>
                      <FormControlLabel
                        label={e}
                        control={
                          <Checkbox
                            onChange={(s) => addPaymentMethods(index, e, s)}
                          />
                        }
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <br />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                <b>Submit</b>
              </Button>
            </form>
          </>
        ) : (
          <></>
        )}
      </Box>

      <Snackbar
        open={showAlert}
        autoHideDuration={2500}
        onClose={() => setShowAlert(!showAlert)}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => setShowAlert(!showAlert)}
        >
          Signed Up Successfully
        </Alert>
      </Snackbar>
    </Container>
  );
};
