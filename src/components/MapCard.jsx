import style from "./style.module.css";
import { Link } from "react-router-dom";
import { Box, Typography, Avatar, Rating } from "@mui/material";

export const MapCard = ({
  id,
  img,
  date,
  days,
  name,
  rate,
  category,
  showData,
  estimate
}) => {

  return (
    <>
      {showData ? (
        <Link to={`/contractor/open-service/${id}`}>
          <div className={style.map_card}>
            <Typography color="blue">
              <b>{category}</b>
            </Typography>
            <Box mt={2} display="flex" alignItems="center">
              <Avatar
                style={{
                  height: "2.5rem",
                  width: "2.5rem",
                }}
                src={img}
              />
              <Box textAlign="left" ml={2}>
                <Typography>
                  <b>{name || "No Name"}</b>
                </Typography>
                <Rating value={rate} />
              </Box>
            </Box>
            <Typography className={style.card_text} py={1} my={2}>Current Estimates: {estimate}</Typography>
            {/* <Typography sx={{ color: "blue" }}>Submitted on {date}</Typography> */}
          </div>
        </Link>
      ) : (
        <>
          {days < 7 ? (
            <>
              {days <= 0 ? (
                <img
                  style={{ height: "38px", width: "26px" }}
                  src="/icons/red.png"
                  alt="Map Icon"
                />
              ) : (
                <img
                  style={{ height: "38px", width: "26px" }}
                  src="/icons/yellow.png"
                  alt="Map Icon"
                />
              )}
            </>
          ) : (
            <img
              style={{ height: "38px", width: "26px" }}
              src="/icons/green.png"
              alt="Map Icon"
            />
          )}
        </>
      )}
    </>
  );
};
