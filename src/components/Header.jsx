import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReadContext } from "../Context";
import { userLogout, getDocumentData } from "../firebase";
import {
  Menu,
  Close,
  Person,
  LocationOn,
  Twitter,
  Facebook,
  Instagram,
} from "@mui/icons-material";
import {
  Box,
  List,
  Drawer,
  AppBar,
  Button,
  Divider,
  Toolbar,
  IconButton,
  Typography,
  ListItemText,
  ListItemButton,
  Popper,
  Fade,
  Avatar,
  Tooltip,
} from "@mui/material";
import style from "./style.module.css";
import { EmailAccessToggle } from "./EmailAccessToggle";

export const Header = () => {
  const { userAuth } = ReadContext();
  const { userData } = ReadContext();

  const city = localStorage.getItem("city");

  const [active, setActive] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData] = useState({});
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const getData = () => {
    getDocumentData("users", userData.uid)
      .then((res) => {
        if (res !== undefined) {
          setData(res);
        }
      })
      .catch((e) => console.log(e));
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const profileSwitch = (e) => {
    console.log(e.target.textContent);
    if (e.target.textContent == "Customer") {
      navigate("/profile/consumer-profile");
      setOpen(false);
    } else if (e.target.textContent == "Contractor") {
      navigate("/profile/contractor-profile");
      setOpen(false);
    }
  };

  useEffect(() => {
    getData();
  }, [userData]);
  useEffect(() => {
    if (data.photo === undefined) {
      setPhoto("");
    } else {
      setPhoto(data.photo);
    }
  }, [data]);
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <>
      {/* <Box
        sx={{
          p: 1,
          zIndex: 10,
          color: "white",
          display: "flex",
          position: "relative",
          backgroundColor: "gray",
          justifyContent: "flex-end",
        }}
      >
        <Typography>
          Current Location : <b>{city}</b>
        </Typography>
        &nbsp;
        <LocationOn />
      </Box> */}
      <AppBar
        open={active}
        elevation={0}
        position="sticky"
        color="themeWhite"
        sx={{ pt: 1, pb: 1 }}
      >
        <Toolbar>
          <IconButton onClick={() => setActive(!active)} sx={{ mr: 3 }}>
            {active ? <Close /> : <Menu />}
          </IconButton>
          <Link to="/" onClick={() => setActive(false)}>
            <img src="/images/logo.png" alt="Logo" style={{ height: "4rem" }} />
          </Link>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            {userAuth ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '30px' }}>

                    <EmailAccessToggle />

                  </div>
                  <div>

                    <span onClick={handleClick}>
                      <Avatar
                        style={{ height: "2.5rem", width: "2.5rem" }}
                        src={photo}
                      />
                    </span>
                  </div>
                </div>

                <Popper id={id} open={open} anchorEl={anchorEl} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Box
                        sx={{
                          border: 1,
                          py: 2,
                          bgcolor: "background.paper",
                          m: 3,
                        }}
                      >
                        <span
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{ margin: "10px", cursor: "pointer" }}
                            onClick={(e) => profileSwitch(e)}
                            className={style.btn1}
                          >
                            Customer
                          </span>
                          <span
                            style={{ margin: "10px", cursor: "pointer" }}
                            onClick={(e) => profileSwitch(e)}
                            className={style.btn}
                          >
                            Contractor
                          </span>
                          <ListItemButton onClick={() => userLogout()}>
                            <Person color="secondary" />
                            &nbsp; &nbsp;
                            <ListItemText primary="Log Out" />
                          </ListItemButton>
                        </span>
                      </Box>
                    </Fade>
                  )}
                </Popper>
              </div>
            ) : (
              // <Link to="#">
              //   <img
              //     style={{ height: "2.5rem", width: "2.5rem" }}
              //     src="/icons/user-avatar.png"
              //     alt="Avatar"
              //   />
              // </Link>
              <Link to="/login">
                {/* <Button variant="contained" color="themeYellow">
                  <b>Login</b> &nbsp; &nbsp; <Person />
                </Button> */}
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          position: "relative",
          width: "225px",
          zIndex: "5",
          "& .MuiDrawer-paper": {
            backgroundColor: "#fcfcfc",
            width: "225px",
            border: 0,
          },
        }}
        open={active}
        variant="persistent"
        anchor="left"
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <List>
          <Link to="/about">
            <ListItemButton onClick={() => setActive(false)}>
              <ListItemText primary="About" />
            </ListItemButton>
          </Link>
          <Link to="/faq">
            <ListItemButton onClick={() => setActive(false)}>
              <ListItemText primary="FAQ" />
            </ListItemButton>
          </Link>
          <Link to="/terms">
            <ListItemButton onClick={() => setActive(false)}>
              <ListItemText primary="Terms" />
            </ListItemButton>
          </Link>
          <Link to="/contact">
            <ListItemButton onClick={() => setActive(false)}>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </Link>
          <Link to="/privacy">
            <ListItemButton onClick={() => setActive(false)}>
              <ListItemText primary="Privacy Policy" />
            </ListItemButton>
          </Link>
          </List>
      </Drawer>
    </>
  );
};
