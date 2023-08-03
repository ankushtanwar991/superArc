import React, { useEffect, useState } from "react";
import {
  Container,
  Snackbar,
  Alert,
  Grid,
  Avatar,
  Stack,
  Rating,
  TextField,
  Typography,
  Checkbox,
  Card,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { updateName } from "../../firebase/firebaseAuth/userSignUp";
import { updateDocument } from "../../firebase/cloudFirestore/updateData";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { getDocumentData } from "../../firebase/cloudFirestore/getData";
import { ReadContext } from "../../Context";
import { FileUpload } from "@mui/icons-material";
import { uploadImage } from "../../firebase";
import { createDocument } from "../../firebase";
import MobileFooter from "../../components/MobileFooter";
import moment from "moment";

export const ConsumerProfile = () => {
  const { userData } = ReadContext();
  const [info, setInfo] = useState({});
  let [loader, setLoader] = useState(false);
  const [active, setActive] = useState(false)
  // const [email, setEmail] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [sname, setName] = useState("");
  const [avg, setAvg] = useState(0);
  const [na, setN] = useState(0);
  const [link, setLink] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [experDate, setExperDate] = useState("");

  const avgRate = () => {
    const review = info.review;
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
  const cancelPlan = () => updateDocument("users", userData.uid, { show: false }).then(() => { window.location.reload(true) });

  const update = () => {
    try {
      const obj = {
        phone: info.phone !== undefined ? phoneNo || info.phone : phoneNo || "",
        userName: sname.length === 0 ? userData.displayName : sname,
        photo: link.length === 0 ? info.photo || "" : link,
        email: userData.email,
      };

      console.log(obj, "okokok");
      if (info.userName === undefined) {
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

  const navigate = useNavigate();
  useEffect(() => {
    getDocumentData("users", userData.uid)
      .then((res) => {
        if (res !== undefined) {
       
          setInfo(res);
          setActive(res.show);
          if(res.payDate !== undefined){
            let experDate = moment.unix(res.payDate.seconds).format("YYYY-MM-DD")
            let experDateCal = moment(experDate).add(1, "months").format("DD/MM/YYYY")
            setExperDate(experDateCal);
          }
        }
        setLoader(true);
      })
      .catch((err) => console.log(err));
  }, [userData]);

  useEffect(() => {
    avgRate();

  }, [info]);

  return (
    <>
      <Container sx={{ marginBottom: "55px" }}>
        <Grid container>
          {loader ? (
            <Grid item pb={5} md={6} xs={12}>
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <Grid item md={8} xs={7} sx={{ display: "flex" }}>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      alt={userData.displayName || ""}
                      src={info.photo || link || ""}
                    />
                  </Stack>
                  <Grid container px={2}>
                    <Typography>{userData.displayName || "no Name"}</Typography>
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
                      // ref={imgBtn}
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
              <div>
                <TextField
                  placeholder="Name"
                  label="Name"
                  defaultValue={userData.displayName || "no name"}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                />
              </div>
              <br />
              <div>
                <TextField
                  placeholder="Email"
                  label="Email"
                  defaultValue={userData.email || ""}
                  disabled
                  fullWidth
                  required
                />
              </div>
              <br />
              <div>
                <TextField
                  type="Number"
                  placeholder="phone"
                  label="Number"
                  defaultValue={info.phone || ""}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  fullWidth
                  required
                />
              </div>



              {/* <div className={style.text}>
                <span>Membership Plans :- </span>
              </div>
              <Grid container px={3} py={2} className={style.addedBox}>
                <Grid item md={12}>
                  <Typography className={style.text1}>Subsciption Plan - {active ? <span style={{ color: 'green' }}>Active</span> : <span style={{ color: 'red' }}>Inactive</span>}</Typography>
                  {active ? (<>
                    <Typography className={style.text1}>Plan - <span>$5/month</span></Typography>
                    <Typography className={style.text1} pb={1}> Next Billing Date - <span>{experDate}</span></Typography>
                    <button className={style.custom_btn3} onClick={() => cancelPlan()}>Cancel Plan</button>
                  </>) : (<></>)}
                </Grid>
              </Grid> */}
              <br />
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
                    onClick={() => {
                      update();
                    }}
                  >
                    Update
                  </button>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          <Grid item px={1} md={6} xs={12}>
            <Box sx={{ height: "100%", overflowY: 'scroll' }}>
              <Typography variant="h5">
                <b>Customer Reviews & Ratings</b>
              </Typography>
              <Typography sx={{ color: "orange" }}>
                <b>
                  {avg} star average, {na} Reviews.
                </b>
              </Typography>
              <br />

              {info.review &&
                info.review.map((e) => {
                  return (
                    <>
                      <Card sx={{ padding: "5px" }}>
                        <Grid container>
                          <Grid item md={2}>
                            <Avatar
                              sx={{ height: "55px", width: "55px" }}
                              src={e.photo || ""}
                              alt={e.name}
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
                      <MobileFooter blue="yellow" />
                      <br></br>
                    </>
                  );
                })}

              {/*           
            <Card sx={{ padding: "5px", width: "100%" }}>
              <Grid container spacing={6}>
                <Grid item md={2}>
                  <Avatar sx={{ height: "65px", width: "60px" }} />
                </Grid>
                <Grid item md={9}>
                  <Grid container>
                    <Rating></Rating>
                  </Grid>
                  <Grid container>
                    <Typography>
                      Great work! small team but they work fast.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
            <br />
            <Card sx={{ padding: "5px", width: "100%" }}>
              <Grid container spacing={6}>
                <Grid item md={2}>
                  <Avatar sx={{ height: "65px", width: "60px" }} />
                </Grid>
                <Grid item md={9}>
                  <Grid container>
                    <Rating></Rating>
                  </Grid>
                  <Grid container>
                    <Typography>
                      Decent client. Worked with them before.
                      <br />
                      They are very reliable.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
            <br />
            <Card sx={{ padding: "5px", width: "100%" }}>
              <Grid container spacing={6}>
                <Grid item md={2}>
                  <Avatar sx={{ height: "65px", width: "60px" }} />
                </Grid>
                <Grid item md={9}>
                  <Grid container>
                    <Rating></Rating>
                  </Grid>
                  <Grid container>
                    <Typography>
                      Great work! small team but they work fast.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
            <br />
            <Card sx={{ padding: "5px", width: "100%" }}>
              <Grid container spacing={6}>
                <Grid item md={2}>
                  <Avatar sx={{ height: "65px", width: "60px" }} />
                </Grid>
                <Grid item md={9}>
                  <Grid container>
                    <Rating></Rating>
                  </Grid>
                  <Grid container>
                    <Typography>
                      Decent client. Worked With Them Before.
                      <br />
                      They Are Very Reliable.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Card> */}
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
      <MobileFooter yellow="yellow" />
    </>
  );
};
