import { useEffect, useState } from "react";
import { ReadContext } from "../../Context";
import { Close } from "@mui/icons-material";
import MobileFooter from "../../components/MobileFooter";
import { Rating, Card, CardContent, Dialog } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getDocumentData, addDocument, updateDocument, getMatchingData } from "../../firebase";
import { ContractorSubHead } from "../../components/ContractorSubHead";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  Box,
  Grid,
  Alert,
  Modal,
  Avatar,
  Button,
  Divider,
  Checkbox,
  Snackbar,
  Container,
  TextField,
  Typography,
  FormControlLabel,
  AlertTitle
} from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import moment from "moment";
import { SendEmail } from "../../components/SendEmail";


export const OpenServiceTwo = () => {
  const [estimates, setEstimates] = useState("$0-$0")
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState(false);
  const { id } = useParams();
  localStorage.setItem("jobId", id)
  const navigate = useNavigate();
  const { userData } = ReadContext();
  const location = localStorage.getItem("city");
  const [timeArr, setTime] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);


  const [showResults, setShowResults] = useState(false);
  const [contractor, setContractor] = useState({});
  const [disables, setDisables] = useState(false);
  const [customer, setCustomer] = useState({});
  const [payment, setPayment] = useState([]);
  const [review, setReview] = useState([]);
  const [offer, setOffer] = useState("");
  const [data, setData] = useState({});
  const [count, setCount] = useState(0);
  const [showMore, setShowMore] = useState("");
  const [count1, setCount1] = useState(true);
  const [avg, setAvg] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showError, setShowError] = useState(false);
  const [response, setResponse] = useState([true, true, true])
  const [profileAlrt, setProfileAlrt] = useState(false);

  const cityss = (s) => {
    if (s !== undefined) {

      console.log(s)
      let r = s.split(",");
      return (r[r.length - 3] + "," + r[r.length - 2]);
    } else {
      return ("");

    }
  }

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "pay ServiceArc fee",
            amount: {
              currency_code: "USD",
              value: 5,
            },
          },
        ],
        application_context: {
          "disable-funding": 'credit'
        },
      })
      .then((orderID) => {
        setOrderId(orderID);
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      updateDocument("users", userData.uid, {
        isActive: true,
        payDate: new Date(),
        show: true
      });
      setShowModal(false);
      const dd = contractor;
      dd.isActive = true;
      setContractor(dd);
      setSuccess(true);
    });
  };
  const onError = (data, actions) => {
    console.log("error");
    setErrorMessage("An error occured with your payment");
  };

  var imgPlaceholder = [];
  imgPlaceholder.push(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXx8/XCy9K/yND09vfw8vTP1tzp7O/i5ure4+fO1dvJ0dfT2d/EzNPt7/Lb4OXo6+4FeM7UAAAFL0lEQVR4nO2c24KrIAxFLdha7///t0dxOlWDSiAKztnrbR4G6SoJBKHZA6zJYncgQeCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ot3Oi1KMq64FnWTVq+EueWzlRquqKVn/J+/ezEfdyHydKPYtc62yF1m1Xymq5ixPVdDnx8eslf1eCVu7hRFXFppAfLW39kNJyByeqOTJirGTvRsbKDZyozsHIpKUQsZK8E1Vu55GTrKTuRL0ZRoyVLviZaTtRVctUMuaVOnCoJO1E1WwjxsorbGZO2Qk7br5WuhApKTvpfZWMy5WAoZKuk6b1NhI4VJJ10uRBSsas0ng+OlUnVaARw9NvqCTqRERJpt9eUtJ0IqPEN36SdNIIKRnIPeafFJ0Ep9c5mr+qTdFJ2CRMpLAn5fScqJeokrFWZkoRdaImwtpw2T9iSnnxuiDoRFXda6hK28JzWTA14ryBxKFlTT9iTlT1W57o3Lta96yED8krRieknCw/DDuEP1TnKBlgzMlCTtZDXr+8pIjOwitK5x7JOKFD3mukiE85ix45S5FxYll46prdiv8ekpsU19wv4kS9LV1ouQPlrPzKliIzTuw9YDYiVfgFSxFx8rR+wcyMomSX9HYpTjlFwonqrB3gBc/JyYQjRcRJYe8Ay4l9rMlLcVi8iTjp7Y/nOBHcMjngWEoi4+TUlcmKw9rnxHzCWMqeU/ltkB9JEZl3SusnYmwQn1fm2GgPeiOzZrM9WZfu/3/BNDznYATLOLENffep+JppeMZBMSZUF9N6ljFM7KF3qpTduBZyQj4W53XTiRsEm1L2dr2k9k9W9Rtjq2BrJj9Zyk7pI7bP9lw8kfH+4KIFLGF77Sa3R90Un0POvHNCcYzsLVMk9+2buni1bd9xjMSJHMPmjCz7zov/fidW5GQ7OS/2e8BoRrLtrBfXScTIMVLsk09cJxEjZ8I6+cR1EmG1tsRaDsZ0EjlyDL0leuxOpulD4JTALtfXORRbnqVO1LDOePdtpoclWPsqulL+wt0P0SNnxFKrrp2opmuXl+5OuHA3PSmByDGQ9ezSydYdM+ELd4YUIsdANnoWTva2RSUv3JlnJRE5I2RbY+6kee1+dTrrhC7cPTZeMUdivZnydaIc3tdqqWuI6USOYZlSfp0oxzVlJxNByUSOYZlSPk6cDzqEXy17JDTn/LBMKRlTSRZ4X2giep2zZnEwZHLiGjifFt6BTtKKHMMspUxO2BkvDzoDm1jkGGa7bsaJx0t9XfgrOfuMlhezwsc48RrKufvhyiXXHatg8T2Zkm0eHzluxO8W4pXHKljkXycBt3h9blFdeqyCx2fPOguLbn6qTWsBu+Czxs/CopsdP4kmkx+mcZ8FRrfuWUqSTSYT005keDucW4iXnzRhMg17iYacC6A0VyZzzIQs0pBrUrn22JoXY4Us0pDjaZMzb+dIMX6/Qi0dHSU0XHySz48heqSaOs60vsvlq2mtpzj9OCh/Trgjew7afgLar63d6ec2SmTZm37+UyV7048K+Gmkm7O10A/8aaSbY7sEr8rYvYoNnX4Sr3EuYJVpVc35Ccu/innZbryMJ1n4v9f4N9FZ39XPZ931GYzMGH9VPHYfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADp8Q9+nG9anuOrfAAAAABJRU5ErkJggg=="
  );
  const handleOnChange = (e, index, datas) => {
    data.time[index].check = true;
    setIsChecked(!isChecked);
    if (e.target.checked) {
      setTime((timeArr) => [...timeArr, datas]);
    } else {
      let time = datas.startTime;
      let dates = datas.date;
      let filt = timeArr.filter((r) => {
        if (dates === r.date && time === r.startTime) {
          return false;
        } else {
          return true;
        }
      });
      setTime(filt);
    }
  };

  const avgRate = (rev) => {
    if (rev !== undefined) {
      const counts = rev.length;
      let sum = 0;
      rev.map((e) => {
        sum = sum + Number(e.rate);
      });
      setAvg(Math.round(sum / counts));
    }
  };

  const addPaymentMethods = (inx, data1, event) => {
    if (event.target.checked) {
      // if (!payment.includes(data.paymentMethod[inx])) {
      //   setPayment([...payment, data.paymentMethod[inx]]);
      // }
      setPayment((payment) => [...payment, data1]);
    } else {
      const a = payment.filter((r) => r !== data1);

      setPayment(a);
    }
  };
  const showHide = (data1) => {
    if (count1) {
      setShowMore(data1);
      setCount1(false);
    } else {
      setShowMore("");
      setCount1(true);
    }
  };

  const handleSubmit = async (j) => {
    console.log(data)

    if (customer.isEmailAccess) {
      let userData = JSON.parse(localStorage.getItem('userData'))


      console.log('send email =============>>>>>>>', offer)
      console.log('send email =============>>>>>>>', customer.userName)
      let job_name = data.category.split('>')[data.category.split('>').length - 1]

      let emailData = {
        user_email: customer.email,
        amount: offer,
        contractor_name: userData.displayName,
        job_name,
        user_name: customer.userName,
        template_name: 'Contractor'

      }
      SendEmail(emailData)
    }


    let arr = []
    arr[0] = timeArr.length !== 0 ? false : true;
    arr[1] = payment.length !== 0 ? false : true;
    arr[2] = offer !== "" ? false : true;

    setResponse(arr)

    if (timeArr.length !== 0 && payment.length !== 0 && offer !== "") {
      setDisables(true);
      const data = {
        time: timeArr,
        offer,
        location,
        jobId: id,
        status: "pending",
        // userName: r.userName,
        email: userData.email,
        paymentMethod: payment,
        contractor: contractor,
        contractorId: userData.uid,
        // photo: res1.photo || " ",
        jobImage: userData.image || [],
      };


      addDocument("offers", data)
        .then(() => setShowSnackbar(!showSnackbar))
        .catch((err) => console.log(err));

      setTimeout(() => navigate("/contractor/accepted-service"), 2500);
    } else {
      setShowModal1(true)
    }
    setTimeout(() => {
      setShowModal1(false);
    }, 3000);
  };

  const restichUser = () => {
    if (data.userId === userData.uid) {
      return true;
    }
    if (data.userId !== userData.uid) {
      return false;
    }
  };
  useEffect(() => {
    getDocumentData("jobs", id)
      .then((res) => setData(res))
      .catch((err) => console.log(err));

    getDocumentData("users", userData.uid).then((res) => {
      console.log(res)
      if (res.businessDesc === undefined || res.businessDesc.length === 0 || res.credential === undefined || res.credential.length === 0 || res.businessName === undefined || res.businessName.length === 0 || !res.businessExp || res.businessAddress === undefined || res.businessAddress.length === 0 || res.phone.length === 0 || res.userName.length === 0 || res.payment === undefined || res.payment.length === 0) {
        setProfileAlrt(true);

      } else {
        setProfileAlrt(false);

      }
      if (res.payDate === undefined) {
        setContractor(res);
      } else {
        const dateArr = moment.unix(res.payDate.seconds).format("l").split("/");
        const dateAgo = moment().diff(
          [dateArr[2], dateArr[0] - 1, dateArr[1]],
          "days"
        );

        if (dateAgo >= 30) {
          updateDocument("users", userData.uid, { isActive: false, show: false });
          res.isActive = false;
        }
        setContractor(res);
      }
    });
  }, [userData]);

  useEffect(() => {
    getDocumentData("users", data.userId).then((res) => {
      setCustomer(res);
      if (res.review !== undefined) {
        setReview(res.review);
        avgRate(res.review);
      }
    });
    getMatchingData("offers", "jobId", "==", id).then((res) => {
      let valueMax, valueMin;
      if (res.length === 0) {
        valueMax = 0;
        valueMin = 0;

      } else {

        valueMax = Math.max(...res.map(o => o.offer))
        valueMin = Math.min(...res.map(o => o.offer))
      }
      console.log(res);
      if (valueMax === valueMin) {
        setEstimates(`$0-$${valueMax}`)
      } else {
        setEstimates(`$${valueMin}-$${valueMax}`)

      }
      console.log(valueMin)
    })
  }, [data]);

  const handleChnagebackgroundColor = (e, data) => {
    // setTextColor('#00e676');
    let btn = document.getElementsByClassName("demo");
    // let count = 0;
    // for (let i = 0; i < btn.length; i++) {
    //   btn[i].style.backgroundColor = "white";
    // }

    if (count == 0) {
      // e.target.style.backgroundColor = "#ffff00";
      setCount(count + 1);
    } else {
      e.target.style.backgroundColor = "white";
      setCount(0);
    }
  };
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
      {contractor.isActive === false ? (
        <>
          <Modal open={showModal} onClose={() => setShowModal(!showModal)}>
            <Container
              maxWidth="md"
              sx={{
                p: 5,
                mt: 10,
                backgroundColor: "white",
              }}
            >
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AXq4cIgYdJE9i_kAIpinVJsgbOIjxahhmQMIKHxkk64Fqao2rwQMY2nbbeBuU-aqkjZBVe6O3FDV6eyU",
                }}
              // options={{
              //   "client-id":
              //     "AXPCTN8IYJTTtgZ5vrs4ObKHuYOtJ11e1PX30j75C3_EdH9sOEa72ZDXGaENcN-5etRFwfEFO9APayNy",
              //     'disable-funding': 'card'
              // }}
              >
                <Typography variant="h5" textAlign="center">
                  Submit unlimited estimates $5/month
                </Typography>
                <br />
                <br />
                <Grid container spacing={2}>
                  <Grid item md={4} sx={{ width: "100%" }}>

                    <form name="PrePage" target="_blank" method="post" action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx"
                    // onClick={() => click()} 
                    >
                      <input type="hidden" name="LinkId" value="f7f2e1ac-6a45-4aa1-8730-8c0828892f51" />
                      <input type="image" src="//content.authorize.net/images/buy-now-blue.gif" /> </form>

                  </Grid>
                  <Grid item md={4} sx={{ width: "100%" }}>
                    <PayPalButtons
                      style={{ layout: "horizontal" }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  </Grid>
                  <Grid item md={4} sx={{ width: "100%" }}>
                    <Button
                      onClick={() => setShowModal(!showModal)}
                      variant="outlined"
                      color="error"
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </PayPalScriptProvider>
            </Container>
          </Modal>
        </>
      ) : null}
      <Modal open={showError} onClose={() => setShowError(!showError)}>
        <Container
          // maxWidth="md"
          sx={{
            p: 8,
            mt: 20,
            backgroundColor: "white",
            maxWidth: 300,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Enter correct card details
          </Typography>
          <br></br>
          <Grid item xs={4}>
            <Button
              onClick={() => setShowError(!showError)}
              variant="outlined"
              color="error"
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Container>
      </Modal>
      <Container>
        <ContractorSubHead page="open-service-request" />
        <Grid container spacing={4}>
          <Grid item md={5}>
            <Box
              sx={{
                p: 2,
                mb: 2,
                border: 3,
                borderColor: "yellow",
                borderRadius: 1,
              }}
            >
              <Typography variant="h6">
                <b>{data.category}</b>
              </Typography>
              <br />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  style={{ width: 55, height: 55 }}
                  src={customer.photo || ""}
                  alt={customer.userName}
                />
                <Box sx={{ ml: 2, mt: 3 }}>
                  <Typography>
                    <b>{customer.userName || " no Name"}</b>
                  </Typography>
                  <Rating size="small" value={avg} />
                  <Typography>{cityss(data.address)}</Typography>
                </Box>
              </Box>
              <br />
              <Typography>
                <b>Select Date & Time</b>
              </Typography>
              {data.time &&
                data.time.map((e, index) => {
                  return (
                    <Grid
                      container
                      sx={{
                        backgroundColor: "yellow",
                        margin: "10px 10px",
                        display: "flex",
                        alignItems: "center",
                        width: "97%",
                      }}
                    >
                      <Grid item xs={2}>
                        <Typography
                          key={index}
                          onClick={(s) => {
                            handleChnagebackgroundColor(s, e);
                          }}
                          className="demo"
                        >
                          <span>
                            <Checkbox
                              checked={data.time.check}
                              onChange={(s) => handleOnChange(s, index, e)}
                              required={response[0]}
                            />
                          </span>
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography>
                          {e.date} @ {e.startTime} - {e.endTime}
                        </Typography>
                      </Grid>
                    </Grid>

                    // <Typography
                    //   key={index}
                    //   onClick={(s) => {
                    //     handleChnagebackgroundColor(s, e);
                    //   }}
                    //   className="demo"
                    //   style={{
                    //     // pl: 2,
                    //     backgroundColor: "yellow",
                    //     margin: "10px 10px",
                    //   }}
                    //   // style={{ cursor: "pointer" }}
                    // >
                    //   <span>
                    //     <Checkbox
                    //       checked={data.time.check}
                    //       onChange={(s) => handleOnChange(s, index, e)}
                    //     />
                    //   </span>
                    //   {e.date} @ {e.startTime} - {e.endTime}
                    // </Typography>
                  );
                })}
              <br />
              <Typography>
                <b>Preferred Payment Method</b>
              </Typography>
              <br />
              <Grid container spacing={2}>
                {data.paymentMethod &&
                  data.paymentMethod.map((e, index) => {
                    return (
                      <Grid item md={6} key={index}>
                        <Box
                          sx={{
                            pl: 2,
                            backgroundColor: "yellow",
                            borderRadius: 1,
                          }}
                        >
                          <FormControlLabel
                            label={e}
                            control={
                              <Checkbox
                                onChange={(s) => addPaymentMethods(index, e, s)}
                                required={response[1]}
                              />
                            }
                          />
                        </Box>
                      </Grid>
                    );
                  })}
              </Grid>
              <br />
              <Typography>
                <b>Estimate Type</b>
              </Typography>
              <Typography>{data.estimateType}</Typography>
              <br />
              <Typography>
                <b>Job Description</b>
              </Typography>
              {/* <Typography>{data.description}</Typography> */}
              <Typography textAlign={"justify"}>
                {showMore.length !== 0
                  ? showMore
                  : data.description
                    ? data.description.slice(0, 30)
                    : null}
                <span
                  style={{ color: "blue", cursor: "pointer", display: 'flex', alignItems: 'center' }}
                  onClick={() => {
                    showHide(data.description);
                  }}
                >
                  <span>
                    {showMore.length !== 0 ? "see less" : "see more..."}
                  </span>
                  {showMore.length !== 0 ? (
                    <ExpandLessIcon sx={{ height: "20px" }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ height: "20px" }} />
                  )}
                </span>
              </Typography>
              <br />
              {/* {data.image &&
              data.image.map((ele, inx) => {
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
              {data.image &&
                data.image.map((ele, inx) => {
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
              <Divider />
              <br />
              {restichUser() ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item md={5} xs={12}><Box display="" height="100%" alignItems="center">
                      <b>Current Estimate :</b>
                    </Box></Grid>
                    <Grid item md={7} xs={12}>{estimates}</Grid>
                    <br />
                    <Grid item md={5} xs={12}>
                      <Box display="" height="" alignItems="center">
                        <b>Your Offer :</b>
                      </Box>
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <TextField
                        type="number"
                        label="Your Offer"
                        placeholder="Enter Your Offer"
                        value={offer}
                        disabled
                        fullWidth
                        required={response[3]}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <br />
                  <Button variant="contained" color="info" disabled fullWidth>
                    <b>Submit Estimate</b>
                  </Button>
                </>
              ) : (
                <>
                  <Grid container spacing={2}>
                    <Grid item md={5} xs={12}><Box display="" height="100%" alignItems="center">
                      <b>Current Estimate :</b>
                    </Box></Grid>
                    <Grid item md={7} xs={12}>{estimates}</Grid>
                    <Grid item md={5} xs={12}>
                      <Box display="flex" height="100%" alignItems="center">
                        <b>Your Offer :</b>
                      </Box>
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <TextField
                        type="number"
                        label="Your Offer"
                        placeholder="Enter Your Offer"
                        value={offer}
                        onChange={(e) => setOffer(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <br />
                  <Button
                    onClick={() => {
                      if (contractor.isActive === true) {
                        handleSubmit();
                      } else {
                        setShowModal(true);
                      }
                    }}
                    variant="contained"
                    color="info"
                    disabled={disables}
                    fullWidth
                  >
                    <b>Submit Estimate</b>
                  </Button>
                </>
              )}

              <Button
                onClick={() => {
                  setShowResults(true);
                }}
                sx={{ marginTop: "5px" }}
                variant="contained"
                color="success"
                fullWidth
              >
                <b>View Reviews</b>
              </Button>
            </Box>
          </Grid>

          {showResults ? (
            <Grid item md={4} mt={4} mx={4}>
              <Box sx={{ mt: "-20px", height: "100%", overflowY: "scroll" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  CUSTOMER REVIEWS & RATINGS &nbsp;
                  <Close
                    sx={{ color: "#8bc34a", cursor: "pointer" }}
                    onClick={() => setShowResults(false)}
                  />
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  <em>{review.length} reviews.</em>
                </Typography>
                {review &&
                  review.map((r) => {
                    return (
                      <>
                        <Card sx={{ marginTop: "5px", width: "90%" }}>
                          <CardContent>
                            <Grid container>
                              <Grid item md={3}>
                                <Avatar
                                  sx={{ width: 55, height: 55 }}
                                  alt={r.name}
                                  src={r.photo || ""}
                                />
                              </Grid>
                              <Grid item md={9}>
                                <Grid container sx={{ ml: 1 }}>
                                  <Typography>{r.name}</Typography>
                                </Grid>
                                <Grid container>
                                  <Rating size="medium" value={r.rate} />
                                </Grid>
                                <Grid container>
                                  <Typography variant="body2">
                                    {r.review}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </>
                    );
                  })}
              </Box>
            </Grid>
          ) : (
            ""
          )}
          {/* {show ? ( */}

          {/* ) : null} */}
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
            Estimate Added Successfully
          </Alert>
        </Snackbar>

        <Snackbar
          open={showModal1}
          autoHideDuration={2500}
          onClose={() => setShowSnackbar(!showModal1)}
        >
          <Alert
            severity="info"
            sx={{ width: "100%" }}
            onClose={() => setShowSnackbar(false)}
          >
            Fill This form properly before click on submit button
          </Alert>
        </Snackbar>
        <Snackbar
          open={profileAlrt}

        // onClose={() => setProfileAlrt(!profileAlrt)}
        >
          <Alert
            severity="warning"
            sx={{ width: "100%", marginLeft: "950px" }}
            onClose={() => setProfileAlrt(false)}
          >

            Recommend you to complete your contractor profile first
          </Alert>
        </Snackbar>
      </Container>
      <MobileFooter blue="blue" />
    </>
  );
};
