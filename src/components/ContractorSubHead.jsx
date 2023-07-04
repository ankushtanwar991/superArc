import style from "./style.module.css";
import { Link } from "react-router-dom";
import { Box, Switch, ToggleButton, Typography } from "@mui/material";
import { getDocumentData, updateDocument } from "../firebase";
import { EmailAccessToggle } from "./EmailAccessToggle";

export const ContractorSubHead = ({ page }) => {



  return (
    <div className={style.tab_sec}>
      <Link to="/contractor/open-service">
        <div
          className={
            page == "open-service-request"
              ? style.tab_one_selected
              : style.tab_one
          }
        >
          <Typography>
            <b className={style.header_text_size}>Open Service Request</b>
          </Typography>
        </div>
      </Link>
      <Link to="/contractor/accepted-service">
        <div
          className={
            page == "accepted-service" ? style.tab_two_selected : style.tab_two
          }
        >
          <Typography>
            <b className={style.header_text_size}>Pending Estimates</b>
          </Typography>
        </div>
      </Link>
      <Link to="/contractor/complete-service">
        <div
          className={
            page == "complete-service"
              ? style.tab_three_selected
              : style.tab_three
          }
        >
          <Typography>
            <b className={style.header_text_size}>Approved Estimates</b>
          </Typography>
        </div>
      </Link>
      {/* this is switch button to toggle user email accessiblity  */}
      {/* <EmailAccessToggle /> */}
    </div>
  );
};
