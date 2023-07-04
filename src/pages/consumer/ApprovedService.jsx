import moment from "moment";
import { useState, useEffect } from "react";
import { ReadContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { Close, ExpandMore } from "@mui/icons-material";
import MobileFooter from "../../components/MobileFooter";
import { ConsumerSubHead } from "../../components/ConsumerSubHead";
import {
  updateArray,
  deleteDocument,
  getMatchingData,
  compoundQuery,
  updateDocument,
  getDocumentData,
} from "../../firebase";
import {
  Avatar,
  Box,
  Grid,
  Modal,
  Button,
  Rating,
  Accordion,
  Container,
  TextField,
  IconButton,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Dialog,
} from "@mui/material";
import { ReadMore } from "../../services/readMore";

export const ApprovedService = () => {
  const navigate = useNavigate();
  const { userData } = ReadContext();
  const [offer, setOffer] = useState([]);
  const [offers, setOffers] = useState([]);
  const [contractorData, setContractorData] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);
  const [arr, setArr] = useState([]);
  const [num, setNum] = useState(0);
  const [photo, setPhoto] = useState("");
  const [job, setJob] = useState({});
  const setDatas = (e) => {
    getDocumentData("users", userData.uid).then((res) => {
      console.log(res.photo);
      if (res.photo !== undefined) {
        setPhoto(res.photo);
      }
    });
    setContractorData(e);
  };

  const setOfOffer = async (jobs) => {
    getMatchingData("offers", "jobId", "==", jobs.id).then((res) => {
      setOffers(res);
    });
  };
  const handleReview = () => {
    const data = {
      photo,
      rate,
      review,
      name: userData.displayName,
      category: arr[num].job.category,
    };
    var imgPlaceholder = [];
    imgPlaceholder.push("/images/placeholder.png");

    const contractorId = contractorData.contractorId;
    console.log(data);
    if (contractorData.status === "complete") {
      updateArray("users", contractorId, "contractorReview", data).then(() => {
        updateDocument("offers", contractorData.id, {
          status: "customer reviewed",
        }).then(() => navigate("/consumer/pending-service"));
      });
    } else {
      updateArray("users", contractorId, "contractorReview", data).then(() => {
        // deleteDocument("offers", arr[num].offer.id).then(() =>
        //   navigate("/consumer/pending-service")
        // );
        deleteDocument("jobs", job.id)
          .then(() => {
            offers.map((e) => {
              deleteDocument("offers", e.id);
            });
          })
          .then(() => {
            navigate("/consumer/pending-service");
          });
      });
    }
  };

  const handleRelist = async (jobId, offerId) => {
    await updateDocument("jobs", jobId, { status: "pending" });

    const data = await deleteDocument("offers", offerId)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
    return data;
  };

  const getOffers = () => {
    const query = [{ key: "status", operator: "!=", value: "pending" }];

    compoundQuery("offers", query).then((res) => setOffer(res));

    // getCollectionData("offers").then((res) => {
    //   const d = res.filter((el) => {
    //     if (el.status !== "pending" && el.status !== "customer reviewed") {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });
    //   setOffer(d);
    // });
  };
  const getData = async () => {
    const jobsPromise = await getMatchingData(
      "jobs",
      "status",
      "==",
      "complete"
    ).then((res) => {
      let fillss = res.filter((r) => r.userId === userData.uid);

      return fillss;
    });
    console.log(jobsPromise);

    const data = await Promise.all([offer, jobsPromise]).then((res) => {
      return res;
    });

    return data;
  };
  useEffect(() => {
    getOffers();
  }, []);

  console.log(arr);

  useEffect(() => {
    getData().then((res) => {
      res[1].forEach((e) => {
        res[0].forEach((el) => {
          if (e.id === el.jobId && el.status !== "customer reviewed") {
            setArr((arr) => [...arr, { offer: el, job: e }]);
          }
        });
      });
    });
  }, [offer]);

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
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div>
          <Container
            maxWidth="sm"
            sx={{
              p: 5,
              mt: 5,
              borderRadius: 1,
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Box mr={10}>
              <IconButton onClick={() => setShowModal(false)}>
                <Close />
              </IconButton>
            </Box>
            {/* <Box display="flex" justifyContent="flex-end"></Box> */}
            <Box>
              <Typography
                variant="h4"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <b>Review Contractor</b>
              </Typography>
              <br />
              <br />
              <Box display="flex" alignItems="center" justifyContent="center">
                Rating &nbsp; &nbsp; : &nbsp; &nbsp;
                <Rating
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </Box>
              <br />
              <br />
              <TextField
                label="Review"
                placeholder="Write Your Review Here"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                fullWidth
                multiline
                rows={2}
              />
              <br />
              <br />
              <Button
                onClick={() => handleReview()}
                variant="outlined"
                color="info"
                fullWidth
              >
                <b>Submit</b>
              </Button>
            </Box>
          </Container>
        </div>
      </Modal>

      <Container>
        <ConsumerSubHead page="approved-service" />
        <br />
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Typography>{arr.length} Jobs Found</Typography>
            <br />
            {arr &&
              arr.map((e, index) => {
                return (
                  <Box key={index}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={
                          <ExpandMore onClick={() => setShowResults(false)} />
                        }
                      >
                        <Box>
                          <Typography sx={{ color: "blue" }}>
                            <b>{e.job.category}</b>
                          </Typography>
                          <Typography sx={{ color: "blue" }}>
                            Date Submitted -&nbsp;
                            {moment
                              .unix(e.job.submitDate.seconds)
                              .format("Do MMM YYYY")}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box>
                          <Typography>
                            <b>DATE & TIME</b>
                          </Typography>
                          {e.job.time &&
                            e.job.time.map((ele, inx) => {
                              return (
                                <Typography key={index}>
                                  {ele.date} @ {ele.startTime} - {ele.endTime}
                                </Typography>
                              );
                            })}
                          <br />
                          <Typography>
                            <b>PAYMENT METHOD</b>
                          </Typography>
                          <Typography>
                            {e.job.paymentMethod?.join(", ")}
                          </Typography>
                          <br />
                          <Typography>
                            <b>ESTIMATE TYPE</b>
                          </Typography>
                          <Typography>{e.job.estimateType}</Typography>
                          <br />
                          <Typography>
                            <b>JOB DESCRIPTION</b>
                          </Typography>
                          <Typography textAlign="justify">
                            <ReadMore>{e.job.description}</ReadMore>
                          </Typography>
                          {/* {e.job.image &&
                            e.job.image.map((ele, inx) => {
                              return (
                                <img
                                  key={inx}
                                  src={ele}
                                  alt="Image"
                                  style={{
                                    margin: "0.25rem",
                                    height: "5rem",
                                    width: "5rem",
                                  }}
                                />
                              );
                            })} */}
                          {e.job.image &&
                            e.job.image.map((e, inx) => {
                              return (
                                <ImageGrid res={e} />
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
                          {/* ({console.log(e)}) */}
                          <Button
                            onClick={() => {
                              setNum(index);
                              setShowModal(true);
                              setDatas(e.offer);
                              setJob(e.job);
                              setOfOffer(e.job);
                            }}
                            color="themeLightGreen"
                            variant="contained"
                            fullWidth
                          >
                            <b>Request Completed</b>
                          </Button>
                          <br />
                          <br />
                          <Button
                            onClick={() => {
                              setShowResults(true);

                              setContractorData(e.offer);
                            }}
                            variant="outlined"
                            color="info"
                            fullWidth
                          >
                            <b>View Contractor Details</b>
                          </Button>
                          <br />
                          <br />
                          <Button
                            onClick={() => {
                              handleRelist(e.job.id, e.offer.id).then(() =>
                                navigate("/consumer/pending-service")
                              );
                            }}
                            variant="outlined"
                            color="info"
                            fullWidth
                          >
                            <b>Relist Offer</b>
                          </Button>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                    <br />
                  </Box>
                );
              })}
          </Grid>
          <Grid item md={4}>
            {showResults ? (
              <Box
                sx={{
                  p: 2,
                  mt: 6,
                  boxShadow: 4,
                  borderRadius: 2,
                }}
              >
                <Box display="flex" justifyContent="flex-end">
                  <IconButton onClick={() => setShowResults(false)}>
                    <Close />
                  </IconButton>
                </Box>
                <Grid container>
                  <Grid item md={4}>
                    <Avatar
                      style={{ height: "4rem", width: "4rem" }}
                      src={
                        contractorData.contractor.photo ||
                        "/icons/user-avatar.png"
                      }
                      alt="User Avatar"
                    />
                  </Grid>
                  <Grid item md={8}>
                    <Typography>
                      <b>{contractorData.contractor.userName}</b>
                    </Typography>
                    <Typography>
                      {contractorData.contractor.businessName}
                    </Typography>
                    <Typography>
                      <i>{contractorData?.location}</i>
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Typography variant="h6" color="blue">
                  CONTRACTOR INFORMATION
                </Typography>
                <br />
                <Typography>
                  <b>E-Mail</b> : {contractorData.email}
                </Typography>
                <Typography>
                  <b>Phone</b> : {contractorData.contractor.phone}
                </Typography>
                <br />
                <hr />
                <br />
                {contractorData.paymentMethod ? (<>
                  <Typography>
                    <b>ACCEPTED PAYMENTS</b>
                  </Typography>
                  <Typography>
                    {contractorData.paymentMethod?.join(", ")}
                  </Typography>
                  <br />
                </>) : (<></>)}

                {contractorData.contractor.credential ? (<>
                  <Typography>
                    <b>CREDENTIALS</b>
                  </Typography>
                  <Typography>
                    {contractorData.contractor.credential?.join(", ")}
                  </Typography>
                  <br />
                </>) : (<></>)}
                {contractorData.contractor.businessDesc ? (<>
                  <Typography>
                    <b>Business Description</b>
                  </Typography>
                  <Typography>
                    {contractorData.contractor.businessDesc}
                  </Typography>
                  <br />
                </>) : (<></>)}

                <hr />
                <br />
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography>
                    <b>OFFER</b>
                  </Typography>
                  <Box
                    sx={{
                      p: 1,
                      ml: 2,
                      borderRadius: 2,
                      backgroundColor: "greenyellow",
                    }}
                  >
                    <Typography>
                      <b>${contractorData.offer}</b>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
        <br />
        <br />
      </Container>

      <MobileFooter yellow="yellow" />
    </>
  );
};
