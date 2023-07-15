import React, { useEffect, useState } from "react";
import { ReadContext } from "../../Context";
import { ExpandMore, LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import {
  Grid,
  Typography,
  Card,
  Button,
  Box,
  CardContent,
  TextField,
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
} from "@mui/material";
import { ContractorSubHead } from "../../components/ContractorSubHead";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  getDocumentData,
  getMatchingData,
} from "../../firebase/cloudFirestore/getData";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import MobileFooter from "../../components/MobileFooter";
import {
  updateDocument,
  deleteDocument,
  updateArray,
  compoundQuery,
} from "../../firebase";
export function CompletedService() {
  const navigate = useNavigate();

  let [show, setshow] = useState(false);
  let [rateReview, setrateReview] = useState(false);

  const [reviews, setReview] = useState("");
  let [button1, setButton1] = useState(false);
  let [button2, setButton2] = useState(false);
  let [starRate, setStars] = useState("");
  let [color1, setColor1] = useState(false);
  let [color2, setColor2] = useState(false);
  const [data, setData] = useState([]);
  const [info, setInfo] = useState({});
  const { posLat } = ReadContext();
  const { posLong } = ReadContext();
  const [pendData, setPendData] = useState([]);
  const [user, setUser] = useState({});
  const { userData } = ReadContext();
  const [contractor, setContractor] = useState({});
  const [rate, setRate] = useState(0);
  const getUser = async (id) => {
    await getDocumentData("users", id)
      .then((res) => {
        setUser(res);
        let avg = 0;
        if (res.review !== undefined) {
          const counts = res.review.length;
          let sum = 0;
          res.review.map((e) => {
            sum = sum + Number(e.rate);
          });
          avg = Math.round(sum / counts);
        }
        setRate(avg);
      })
      .catch((err) => console.log(err));
  };

  const giveReview = async (values) => {
    if (reviews !== "" || reviews !== undefined || reviews.trim() !== "") {
      const data = {
        name: userData.displayName,
        category: values.category,
        review: reviews,
        rate: starRate,
        photo: contractor.photo || "",
      };

      if (values.status === "complete") {
        updateArray("users", values.userId, "review", data).catch((err) =>
          console.log(err)
        );

        updateDocument("offers", values.offerId, {
          status: "contractor reviewed",
        })
          .then((res) => {
            window.location.reload(true);
          })
          .catch((err) => console.log(err));
      } else {
        updateArray("users", values.userId, "review", data)
          .then((res) => {
            deleteData(values.jobId);
          })
          .catch((err) => console.log(err));
      }
      // window.location.reload(true)
    }
  };

  const deleteData = (id) => {
    deleteDocument("jobs", id)
      .then(() => {
        getMatchingData("offers", "jobId", "==", id).then((res) => {
          res.map((e) => {
            deleteDocument("offers", e.id);
          });
        });

        navigate("/contractor/open-service");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async (data) => {
    if (data.email !== undefined) {
      const query = [
        { key: "email", operator: "==", value: data.email },
        { key: "status", operator: "!=", value: "pending" },
      ];
      await compoundQuery("offers", query).then((res) => {
        
        res.map(async (e) => {
          if (e.status === "complete" || e.status === "customer reviewed") {
            const jobs = await getDocumentData("jobs", e.jobId).then((res1) => {
              return res1;
            });
            const msg = { ...e, ...jobs };
         
            setPendData((pendData) => [...pendData, msg]);
          }
        });
      });
    }
  };
  const storeData = () => {
    if (pendData.length!==0)
    {

     
      pendData.map((e) => {
        if(e.submitDate !==undefined){

          
          const obj = {
            category: e.category,
            submitDate: moment.unix(e.submitDate.seconds).format("Do MMM YYYY"),
            offer: e.offer,
            status: e.status,
            address: e.address,
            userId: e.userId,
            city: e.city,
            jobId: e.jobId,
            offerId: e.id,
          };
    
          setData((data) => [...data, obj]);
        }
      });
    }
  };
  useEffect(() => {
    if(userData){

      getData(userData);
      getUser();
      getDocumentData("users", userData.uid)
        .then((res) => setContractor(res))
        .catch((e) => console.log(e));
    }
  }, [userData]);
  useEffect(() => {
    storeData();
  }, [pendData]);

  // const getData = (id) => {
  //   getCollectionData("jobs").then((res) => {
  //     const d = res.filter((el) => {
  //       return el.status === "complete";
  //     });
  //     console.log("rsponse is ", d)
  //     let f=d.map(e=>{
  //       return {...e,['key']:false}
  //       })
  //       setData(f);
  //   });
  // };
  const boxOpen = (e, i) => {
    let arr = [...data];
    arr[i].key = !arr[i].key;
    setData(arr);
  };
  const boxClose = (e, i) => {
    let arr = [...data];
    arr[i].key = false;
    setData(arr);
  };
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Container sx={{ width: "100%" }}>
        <ContractorSubHead page="complete-service" />
      </Container>
      <Container>
        <Grid px={2}>
          <Grid conatiner>
            <Grid container>
              <Grid item md={4} sm={4} xs={12}>
                <Grid>
                  <Typography
                    sx={{ color: "blue", marginLeft: "14px" }}
                    variant="h6"
                    fontSize={16}
                  >
                    FINISHED SERVICES
                    <span style={{ color: "black", fontSize: "12px" }}>
                      ( {data.length} Jobs )
                    </span>
                  </Typography>
                  {data &&
                    data.map((e, index) => {
                      return (
                        <Box key={index}>
                          <Accordion elevation={0} fullWidth>
                            <AccordionSummary
                              expandIcon={<ExpandMore sx={{ color: "blue" }} />}
                              onClick={() => {
                                boxClose(e, index);
                                getUser(e.userId);
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="h6"
                                  sx={{ color: "blue", fontSize: "15px" }}
                                >
                                  {e.category}
                                </Typography>
                                <Typography sx={{ color: "grey" }}>
                                  date submitted - {e.submitDate}
                                </Typography>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Box>
                                <Grid container py={1}>
                                  <Grid item md={3}>
                                    <Avatar
                                      sx={{ width: 45, height: 40 }}
                                      src={user.photo || ""}
                                      alt={user.userName || "user"}
                                    />
                                  </Grid>
                                  <Grid item md={7}>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {user.userName || "user"}
                                    </Typography>
                                    <Rating
                                      name="size-small"
                                      value={rate}
                                      size="small"
                                    />
                                  </Grid>
                                </Grid>
                                <Typography>
                                  <b>Email</b>
                                </Typography>
                                <Typography sx={{ color: "gray" }}>
                                  {user.email || "Email"}
                                </Typography>
                                <br />
                                <Typography>
                                  <b>Phone No.</b>
                                </Typography>
                                <Typography sx={{ color: "gray" }}>
                                  {user.phone || "9999999"}
                                </Typography>
                                <br />
                                <Typography>
                                  <b>Job Address</b>
                                </Typography>
                                <Typography sx={{ color: "gray" }}>
                                  {e.address}
                                </Typography>
                                <br />
                                <hr />
                                <Grid container py={2}>
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      padding: "5px 2px",
                                    }}
                                  >
                                    OFFER
                                  </span>
                                  &nbsp;&nbsp;
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      background: "lightgray",
                                      padding: "5px 10px",
                                      color: "gray",
                                    }}
                                  >
                                    {e.offer}
                                  </span>
                                  &nbsp;&nbsp;
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      background: "skyblue",
                                      padding: "5px 10px",
                                      color: "blue",
                                    }}
                                  >
                                    {e.status}
                                  </span>
                                </Grid>
                                <Grid
                                  container
                                  py={3}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Button
                                    onClick={() => boxOpen(e, index)}
                                    sx={{
                                      background: "skyblue",
                                      color: "blue",
                                      padding: "8px 15px",
                                      border: "1px solid blue",
                                    }}
                                  >
                                    Finish & Review
                                  </Button>
                                </Grid>
                                {e.key ? (
                                  <div id={index}>
                                    <Typography
                                      sx={{
                                        fontWeight: "700",
                                        color: "skyblue",
                                      }}
                                    >
                                      &nbsp;
                                    </Typography>
                                    <Card
                                      variant="outlined"
                                      sx={{
                                        width: "100%",
                                        // border: "2px solid blue",
                                        padding: "10px 10px",
                                        marginBottom: "6px",
                                        height: "400px",
                                      }}
                                    >
                                      <Grid
                                        sx={{
                                          display: "flex",
                                          justifyContent: "end",
                                        }}
                                      >
                                        <CloseIcon
                                          sx={{ cursor: "pointer" }}
                                          onClick={() => boxOpen(e, index)}
                                        />
                                      </Grid>
                                      <Typography sx={{ color: "blue" }}>
                                        RATE & REVIEW
                                      </Typography>
                                      <Typography
                                        sx={{ color: "gray", fontSize: "15px" }}
                                        my={2}
                                      >
                                        <b> Please Give your best Review</b>
                                      </Typography>
                                      <Grid container px={2}>
                                        <Grid item>
                                          <Typography
                                            sx={{ fontWeight: "700" }}
                                          >
                                            STARS
                                          </Typography>
                                          <Rating
                                            name="size-small"
                                            onChange={(e) =>
                                              setStars(e.target.value)
                                            }
                                          />
                                        </Grid>
                                      </Grid>
                                      <Grid container px={2}>
                                        <Grid item>
                                          <Typography
                                            sx={{ fontWeight: "700" }}
                                            my={3}
                                          >
                                            REVIEW
                                          </Typography>
                                          <TextField
                                            id="outlined-multiline-flexible"
                                            onChange={(e) =>
                                              setReview(e.target.value)
                                            }
                                            multiline
                                            maxRows={4}
                                          />
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        container
                                        py={3}
                                        pb={26}
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Button
                                          sx={{
                                            fontSize: "13px",
                                            fontWeight: "700",
                                            color: "skyblue",
                                          }}
                                          onClick={() => giveReview(e)}
                                        >
                                          Finish & Review
                                        </Button>
                                      </Grid>
                                    </Card>
                                  </div>
                                ) : null}
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                          <br />
                        </Box>
                      );
                    })}
                </Grid>
              </Grid>

              {/* <Grid item md={4} sm={4} py={8} pl={5} xs={12}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyDFyl_inQSlRAupoZwmbJ0TgOqDA-_0-Tg",
                  }}
                  defaultZoom={15}
                  defaultCenter={{
                    lat: posLat,
                    lng: posLong,
                  }}
                >
                  <IconButton lat={posLat} lng={posLong}>
                    <LocationOn color="error" />
                  </IconButton>
                </GoogleMapReact>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <MobileFooter blue="blue" />
    </>
  );
}
