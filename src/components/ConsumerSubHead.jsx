import style from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { EmailAccessToggle } from "./EmailAccessToggle";

export const ConsumerSubHead = ({ page }) => {
  const navigate = useNavigate()
  console.log(page)

  return (
    <div className={style.tab_sec} >
      <Link to="/consumer/need-help">
        <div
          className={
            page == "new-service-request"
              ? style.tab_one_selected
              : style.tab_one
          }
        >
          <Typography>
            <b className={style.header_text_size}>New Service Request</b>
          </Typography>
        </div>
      </Link>
      <Link to="/consumer/pending-service">
        <div
          className={
            page == "pending-service" ? style.tab_two_selected : style.tab_two
          }
          onClick={() => navigate("/consumer/pending-service")}
        >
          <Typography>
            <b className={style.header_text_size}>Pending Estimates</b>
          </Typography>
        </div>
      </Link>
      <Link to="/consumer/approved-service">
        <div
          className={
            page == "approved-service"
              ? style.tab_three_selected
              : style.tab_three
          }
          onClick={() => navigate("/consumer/approved-service")}

        >
          <Typography>
            <b className={style.header_text_size}>Approved Estimates</b>
          </Typography>
        </div>
      </Link>
      {/* <EmailAccessToggle /> */}
    </div>
  );
};
