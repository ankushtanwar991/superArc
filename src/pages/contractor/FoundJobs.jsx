import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LocationOn } from "@mui/icons-material";
import MobileFooter from "../../components/MobileFooter";
import { getMatchingData } from "../../firebase";
import { ContractorSubHead } from "../../components/ContractorSubHead";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { ReadMore } from "../../services/readMore";

export const FoundJobs = () => {
  const location = useLocation();
  const [arr, setArr] = useState([]);

  const city = (s) => {
    let r = s.split(",");
    return(r[r.length - 3] + "," + r[r.length - 2]);
  }
  useEffect(() => {
    getMatchingData("jobs", "status", "==", "pending")
      .then((res) => setArr(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Container>
        <ContractorSubHead page="open-service-request" />
        <br />
        <Grid container spacing={2}>
          {location.state.length === 0
            ? arr.map((e, index) => {
              return (
                <Grid key={index} item md={4}>
                  <Box sx={{ p: 2, boxShadow: 5, borderRadius: 2 }}>
                    <Typography
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {city(e.address)} &nbsp; <LocationOn />
                    </Typography>
                    <br />
                    <Typography>
                      <b>{e.category}</b>
                    </Typography>
                    <br />
                    <Typography>
                      <b>JOB DESCRIPTION</b>
                    </Typography>
                    <Typography sx={{ textAlign: "justify" }}>
                      <ReadMore>{e.description}</ReadMore>
                    </Typography>
                    <br />
                    <Link to={`/contractor/open-service/${e.id}`}>
                      <Button variant="outlined" color="primary" fullWidth>
                        View
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              );
            })
            : location.state.map((e, index) => {
              return (
                <Grid key={index} item md={4}>
                  <Box sx={{ p: 2, boxShadow: 5, borderRadius: 2 }}>
                    <Typography
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {e.address} &nbsp; <LocationOn />
                    </Typography>
                    <br />
                    <Typography>
                      <b>{e.category}</b>
                    </Typography>
                    <br />
                    <Typography>
                      <b>Job Description</b>
                    </Typography>
                    <br />
                    <Typography sx={{ textAlign: "justify" }}>
                      <ReadMore>{e.description}</ReadMore>
                    </Typography>
                    <br />
                    <Link to={`/contractor/open-service/${e.id}`}>
                      <Button variant="outlined" color="primary" fullWidth>
                        View
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Container>
      <MobileFooter blue="blue" />
    </>
  );
};
