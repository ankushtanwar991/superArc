import { Link, useNavigate } from "react-router-dom";

import { ArrowBack } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, IconButton, Popper, Fade, Button, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { ReadContext } from "../Context";
import { getDocumentData } from "../firebase";
import { EmailAccessToggle } from "./EmailAccessToggle";

export const MobileHeader = () => {
  const city = localStorage.getItem("city");
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { userData } = ReadContext();
  const [photo, setPhoto] = useState("")
  const navigate = useNavigate()


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);

  };
  const profileSwitch = (e) => {
    console.log(e.target.textContent)
    if (e.target.textContent == 'Customer') {
      navigate('/profile/consumer-profile')
      setOpen(false)
    } else if (e.target.textContent == 'Contractor') {
      navigate('/profile/contractor-profile')
      setOpen(false)
    }

  }

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  let { userAuth } = ReadContext()


  const getData = () => {
    if (userData.uid !== undefined) {

      getDocumentData("users", userData.uid).then(res => {
        if (res !== undefined) {
          if (res.photo === undefined) {
            setPhoto("");
          } else {
            setPhoto(res.photo)
          }
        }

      }).catch(e => console.log(e))
    }
  }
  useEffect(() => {
    getData()

  }, [userData])

  return (
    <>
      <AppBar position="sticky" color="themeWhite" sx={{ pb: 1, zIndex: '10', }}>
        <div
          className={style.topbar}
        >
          {/* {userAuth ?
            <Typography>
              Location : <b>{city}</b>
            </Typography> : null} */}
        </div>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton>
            <ArrowBack onClick={() => window.history.back()} />
          </IconButton>

          <Link to="/">
            <img
              style={{ height: "3rem" }}
              src="/images/SuperLogo.png"
              alt="Logo"
            />
          </Link>

          {userAuth ?

            <div>
              <div style={{ display: 'flex' }}>

                <div>

                  <EmailAccessToggle />

                </div>
                <div>

                  <span onClick={handleClick}>
                    <Avatar
                      style={{ height: "2.5rem" }}
                      src={photo}
                      alt="Avatar"
                    />
                  </span>
                </div>

              </div>


              <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Box sx={{ border: 1, py: 2, bgcolor: 'background.paper', mt: 2 }}>
                      <span>
                        <span style={{ margin: '10px', cursor: 'pointer' }} onClick={(e) => profileSwitch(e)} className={style.btn1}>Customer</span>
                        <span style={{ margin: '10px', cursor: 'pointer' }} onClick={(e) => profileSwitch(e)} className={style.btn}>Contractor</span>
                      </span>
                    </Box>
                  </Fade>
                )}
              </Popper>
            </div> : null}


        </Toolbar>
      </AppBar>
      <br />
      <br />
    </>
  );
};
