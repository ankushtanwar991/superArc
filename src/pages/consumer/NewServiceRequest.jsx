import moment from "moment";
import style from "./style.module.css";
import { useState, useRef } from "react";
import { ReadContext } from "../../Context";
import { Close } from "@mui/icons-material";
import data from "../../data/jobCategory.json";
import MobileFooter from "../../components/MobileFooter";
import { addDocument, uploadImage } from "../../firebase";
import { ConsumerSubHead } from "../../components/ConsumerSubHead";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Alert,
  Modal,
  Select,
  Button,
  Dialog,
  Checkbox,
  MenuItem,
  Snackbar,
  TextField,
  Container,
  IconButton,
  Typography,
  FormControl,
  Autocomplete,
  FormControlLabel,
} from "@mui/material";

export const NewServiceRequest = () => {
  const imgPlaceholder =
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

  const city = localStorage.getItem("city");

  const paymentMethods = ["Cash", "Card", "Check", "PayPal/Other"];
  const currDate = new Date();
  const newDate = moment(new Date()).format("YYYY-MM-DD");
  const estimateType = ["Whole Estimate", "Labor Only"];

  const navigate = useNavigate();
  const { cat } = useParams();

  const { posLat } = ReadContext();
  const { posLong } = ReadContext();
  const { userData } = ReadContext();

  const location = useLocation();
  const { from } = location.state;

  const [lat, setLat] = useState(posLat);
  const [long, setLong] = useState(posLong);

  const [category, setCategory] = useState(`${cat} > ${from}`);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [timePopup, setTimePopup] = useState(false);
  const [timeAlert, setTimeAlert] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [timeSlot, setTimeSlot] = useState([]);
  const [estimate, setEstimate] = useState(0);
  const [endTime, setEndTime] = useState("");
  const [address, setAddress] = useState("");
  const [imgLink, setImgLink] = useState([]);
  const [payment, setPayment] = useState([]);
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  const imgBtn = useRef(null);

  const addPaymentMethods = (inx, event) => {
    if (event.target.checked) {
      if (!payment.includes(paymentMethods[inx])) {
        setPayment([...payment, paymentMethods[inx]]);
      }
    } else {
      let pay = payment.filter((r) => r !== paymentMethods[inx]);
      setPayment(pay);
    }
  };

  const addTimeSlots = () => {
    if (date !== "" && startTime !== "" && endTime !== "") {
      setTimeSlot([
        ...timeSlot,
        {
          date: date,
          endTime: moment(endTime, "HH:mm").format("hh:mm A"),
          startTime: moment(startTime, "HH:mm").format("hh:mm A"),
        },
      ]);
    }

    setEndTime("");
    setStartTime("");
    setDate(new Date());

    setTimePopup(false);
  };

  const removeTimeSlot = (id) => {
    const arr = timeSlot;
    arr.splice(id, 1);

    setTimeSlot([...arr]);
  };

  const uploadJob = (e) => {
    e.preventDefault();
    let act = e.target.action.split("/")
    console.log(act[act.length - 1])
    if (act[act.length - 1] === "date") {

      return
    } else {

      if (timeSlot.length === 0) {
        setTimeAlert(!timeAlert);
      } else {
        const data = {
          estimateType: estimateType[estimate],
          paymentMethod: payment,
          userId: userData.uid,
          submitDate: currDate,
          category: category,
          description: desc,
          address: address,
          image: imgLink,
          time: timeSlot,
          city: city,
          lang: long,
          lat: lat,
          status: "pending",
        };

        addDocument("jobs", data)
          .then(() => {
            setShowSnackbar(true);
            setTimeout(() => navigate("/consumer/pending-service"), 2500);
          })
          .catch((err) => console.log(err));
      }
    }

  };

  const getSuggestions = (str) => {
    const url = `https://place-suggestion.onrender.com/suggestions?place=${str}`;

    fetch(url)
      .then((res) => res.json())
      .then((response) => setSuggestions(response))
      .catch((err) => console.log(err));
  };

  const getLatLng = (placeId) => {
    const url = `https://place-suggestion.onrender.com/getPosition?placeId=${placeId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLat(data.lat);
        setLong(data.lng);
      })
      .catch((err) => console.log(err));
  };

  function ImageGrid({ res }) {
    console.log(res);
    const [popup, setPopup] = useState(false);

    return (
      <>
        <img
          className={style.inner_img}
          src={res ? res : imgPlaceholder}
          onClick={() => setPopup(res == undefined ? false : true)}
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
        <ConsumerSubHead page="new-service-request" />
      </Container>
      <Container className={style.parent_container}>
        <form onSubmit={e => uploadJob(e)}>
          <Grid container spacing={2}>
            <Grid item md={5} className={style.child_container}>
              <Typography variant="h5">
                <b>1. SPECIFICATIONS</b>
              </Typography>
              <br />
              <Typography variant="h6">
                <b>
                  Category <sup>*</sup>
                </b>
              </Typography>
              <br />
              <FormControl
                fullWidth
                required
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  bgcolor: "lightBlue",
                }}
              >
                <Select
                  value={category}
                  sx={{ borderRadius: 2 }}
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                >
                  {data.map((e, index) => {
                    return (
                      <MenuItem value={e} key={index}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <br />
              <br />
              <Typography variant="h6">
                <b>
                  Estimate Type <sup>*</sup>
                </b>
              </Typography>
              <br />
              <Grid container spacing={2}>
                {estimateType.map((e, index) => {
                  const data = e.split(" ");
                  return (
                    <Grid item md={6} key={index}>
                      <Button
                        variant="contained"
                        onClick={() => setEstimate(index)}
                        color={estimate === index ? "themeYellow" : "secondary"}
                        fullWidth
                      >
                        <b>
                          {data[0]}
                          <br />
                          {data[1]}
                        </b>
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
              <br />
              <br />
              <TextField
                label="Job Description"
                placeholder="Fill Description of job requirements here"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                fullWidth
                multiline
                required
              />
              <br />
              <br />
              <Typography variant="h6">
                <b>
                  Enter Time Slot <sup>*</sup>
                </b>
              </Typography>
              {timeSlot.map((e, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mt: 1,
                      mb: 1,
                      borderRadius: 2,
                      position: "relative",
                      backgroundColor: "yellow",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        right: "5px",
                        top: "5px",
                        zIndex: 2,
                      }}
                    >
                      <IconButton onClick={() => removeTimeSlot(index)}>
                        <Close color="primary" />
                      </IconButton>
                    </Box>
                    <Typography>
                      <b>Date :</b> &nbsp; {e.date}
                    </Typography>
                    <Typography>
                      <b>From :</b> &nbsp; {e.startTime}
                      &nbsp; &nbsp;
                      <b>To :</b> &nbsp; {e.endTime}
                    </Typography>
                  </Box>
                );
              })}
              <Button
                variant="contained"
                color="themeYellow"
                onClick={() => setTimePopup(true)}
              >
                <Typography variant="h5">
                  <b>+</b>
                </Typography>
              </Button>
              <Modal open={timePopup}>
                <Container
                  sx={{
                    mt: 5,
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <form action="date" onSubmit={addTimeSlots}>
                    <div
                      className={style.pop_up}
                      style={{ backgroundColor: "white", padding: "30px" }}
                    >
                      <IconButton
                        onClick={() => setTimePopup(false)}
                        sx={{ ml: 40 }}
                      >
                        <Close color="primary" />
                      </IconButton>
                      <Typography>
                        <b>Select Date and Time</b>
                      </Typography>
                      <br />
                      <br />
                      <TextField
                        type="date"
                        value={date}
                        inputProps={{ min: newDate }}
                        onChange={(e) => setDate(e.target.value)}
                        fullWidth
                        required
                      />
                      <br />
                      <br />
                      <Grid container spacing={1}>
                        <Grid item md={6} xs={12}>
                          <Typography>Start Time</Typography>
                          <TextField
                            type="time"
                            required
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Typography>End Time</Typography>
                          <TextField
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            fullWidth
                            required
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <br />
                      <Button
                        variant="contained"
                        color="themeYellow"
                        type="submit"
                        value="date"
                        // onClick={addTimeSlots}
                        fullWidth
                      >
                        <b>Submit</b>
                      </Button>
                    </div>
                  </form>
                </Container>
              </Modal>
              <br />
              <br />
              <Typography variant="h6">
                <b>Photos</b>
              </Typography>
              <br />

              <div className={style.top_box}>
                <div className={style.image_upload}>
                  <img
                    onClick={() => imgBtn.current.click()}
                    src="/images/placeholder.png"
                    alt="Upload Image"
                  />

                  <input
                    type="file"
                    ref={imgBtn}
                    accept="image/*"
                    onChange={(e) => {
                      uploadImage(e.target.files[0])
                        .then((res) => {
                          setImgLink([...imgLink, res]);
                          console.log([...imgLink]);
                        })
                        .catch((err) => console.log(err));
                    }}
                  />
                </div>
                <div className={style.top_box_inner}>
                  <ImageGrid res={imgLink[0]} />
                  <ImageGrid res={imgLink[1]} />
                  <ImageGrid res={imgLink[2]} />
                  <ImageGrid res={imgLink[3]} />
                </div>
              </div>

              <br />
              <Typography variant="h5">
                <b>2. PAYMENT & CONTACT</b>
              </Typography>
              <br />
              <Typography variant="h6">
                <b>Payment Method</b>
              </Typography>
              <br />
              <Grid container spacing={1}>
                {paymentMethods.map((e, index) => {
                  return (
                    <Grid item md={6} key={index}>
                      <Box
                        sx={{
                          p: 1,
                          width: "100%",
                          borderRadius: 1,
                          backgroundColor: "yellow",
                        }}
                      >
                        <FormControlLabel
                          label={e}
                          control={
                            <Checkbox
                              onChange={(r) => addPaymentMethods(index, r)}
                            />
                          }
                        />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
              <br />
              <Typography variant="h6">
                <b>
                  Current Address <sup>*</sup>
                </b>
              </Typography>
              <br />
              <Autocomplete
                options={suggestions}
                value={address}
                onChange={(e, val) => {
                  setAddress(val.label);
                  getLatLng(val.placeId);
                }}
                required
                fullWidth
                renderInput={(params) => (
                  <TextField
                    label="Address"
                    {...params}
                    multiline
                    rows={3}
                    onChange={(e) => getSuggestions(e.target.value)}
                    placeholder="Enter Your Location"
                  />
                )}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="themeYellow"
                value="submit"
                type="submit"
                fullWidth
              >
                <b>SUBMIT SERVICE REQUEST</b>
              </Button>
              <br />
              <br />
            </Grid>
            <Grid item md={7}>
              <iframe
                className={style.iframe_map}
                src={`https://maps.google.com/maps?q=${lat},${long}&hl=es;&output=embed`}
              ></iframe>
            </Grid>
          </Grid>
        </form>

        <Snackbar
          open={timeAlert}
          autoHideDuration={2500}
          onClose={() => setTimeAlert(!timeAlert)}
        >
          <Alert
            severity="error"
            sx={{ width: "100%" }}
            onClose={() => setTimeAlert(!timeAlert)}
          >
            Select a Time Slot
          </Alert>
        </Snackbar>

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
            Job Posted Successfully
          </Alert>
        </Snackbar>
      </Container>
      <MobileFooter yellow="yellow" />
    </>
  );
};
