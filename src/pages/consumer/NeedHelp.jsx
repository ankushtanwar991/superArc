import { useState } from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import data from "../../data/needHelp.json";
import MobileFooter from "../../components/MobileFooter";
import { Container, Box, Typography } from "@mui/material";
import { ConsumerSubHead } from "../../components/ConsumerSubHead";

export const NeedHelp = () => {
  const [sub, setSub] = useState("");
  const [show, setShow] = useState("home");

  return (
    <>
      <Container>
        <ConsumerSubHead page="new-service-request" />
      </Container>

      <Container sx={{ textAlign: "center", padding: "0 0 80px 0" }}>
        <Typography variant="h3">
          <b>I NEED HELP WITH...</b>
        </Typography>
        <br />
        <br />
        <div className={style.grid_sec}>
          {data.map((e, index) => {
            return (
              <div key={index} className={style.grid_item}>
                <br />
                <Typography variant="h5">
                  <b>{e.heading}</b>
                </Typography>
                <br />
                {show === e.heading ? (
                  <>
                    <div
                      className={`${style.comp_inner} ${`image_${index}`}`}
                      onClick={() => {
                        setShow("");
                        setSub("");
                      }}
                    ></div>
                    <div className={style.main_list}>
                      <div className={style.inner_list}>
                        {e.section.map((ele, indx) => {
                          return (
                            <Box key={indx}>
                              <Typography onClick={() => setSub(ele.name)}>
                                {ele.name}
                              </Typography>
                              {sub === ele.name ? (
                                <div
                                  className={`${style.nested_list} ${style.inner_SubList}`}
                                >
                                  {ele.category.map((el, inx) => {
                                    return (
                                      <Link
                                        key={inx}
                                        to={`/consumer/post-job/${e.heading}`}
                                        state={{ from: `${ele.name} > ${el}` }}
                                      >
                                        <Typography>
                                          <img
                                            src={`/icons/${e.heading}${indx}${inx}.png`}
                                            className={style.icon_img}
                                            alt="Icon"
                                          />
                                          {el}
                                        </Typography>
                                      </Link>
                                    );
                                  })}
                                </div>
                              ) : (
                                <></>
                              )}
                            </Box>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    className={`${style.inner} ${`image_${index}`}`}
                    onClick={() => setShow(e.heading)}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
      <MobileFooter yellow="yellow" />
    </>
  );
};
