import moment from "moment";
import { useEffect, useState } from "react";
import { ReadContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import { ReadMore } from "../../services/readMore";
import MobileFooter from "../../components/MobileFooter";
import { ConsumerSubHead } from "../../components/ConsumerSubHead";
import {
  deleteDocument,
  updateDocument,
  getMatchingData,
  getDocumentData,
} from "../../firebase";
import {
  Box,
  Grid,
  Alert,
  Avatar,
  Button,
  Dialog,
  Rating,
  Divider,
  Snackbar,
  Accordion,
  Container,
  Typography,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import emailjs from '@emailjs/browser';
import { SendEmail } from "../../components/SendEmail";
export const PendingService = () => {
  const navigate = useNavigate();
  const { userData } = ReadContext();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currService, setCurrService] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [heading, setHeading] = useState("");
  const [reviews, setReviews] = useState([]);
  const [offers, setOffers] = useState([]);
  const [job, setJob] = useState([]);
  const [arr, setArr] = useState([]);
  const [nn, setNN] = useState(0);

  const acceptOffer = async (offerId, e) => {
    // console.log(job);
    console.log(e.contractor);

    let res = await getDocumentData('users', e.contractorId)
    console.log(res)
    // email send to contractor from customer to accept final request of constructor 
    if (e.contractor.isEmailAccess) {
      console.log('send email to contractor ===========>>>>>>', res.email)


      let userData = JSON.parse(localStorage.getItem('userData'))
      console.log(userData)
      let obj = {
        contractor_name: e.contractor.userName,
        job_name: job.category.split('>')[job.category.split('>').length - 1],
        user_name: userData.displayName,
        user_email: userData.email,
        contractor_email: e.contractor.email,
        template_name: 'Customer'
      }
      console.log(obj)
      SendEmail(obj)

    }



    updateDocument("offers", offerId, { status: "complete" })
      .then(() => {
        updateDocument("jobs", job.id, { status: "complete" }).then(() =>
          navigate("/consumer/approved-service")
        );
      })
      .catch((err) => console.log(err));
  };

  const deleteRequest = (id) => {
    deleteDocument("jobs", id).then(() => {

      setShowSnackbar(!showSnackbar);
      getPendingRequests();
    });
  };

  const getPendingRequests = () => {
    getMatchingData("jobs", "userId", "==", userData.uid)
      .then((res) => {
        const aa = res.filter((e) => e.status === "pending");
        setArr(aa);
      })
      .catch((err) => console.log(err));
  };
  const avgRate = (rev) => {
    let num = 0
    if (rev !== undefined) {
      const counts = rev.length;
      let sum = 0;
      rev.map((e) => {
        sum = sum + Number(e.rate);
      });
      num = Math.round(sum / counts)
    }
    return num;
  }
  const getOfferData = (id) => {
    getMatchingData("offers", "jobId", "==", id).then((res) => {
      const d = res.filter((data) => data.status === "pending");
      console.log(d)
      // const avgs= avgRate(d.contractor.review)
      // console.log(avgs)
      setNN(d.length);
      setOffers(d);
    });
  };

  useEffect(() => {
    getPendingRequests();
  }, [userData]);

  function ImageGrid({ res }) {
    console.log(res);
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
      <Container>

        <ConsumerSubHead page="pending-service" />
      </Container>

      <Container >
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Typography color="green" variant="h6">
              <b>Request Details</b>
            </Typography>
            <Typography>
              <i>{arr.length} Jobs Found</i>
            </Typography>
            <br />
            <br />
            {arr &&
              arr.map((e, index) => {
                return (
                  <Box key={index}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        onClick={() => {
                          setShowReview(false);
                          setCurrService(false);
                          if (index !== 0) {
                            setTimeout(() => {
                              document.getElementById(`scrollId${index}`).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
                            }, 200);
                          }
                          setNN(0);
                        }}
                      >
                        <Box>
                          <Typography color="green">{e.category}</Typography>
                          <Typography color="green" fontSize={12}>
                            date submitted -{" "}
                            {moment
                              .unix(e.submitDate.seconds)
                              .format("Do MMM YYYY")}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails id={`scrollId${index}`}>
                        <Typography>
                          <b>Date & Time</b>
                        </Typography>
                        <ul>
                          {e.time &&
                            e.time.map((ele, inx) => {
                              return (
                                <li key={inx} style={{ marginLeft: "15px" }}>
                                  <Typography>
                                    {ele.date} @ {ele.startTime} - {ele.endTime}
                                  </Typography>
                                </li>
                              );
                            })}
                        </ul>
                        {/* <br /> */}
                        <Typography mt={1}>
                          <b>Preferred Payment Method</b>
                        </Typography>
                        <Grid container>
                          {e.paymentMethod &&
                            e.paymentMethod.map((ele, inx) => {
                              return (
                                <Grid item md={6} key={inx}>
                                  <Typography>{ele}</Typography>
                                </Grid>
                              );
                            })}
                        </Grid>
                        {/* <br /> */}
                        <Typography mt={1}>
                          <b>Estimate Type</b>
                        </Typography>
                        <Typography>{e.estimateType}</Typography>
                        {/* <br /> */}
                        <Typography mt={1}>
                          <b>JOB DESCRIPTION</b>
                        </Typography>
                        <Typography textAlign="justify">
                          <ReadMore>{e.description}</ReadMore>
                        </Typography>
                        {/* <br /> */}
                        {e.image &&
                          e.image.map((ele, inx) => {
                            return (
                              <ImageGrid res={ele} />
                              // <img
                              //   key={inx}
                              //   src={ele}
                              //   alt="Image"
                              //   style={{
                              //     margin: "0.25rem",
                              //     height: "5rem",
                              //     width: "5rem",
                              //   }}
                              // />
                            );
                          })}
                        <Button
                          mt={1}
                          variant="contained"
                          color="themeLightBlue"
                          onClick={() => deleteRequest(e.id)}
                          fullWidth
                        >
                          <b>Delete Request</b>
                        </Button>
                        <br />
                        <br />
                        <Button
                          variant="outlined"
                          color="themeDarkBlue"
                          onClick={() => {
                            getOfferData(e.id);
                            setCurrService(true);
                            setHeading(e.category);
                            setJob(e);
                          }}
                          fullWidth
                        >
                          View Offers
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                    <br />
                  </Box>
                );
              })}
          </Grid>
          <Grid item md={4}>
            <br />
            <Typography>
              <i>{nn} Offers Found</i>
            </Typography>
            <br />
            <br />
            {currService ? (
              <>
                {offers &&
                  offers.map((e, index) => {
                    return (
                      <Accordion key={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          onClick={() => setShowReview(false)}
                        >
                          <Typography color="blue">
                            <b>RE : {heading}</b>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              style={{ height: "3rem", width: "3rem" }}
                              src={
                                e.contractor.photo || "/icons/user-avatar.png"
                              }
                              alt="Avatar"
                            />
                            <Box sx={{ ml: 2 }}>
                              <Typography>
                                <b>{e.contractor.userName}</b>
                              </Typography>
                              <Typography color="darkgreen">
                                {e.contractor.businessName}
                              </Typography>
                              <Typography>{e.location}</Typography>
                              <Grid container>
                                <Rating size="medium" value={avgRate(e.contractor.review)} />
                              </Grid>
                            </Box>
                          </Box>
                          <br />
                          <Divider />
                          <br />
                          <Typography color="green">
                            CONTRACTOR INFORMATION
                          </Typography>
                          <br />
                          <Typography>
                            <b>ACCEPTED PAYMENTS</b>
                          </Typography>
                          <Typography>
                            {e.paymentMethod?.join(", ")}.
                          </Typography>
                          <br />
                          <Typography>
                            <b>CREDENTIALS</b>
                          </Typography>
                          <Typography>
                            {e.contractor.credential || e.contractor.credential !== "" ? e.contractor?.credential?.join(", ") : ""}.
                          </Typography>
                          <br />
                          <Typography>
                            <b>BUSINESS DESCRIPTION</b>
                          </Typography>
                          <Typography>{e.contractor?.businessDesc}</Typography>
                          <br />
                          <Divider />
                          <br />
                          <Typography>
                            <b>OFFER :</b>
                            <span
                              style={{
                                marginLeft: "1rem",
                                borderRadius: "4px",
                                padding: "0.5rem 1rem",
                                backgroundColor: "lightgreen",
                              }}
                            >
                              $ {e.offer}
                            </span>
                          </Typography>
                          <br />
                          <br />
                          <Button
                            onClick={() => acceptOffer(e.id, e)}
                            color="themeLightBlue"
                            variant="contained"
                            fullWidth
                          >
                            <b>Accept Offer</b>
                          </Button>
                          <br />
                          <br />
                          <Button
                            onClick={() => {
                              setShowReview(true);
                              setReviews(e.contractor.contractorReview);
                            }}
                            color="themeDarkBlue"
                            variant="outlined"
                            fullWidth
                          >
                            View Reviews
                          </Button>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
              </>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item md={4}>
            <br />
            <br />
            <br />
            <br />
            {showReview ? (
              <Box sx={{ height: "100vh", overflowY: "scroll", pr: 3, pl: 1 }}>
                <Typography variant="h6">
                  <b>Contractor Ratings & Reviews</b>
                </Typography>
                <Typography>{reviews?.length} Reviews</Typography>
                <br />
                {reviews &&
                  reviews.map((e, index) => {
                    const image = e.photo || "/icons/user-avatar.png";

                    return (
                      <Box
                        key={index}
                        sx={{ mb: 4, p: 4, borderRadius: 2, boxShadow: 4 }}
                      >
                        <Box display="flex" alignItems="center">
                          <img
                            src={image}
                            alt="User Image"
                            style={{ height: "2.5rem", width: "2.5rem" }}
                          />
                          &nbsp; &nbsp; &nbsp;
                          <Typography>
                            <b>{e.name}</b>
                          </Typography>
                        </Box>
                        <br />
                        <Rating value={e.rate} disabled />
                        <Typography>{e.review}</Typography>
                      </Box>
                    );
                  })}
              </Box>
            ) : (
              <></>
            )}
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
            Document Deleted Successfully
          </Alert>
        </Snackbar>
        <br />
        <br />
      </Container>

      <MobileFooter yellow="yellow" />
    </>
  );
};
