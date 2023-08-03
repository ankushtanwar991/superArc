import moment from "moment";
import { useEffect, useState } from "react";
import { ReadContext } from "../../Context";
import GoogleMapReact from "google-map-react";
import { useNavigate } from "react-router-dom";
import { MapCard } from "../../components/MapCard";
import filterData from "../../data/filterCategory.json";
import MobileFooter from "../../components/MobileFooter";
import InputAdornment from "@mui/material/InputAdornment";
import { getCollectionData, getDocumentData, getMatchingData, deleteDocument } from "../../firebase";
import { ContractorSubHead } from "../../components/ContractorSubHead";
import {
  Close,
  Search,
  ExpandMore,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  Button,
  Checkbox,
  Accordion,
  Container,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
  OutlinedInput,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
} from "@mui/material";

export const OpenService = () => {
  const navigate = useNavigate();

  const { posLat } = ReadContext();
  const { posLong } = ReadContext();

  const [aa, setAa] = useState([]);

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [cardIndex, setCardIndex] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [estimates, setEstimates] = useState("")
  const [action, setAction] = useState(false)

  const avgRate = (rev) => {
    if (rev !== undefined) {
      const counts = rev.length;
      let sum = 0;
      rev.map((e) => {
        sum = sum + Number(e.rate);
      });
      const rate = Math.round(sum / counts);
      return rate;
    }
  };

  const getEstimate = (id) => {
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
  }
  const getData = () => {
    getCollectionData("jobs")
      .then((res) => {
        let arr = [];
        res.map((e) => {
          // let dayy = e.time.map(e => new Date(e.date))
          let dayy = e.time.map(e => moment(e.date))
          const max = moment(Math.max(...dayy))
          console.log();
          let nearestDate;

          dayy.forEach(date => {
            let diff = date.diff(moment(), 'days');
            if (diff >= 0) {
              if (nearestDate) {
                if (date.diff(nearestDate, 'days') < 0) {
                  nearestDate = diff;
                }
              } else {
                nearestDate = diff;
              }
            } else {
              nearestDate = max.diff(moment(), "days")
            }
          });
          getDocumentData("users", e.userId).then((r) => {
            console.log(r)
            let obj;
          if(r!==undefined){

            obj = {
              category: e.category,
              submitDate: moment
                .unix(e.submitDate.seconds)
                .format("Do MMM YYYY"),
              daysAgo: nearestDate,
              userName: r.userName ? r.userName : "",
              description: e.description,
              city: e.city,
              lang: e.lang,
              lat: e.lat,
              id: e.id,
              photo: r.photo || "",
              rate: r.review !== undefined ? avgRate(r.review) : 0,
              status: e.status,
            };
            arr.push(obj);
            if (obj.daysAgo < -14) {
              getMatchingData("offers", "jobId", "==", obj.id).then(res => {
                res.forEach(e => deleteDocument("offers", e.id))
              })
              deleteDocument("jobs", obj.id);
            }
            if (obj.status === "pending" && obj.daysAgo >= -14) {
              setJobs((jobs) => [...jobs, obj]);
            }
          }

          });
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  var jobss = [];
  const click = (ch, job) => {
    let join = ch + " " + job;
    let index = jobss.indexOf(join);
    if (index === -1) {
      jobss.push(join);
    } else {
      jobss.pop(index);
    }
  };

  const searchs = () => {
    const value = search.toLowerCase();

    if (aa.length === 0) {

      var data = [];
      let s = jobs.map((e) => {
        if (e.city !== null) {
          let city = e.city.toLowerCase().split(", ")[0].trim();
          if (city === value) {
            data.push(e);
          }
        }
      });
      setAction(true)
      setAa(data);
    } else {

      let filtering = [];

      // let s = jobs.map((e) => {
      //   if (e.city !== null) {
      //     let city = e.city.toLowerCase().split(", ")[0].trim();
      //     if (city === value) {
      //       filtering = aa.filter((e) => {
      //         let area = e.city.toLowerCase().split(", ")[0].trim();
      //         return area === city;
      //       });
      //     }
      //   }
      // });
      // console.log(filtering);
      // setAa(filtering);
    }
  };

  let arr = [];

  const filters = (e) => {
    if (e.target.checked) {

      const a = jobs.forEach((e, i) => {
        var ch = e.category.split(" > ")[0] + " " + e.category.split(" > ")[2];
        if (jobss.indexOf(ch) !== -1) {
          arr.push(e);
        }
      });

      setAction(true)
      setAa([...aa, ...arr]);
    } else {
      let rr = [];

      const a = jobs.forEach((e, i) => {
        var ch = e.category.split(" > ")[0] + " " + e.category.split(" > ")[2];
        if (jobss.indexOf(ch) !== -1) {
          rr.push(e);
        }
      });

      let rr2 = [...aa];
      let yy = [];

      rr2.forEach((res) => {
        if (rr.findIndex((e) => e.category == res.category) == -1) {
          yy.push(res);
        }
      });
      
      setAa(yy);
    }
  };



  return (
    <>
      <div style={{ overflowX: "hidden" }}>
        <Grid container>
          <Container sx={{ width: "100%" }}>
            <ContractorSubHead page="open-service-request" />
          </Container>
          <Grid
            container
            sx={{ backgroundColor: "lightblue", display: "flex", px: 1 }}
            mt={1}
          >
            <Grid container>
              <Grid items md={3} xs={5}>
                <Box sx={{ mr: 2 }}>
                  <FormControl sx={{ my: 1, width: "100%" }} variant="outlined">
                    <InputLabel>Search</InputLabel>
                    <OutlinedInput
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <Search
                            value={search}
                            onClick={(e) => searchs()}
                            sx={{ cursor: "pointer" }}
                          />
                        </InputAdornment>
                      }
                      label="Search"
                    />
                  </FormControl>
                </Box>
              </Grid>

              <Grid item md={2} xs={4}>
                <Button
                  sx={{ height: "55px", marginTop: "10px" }}
                  onClick={() => setShowFilter(!showFilter)}
                  variant="outlined"
                  color="primary"
                >
                  <b>Filter</b>
                  <KeyboardArrowDown />
                </Button>
              </Grid>

              <Grid item xs={3}>
                <Button
                  sx={{ height: "55px", marginTop: "10px", padding: "5px" }}
                  onClick={() =>
                    navigate("/contractor/found-jobs", { state: aa })
                  }
                  variant="contained"
                  color="success"
                >
                  Found {aa.length >= 0 && action === true ? aa.length : jobs.length} Jobs
                </Button>
              </Grid>
            </Grid>
            {showFilter ? (
              <Box
                sx={{
                  zIndex: "3333",
                  left: "3rem",
                  boxShadow: 5,
                  width: "78%",
                  borderRadius: 1,
                  position: "absolute",
                  backgroundColor: "white",
                  mt: 10,
                }}
              >
                <Box textAlign="right">
                  <IconButton onClick={() => setShowFilter(!showFilter)}>
                    <Close />
                  </IconButton>
                </Box>
                <FormControl>
                  <Grid container>
                    {filterData.map((item, index) => {
                      return (
                        <Grid key={index} item md={4} xs={12} py={1}>
                          <Accordion sx={{ width: "100%" }}>
                            <AccordionSummary
                              expandIcon={<ExpandMore />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography sx={{ fontSize: "18px" }}>
                                <b>{item.category}</b>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {item.data.map((el, index) => {
                                return (
                                  <Box sx={{ width: "100%" }}>
                                    <Typography sx={{ width: "100%" }}>
                                      <b>{el.subCategory}</b>
                                    </Typography>
                                    {el.data.map((e, inx) => {
                                      return (
                                        <Box key={inx}>
                                          <FormControlLabel
                                            sx={{
                                              fontWeight: "500",
                                              color: "black",
                                            }}
                                            label={e}
                                            control={
                                              <Checkbox
                                                onChange={(s) => {
                                                  // itemClick(s,inx)
                                                  click(item.category, e);
                                                  filters(s);
                                                }}
                                                color="success"
                                                sx={{ height: "10px" }}
                                              />
                                            }
                                          />
                                        </Box>
                                      );
                                    })}
                                  </Box>
                                );
                              })}
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                      );
                    })}
                  </Grid>
                </FormControl>
              </Box>
            ) : (
              <></>
            )}
          </Grid>
          <Grid container mt={2} sx={{display:'flex',justifyContent:'center', height: "65vh"}}>
            <Box
              sx={{ width: "100vw" }}
              onClick={() => {

                if (cardIndex != "") {
                  setCardIndex("");
                }
              }}
            >
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBCloz5P5UwYCxbxCgFd7B3bi0AZLAg5CE",
                }}
                defaultZoom={15}
                defaultCenter={{
                  lat: posLat,
                  lng: posLong,
                }}
              >
                <Box lat={35.08782} lng={-89.89059}>
                  <img
                    style={{ height: "32px", width: "20px" }}
                    src="/icons/ace-logo.png"
                    alt="Ace Logo"
                  />
                </Box>
                {aa.length >= 0 && action === true
                  ? aa.map((e, index) => {
                    return (
                      <Box
                        lat={e.lat}
                        lng={e.lang}
                        onClick={() => { setCardIndex(index + 1); getEstimate(e.id); }}
                      >
                        <MapCard
                          id={e.id}
                          key={index}
                          img={e.photo}
                          rate={e.rate}
                          days={e.daysAgo}
                          name={e.userName?e.userName:""}
                          date={e.submitDate}
                          estimate={estimates}
                          category={e.category}
                          showData={cardIndex == index + 1 ? true : false}
                        />
                      </Box>
                    );
                  })
                  : jobs.map((e, index) => {
                    return (
                      <Box
                        lat={e.lat}
                        lng={e.lang}
                        onClick={() => { setCardIndex(index + 1); getEstimate(e.id) }}
                      >
                        <MapCard
                          id={e.id}
                          key={index}
                          img={e.photo}
                          rate={e.rate}
                          days={e.daysAgo}
                          name={e.userName?e.userName:""}
                          date={e.submitDate}
                          estimate={estimates}
                          category={e.category}
                          showData={cardIndex == index + 1 ? true : false}
                        />
                      </Box>
                    );
                  })}
              </GoogleMapReact>
            </Box>
          </Grid>
        </Grid>
      </div>
      <MobileFooter blue="blue" />
    </>
  );
};
