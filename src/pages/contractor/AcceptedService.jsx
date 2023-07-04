import moment from "moment";
import { useEffect, useState } from "react";
import { ReadContext } from "../../Context";
import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Grid,
  Alert,
  Button,
  Avatar,
  Dialog,
  Snackbar,
  useTheme,
  Accordion,
  Container,
  Typography,
  useMediaQuery,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Rating from "@mui/material/Rating";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ContractorSubHead } from "../../components/ContractorSubHead";
import {
  compoundQuery,
  getDocumentData,
} from "../../firebase/cloudFirestore/getData";
import { deleteDocument } from "../../firebase";
import MobileFooter from "../../components/MobileFooter";

export function AcceptedService() {
  const { userData } = ReadContext();

  const [data, setData] = useState([]);
  const [count1, setCount1] = useState(true);
  const [showMore, setShowMore] = useState("");
  const [pendData, setPendData] = useState([]);

  const showHide = (data1) => {
    if (count1) {
      setShowMore(data1);
      setCount1(false);
    } else {
      setShowMore("");
      setCount1(true);
    }
  };

  useEffect(() => {
    getData();
  }, [userData]);

  useEffect(() => {
    storeData(pendData);
  }, [pendData]);

  const storeData = async (n) => {
    console.log(n);
    pendData.map((e) => {
      let avg = 0;
      if (e.review !== undefined) {
        const counts = e.review.length;
        let sum = 0;
        e.review.map((e) => {
          sum = sum + Number(e.rate);
        });
        avg = Math.round(sum / counts);
      }

      const obj = {
        category: e.category,
        payment: e.paymentMethod,
        description: e.description,
        submitDate: moment.unix(e.submitDate.seconds).format("Do MMM YYYY"),
        time: e.time,
        offer: e.offer,
        status: e.status,
        estimateType: e.estimateType,
        offerId: e.id,
        userName: e.userName,
        photo: e.photo || " ",
        avgStar: avg,
        jobImage: e.image || [],
      };
      setData((data) => [...data, obj]);
    });
  };

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbar2, setShowSnackbar2] = useState(false);

  const { posLat } = ReadContext();
  const { posLong } = ReadContext();

  const [load, setLoad] = useState();

  const getData = async () => {
    const query = [
      { key: "email", operator: "==", value: userData.email },
      { key: "status", operator: "==", value: "pending" },
    ];

    compoundQuery("offers", query).then(async (res) => {

      const ass = res.map(async (ee) => {
        let jobData = await getDocumentData("jobs", ee.jobId).then((res1) => {
          if (res1 !== undefined) {
            if (res1.status === "pending") {
              return res1;
            }
          }
        });
        if (jobData !== undefined) {

          let dataUser = await getDocumentData("users", jobData.userId).then(
            (res) => {
              return res;
            }
          );
          let mg = { ...jobData, ...dataUser, ...ee };
          setPendData((pendData) => [...pendData, mg]);
        }
      });
    });
  };

  const deleteEst = (id) => {
    deleteDocument("offers", id)
      .then((res) => window.location.reload(true))
      .catch((e) => console.log(e));
  };

  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  function ImageGrid({ res }) {
    const [popup, setPopup] = useState(false);

    return (
      <>
        <img
          src={res}
          style={{
            margin: "0.25rem",
            height: "5rem",
            width: "5rem",
          }}
          onClick={() => setPopup(true)}
        />
        <Dialog open={popup} fullWidth={true} maxWidth="lg">
          <Button onClick={() => setPopup(false)}>cancel</Button>
          <img
            style={{ width: "100%", height: "100vh", boxSizing: "center" }}
            src={res}
          />
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Container sx={{ width: "100%" }}>
        <ContractorSubHead page="accepted-service" />
      </Container>
      <Container>
        <Grid container paddingX={2} pb={8}>
          <Grid container>
            <Grid item md={4} px={1} mt={2}>
              <Typography color="#8bc34a" variant="h6" fontSize={16}>
                CURRENT SERVICES{" "}
                <span style={{ color: "black", fontSize: "12px" }}>
                  ( {data.length} Jobs )
                </span>
              </Typography>
              {data.map((e, index) => {
                return (
                  <Box key={index}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}
                        onClick={() => {

                          if (index !== 0) {
                            setTimeout(() => {
                              document.getElementById(`scrollId${index}`).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
                            }, 200);
                          }

                        }}
                      >
                        <Box>
                          <Typography color="green">
                            {e.category}
                            <Typography variant="body1" sx={{ fontSize: 12 }}>
                              date submitted - {e.submitDate}
                            </Typography>
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails id={`scrollId${index}`}>
                        <Grid container mt={1}>
                          <Grid item md={3} xs={3}>
                            <Avatar
                              sx={{ width: 45, height: 40 }}
                              src={e.photo}
                              alt={e.userName}
                            />
                          </Grid>

                          <Grid item>
                            <Typography>{e.userName || "No Name"}</Typography>
                            <Rating
                              name="size-small"
                              value={e.avgStar}
                              size="small"
                            />
                          </Grid>
                        </Grid>
                        <Typography>
                          <b>Date & Time</b>
                        </Typography>
                        {e.time &&
                          e.time.map((ele, inx) => {
                            return (
                              <Typography key={inx}>
                                {ele.date} @ {ele.startTime} - {ele.endTime}
                              </Typography>
                            );
                          })}
                        {/* <br /> */}
                        <Typography mt={1}>
                          <b>ACCEPTED PAYMENT METHOD</b>
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          {e.payment.join()}
                        </Typography>
                        {/* <br /> */}
                        <Typography mt={1}>
                          <b>ESTIMATE TYPE</b>
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          <span>{e.estimateType}</span>
                        </Typography>

                        <Typography textAlign="justify" mt={1}>
                          <b>JOB DESCRIPTION</b>
                        </Typography>
                        <Grid item>
                          <Typography
                            sx={{ fontSize: 14, textAlign: "justify" }}
                          >
                            {showMore.length !== 0
                              ? showMore
                              : e.description.slice(0, 30)}{" "}
                            <span
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => {
                                showHide(e.description);
                              }}
                            >
                              <span>
                                {showMore.length !== 0
                                  ? "see less"
                                  : "see more..."}
                              </span>
                              {showMore.length !== 0 ? (
                                <ExpandLessIcon sx={{ height: "20px" }} />
                              ) : (
                                <KeyboardArrowDownIcon
                                  sx={{ height: "20px" }}
                                />
                              )}
                            </span>
                          </Typography>
                        </Grid>
                        <Grid container spacing={1} py={1}>
                          {e.jobImage &&
                            e.jobImage.map((e, inx) => {
                              return <ImageGrid res={e} />;
                            })}

                          <Grid item></Grid>
                        </Grid>
                        <hr />
                        <br />
                        <Grid container spacing={4}>
                          <Grid item md={4}>
                            <Typography>
                              <b>OFFER</b>
                            </Typography>
                          </Grid>
                          <Grid item md={4}>
                            <Typography
                              p={1}
                              sx={{
                                color: "blue",
                                borderRadius: 1,
                                backgroundColor: "#bbdefb",
                              }}
                            >
                              ${e.offer}
                            </Typography>
                          </Grid>
                          <Grid item md={4}>
                            <Typography
                              p={1}
                              sx={{
                                color: "blue",
                                borderRadius: 1,
                                backgroundColor: "#90caf9",
                              }}
                            >
                              {e.status}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          mt={2}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Grid item pb={2}>
                            <Button
                              variant="body1"
                              sx={{
                                backgroundColor: "#ffab91",
                                color: "red",

                                fontWeight: "bold",
                                borderRadius: 2,
                              }}
                              onClick={() => deleteEst(e.offerId)}
                            >
                              Cancel Estimate
                            </Button>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                    <br />
                  </Box>
                );
              })}
            </Grid>
            <Grid item md={4} sx={{ height: "100%" }}></Grid>
          </Grid>
        </Grid>

        {showSnackbar === false ? (
          <>
            <Snackbar
              open={showSnackbar2}
              autoHideDuration={2500}
              onClose={() => setShowSnackbar2(!showSnackbar2)}
            >
              <Alert
                severity="success"
                sx={{ width: "100%" }}
                onClose={() => setShowSnackbar2(!showSnackbar2)}
              >
                Estimate Cancel Successfully
              </Alert>
            </Snackbar>
          </>
        ) : (
          <>
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
                Estimate Complete Successfully
              </Alert>
            </Snackbar>
          </>
        )}
      </Container>
      <MobileFooter blue="blue" />
    </>
  );
}
