import React, { useEffect, useState } from "react";
import { uploadImage } from "../../firebase";

import {
  Snackbar,
  Alert,
  Container,
  Grid,
  Avatar,
  Stack,
  Rating,
  Select,
  TextField,
  Typography,
  Checkbox,
  Button,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Card,
  Box,
  FormControl,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import style from "./style.module.css";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { ReadContext } from "../../Context";
import { getDocumentData } from "../../firebase/cloudFirestore/getData";
import { updateName } from "../../firebase/firebaseAuth/userSignUp";
import { updateDocument } from "../../firebase/cloudFirestore/updateData";
import { createDocument } from "../../firebase";
import { FileUpload } from "@mui/icons-material";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import MobileFooter from "../../components/MobileFooter";
import moment from "moment";

export const ConstructorProfile = () => {
  const contractorCredentials = [
    "Union Member",
    "Licensed",
    "Insured",
    "Bonded",
  ];

  const [credentialss, setCredential] = useState([]);

  const { userData } = ReadContext();
  const [info, setInfo] = useState({});
  const [active, setActive] = useState(false);
  let [loader, setLoader] = useState(false);
  const [bDecs, setBDcs] = useState([]);
  const [name, setName] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [bName, setBName] = useState("");
  const [address, setAddress] = useState("");
  const [bExp, setBExp] = useState("");
  const navigate = useNavigate();
  let [arr, setArr] = useState([]);
  const [link, setLink] = useState("");
  const [avg, setAvg] = useState(0);
  const [nn, setN] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [experDate, setExperDate] = useState("");

  const avgRate = (r) => {
    const review = r.contractorReview;
    if (review !== undefined) {
      const counts = review.length;
      let sum = 0;
      review.map((e) => {
        sum = sum + Number(e.rate);
      });
      setAvg(Math.round(sum / counts));
      setN(counts);
    }
  };
  const cancelPlan = () =>
    updateDocument("users", userData.uid, { show: false }).then(() => {
      window.location.reload(true);
    });

  const update = () => {
    try {
      const obj = {
        phone: info.phone !== undefined ? phoneNo || info.phone : phoneNo || "",
        businessName:
          info.businessName !== undefined
            ? bName || info.businessName
            : bName || "",
        businessAddress:
          address.length === 0 ? info.businessAddress || "" : address,
        businessExp:
          info.businessExp !== undefined
            ? bExp || info.businessExp
            : bExp || "",
        businessDesc: bDecs.length === 0 ? info.businessDesc || "" : bDecs,
        payment: arr.length === 0 ? info.payment || "" : arr,
        userName: name.length === 0 ? userData.displayName : name,
        photo: link.length === 0 ? info.photo || "" : link,
        email: userData.email,
        credential:
          credentialss.length === 0 ? info.credential || "" : credentialss,
      };
      const sname = name || userData.displayName;
      if (info.userName === undefined) {
        console.log(obj);
        updateName(sname, userData.displayName).catch((error) =>
          console.log(error)
        );
        createDocument("users", userData.uid, obj)
          .then(() => {
            setTimeout(() => window.location.reload(true), 2500);
            setShowSnackbar(!showSnackbar);
          })
          .catch((error) => console.log(error));
      } else {
        updateName(sname, userData.displayName).catch((error) =>
          console.log(error)
        );
        updateDocument("users", userData.uid, obj)
          .then((r) => {
            setTimeout(() => window.location.reload(true), 2500);
            setShowSnackbar(!showSnackbar);
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkCredentials = (val) => {
    if (info.credential !== undefined) {
      if (info.credential.indexOf(val) === -1) {
        return false;
      } else {
        return true;
      }
    }
  };

  console.log(credentialss);
  const addCredentials = (inx, event, datas) => {
    if (event.target.checked) {
      // if (!credential.includes(contractorCredentials[inx])) {
      //   setCredential((credential) => [
      //     ...credential,
      //     contractorCredentials[inx],
      //   ]);

      setCredential((credentialss) => [...credentialss, datas]);
    } else {
      let cred = credentialss.filter((r) => r !== datas);
      setCredential(cred);
    }
  };

  const paymentCheck = (data) => {
    if (info.payment !== undefined) {
      if (info.payment.indexOf(data) !== -1) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkData = (data, e) => {
    if (e.target.checked) {
      setArr([...arr, data]);
    } else {
      setArr(arr.filter((r) => r != data));
    }
    console.log(arr);
  };

  useEffect(() => {
    getDocumentData("users", userData.uid)
      .then((res) => {
        console.log(res);
        setLoader(true);
        if (res !== undefined) {
          if (res.payDate !== undefined) {
            let experDate = moment
              .unix(res.payDate.seconds)
              .format("YYYY-MM-DD");
            let experDateCal = moment(experDate)
              .add(1, "months")
              .format("DD/MM/YYYY");
            console.log(experDateCal);
            setExperDate(experDateCal);
          }
          setActive(res.show);
          setInfo(res);
          if (res.credential !== undefined) {
            setCredential(res.credential);
          }

          avgRate(res);
          if (res.payment.length !== 0) {
            setArr(res.payment);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [userData]);

  return (
    <>
      <Container sx={{ marginBottom: "55px" }}>
        <Grid container px={2}>
          {loader ? (
            <Grid item pb={5} md={6} xs={12}>
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <Grid item md={8} xs={7} sx={{ display: "flex" }}>
                  <Stack direction="row">
                    <Avatar
                      sx={{ height: "55px", width: "55px" }}
                      alt={userData.displayName || ""}
                      src={info.photo || link || ""}
                    />
                  </Stack>
                  <Grid container px={1}>
                    <Typography>{userData.displayName || ""}</Typography>
                    <Grid container>
                      <Rating name="no-value" value={avg} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={4} xs={5}>
                  <Button>
                    <label htmlFor="idid">
                      <FileUpload />
                      <Typography sx={{ fontSize: "13px" }}>
                        Upload Profile
                      </Typography>
                    </label>
                    <input
                      id="idid"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        uploadImage(e.target.files[0])
                          .then((res) => setLink(res))
                          .catch((err) => console.log(err));
                      }}
                    />
                  </Button>
                </Grid>
              </Grid>
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <TextField
                    placeholder="Name"
                    defaultValue={userData.displayName || ""}
                    onChange={(e) => setName(e.target.value)}
                    label="Name"
                    fullWidth
                    required
                  ></TextField>
                </div>
                <div>
                  <TextField
                    type="Number"
                    placeholder="Phone number"
                    defaultValue={info.phone || ""}
                    onChange={(e) => setPhone(e.target.value)}
                    label="Phone"
                    fullWidth
                    required
                  ></TextField>
                </div>
              </div>
              <br />
              <div>
                <TextField
                  fullWidth
                  required
                  placeholder="Email"
                  defaultValue={userData.email || ""}
                  disabled
                  label="Email"
                />
              </div>
              <br />
              <div>
                <TextField
                  fullWidth
                  required
                  placeholder="Bussiness Name"
                  defaultValue={info.businessName || ""}
                  onChange={(e) => setBName(e.target.value)}
                  label="Business Name"
                />
              </div>
              <br />
              <div>
                <TextField
                  fullWidth
                  required
                  placeholder="Bussiness Address"
                  defaultValue={info.businessAddress || ""}
                  onChange={(e) => setAddress(e.target.value)}
                  label="Bussiness Address"
                />
              </div>
              <br />
              <div>
                <Grid container className="w-100">
                  <InputLabel id="demo-simple-select-label">
                    Credentials
                  </InputLabel>
                </Grid>
                <br></br>
                <Grid container spacing={1} className={style.experience_width}>
                  {contractorCredentials.map((e, index) => {
                    return (
                      <Grid item md={6} key={index}>
                        <FormControlLabel
                          label={e}
                          control={
                            <Checkbox
                              defaultChecked={checkCredentials(e)}
                              onChange={(r) => addCredentials(index, r, e)}
                            />
                          }
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
              <br />
              <Grid>
                <FormControl fullwidth sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Business Experience
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Bussiness Experience"
                    placeholder="Bussiness Experience"
                    defaultValue={info.businessExp || ""}
                    onChange={(e) => setBExp(e.target.value)}
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
              <br />
              <div>
                <TextField
                  placeholder="Bussiness Description"
                  label="Bussiness Description"
                  defaultValue={info.businessDesc || ""}
                  onChange={(e) => setBDcs(e.target.value)}
                  // value={info.businessDesc}
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
              </div>
              <br />
              <Typography>
                <b>Accepted Method Of Payment</b>
              </Typography>
              <br />
              <Grid container rowSpacing={4}>
                <Grid item md={6} display="flex">
                  <Checkbox
                    defaultChecked={paymentCheck("Card")}
                    onChange={(s) => checkData("Card", s)}
                  />
                  <Box mt={1} display="flex">
                    <CreditCardIcon sx={{ color: "#4285F4" }} />
                    &nbsp; &nbsp;
                    <Typography>Credit/Debit Card</Typography>
                  </Box>
                </Grid>
                <Grid item md={6} display="flex">
                  <Checkbox
                    defaultChecked={paymentCheck("PayPal/Other")}
                    onChange={(s) => checkData("PayPal/Other", s)}
                  />
                  <Box mt={1} display="flex">
                    <CurrencyRubleIcon sx={{ color: "#4285F4" }} />
                    &nbsp; &nbsp;
                    <Typography>PayPal/Other</Typography>
                  </Box>
                </Grid>
                <Grid item md={6} display="flex">
                  <Checkbox
                    defaultChecked={paymentCheck("Cash")}
                    onChange={(s) => checkData("Cash", s)}
                  />
                  <Box mt={1} display="flex">
                    <PaymentsIcon sx={{ color: "#4285F4" }} />
                    &nbsp; &nbsp;
                    <Typography>Cash</Typography>
                  </Box>
                </Grid>
                <Grid item md={6} display="flex">
                  <Checkbox
                    defaultChecked={paymentCheck("Check")}
                    onChange={(s) => checkData("Check", s)}
                  />
                  <Box mt={1} display="flex">
                    <LocalAtmIcon sx={{ color: "#4285F4" }} />
                    &nbsp; &nbsp;
                    <Typography>Check</Typography>
                  </Box>
                </Grid>
              </Grid>
{/* 
              <Grid container px={3} py={2} my={2} className={style.addedBox}>
                <Grid item md={12}>
                  <Typography className={style.text1}>
                    Subsciption Plan -{" "}
                    {active ? (
                      <span style={{ color: "green" }}>Active</span>
                    ) : (
                      <span style={{ color: "red" }}>Inactive</span>
                    )}
                  </Typography>

                  {active ? (
                    <>
                      <Typography className={style.text1}>
                        Plan - <span>$5/month</span>
                      </Typography>
                      <Typography className={style.text1} pb={1}>
                        {" "}
                        Next Billing Date - <span>{experDate}</span>
                      </Typography>
                      <button
                        className={style.custom_btn3}
                        onClick={() => cancelPlan()}
                      >
                        Cancel Plan
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid> */}
              <Grid container>
                <Grid item md={6} sm={6} xs={12} px={1} py={1}>
                  <button
                    className={style.custom_btn1}
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                </Grid>
                <Grid item md={6} sm={6} xs={12} px={1} py={1}>
                  <button
                    className={style.custom_btn2}
                    onClick={() => update()}
                  >
                    Update
                  </button>
                </Grid>
              </Grid>
            </Grid>
          ) : null}

          <Grid item md={6} px={1} xs={12}>
            <Box sx={{ height: "100%", overflowY: "scroll" }}>
              <Typography variant="h5">
                <b>Contractor Reviews & Ratings</b>
              </Typography>
              <Typography sx={{ color: "orange" }}>
                <b>
                  {avg} star average, {nn} Reviews.
                </b>
              </Typography>
              <br />
              {info.contractorReview &&
                info.contractorReview.map((e) => {
                  return (
                    <>
                      <Card sx={{ padding: "5px" }}>
                        <Grid container>
                          <Grid item md={2}>
                            <Avatar
                              sx={{ height: "55px", width: "55px" }}
                              src={e.photo || ""}
                              alt={e.name || "no name"}
                            />
                          </Grid>
                          <Grid item md={9}>
                            <Grid container>
                              <Typography>{e.name || "no name"}</Typography>
                            </Grid>
                            <Grid container>
                              <Rating value={e.rate}></Rating>
                            </Grid>
                            <Grid container>
                              <Typography>{e.review}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                      <br />
                    </>
                  );
                })}
            </Box>
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
            Your profile has been updated successfully
          </Alert>
        </Snackbar>
      </Container>
      <MobileFooter blue="blue" />
    </>
  );
};
