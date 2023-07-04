import {
  Box,
  Drawer,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import React from "react";
import style from "./style.module.css";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Twitter, Facebook, Instagram, Close, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userLogout } from "../firebase";

export default function MobileFooter({ yellow, blue }) {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className={style.footer}>
        <Grid
          container
          py={2}
          px={2}
          sx={{
            // marginTop:"400px",
            display: "flex",
            justifyContent: "space-between",
            position: "fixed",
            bottom: "0",
            background: "white",
            boxShadow: "0 0 5px 0 #888888",
            zIndex: "2222",
          }}
        >
          <Grid item>
            <IconButton onClick={() => setActive(!active)}>
              {active ? <Close /> : <Menu />}
            </IconButton>
          </Grid>
          <Box display="flex">
            <Link to="">
              <IconButton>
                <Twitter />
              </IconButton>
            </Link>
            <Link to="">
              <IconButton>
                <Facebook />
              </IconButton>
            </Link>
            <Link to="">
              <IconButton>
                <Instagram />
              </IconButton>
            </Link>
          </Box>
          <Grid item>
            <LogoutIcon
              sx={{ fontSize: "30px" }}
              onClick={() => userLogout()}
            />
          </Grid>
        </Grid>
      </div>
      <Drawer
        sx={{
          position: "relative",
          width: "225px",

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
            <ListItemButton>
              <ListItemText primary="About" />
            </ListItemButton>
          </Link>
          <Link to="/faq">
            <ListItemButton>
              <ListItemText primary="FAQ" />
            </ListItemButton>
          </Link>
          <Link to="/terms">
            <ListItemButton>
              <ListItemText primary="Terms" />
            </ListItemButton>
          </Link>
          <Link to="/contact">
            <ListItemButton>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </Link>
          <Link to="/privacy">
            <ListItemButton>
              <ListItemText primary="Privacy Policy" />
            </ListItemButton>
          </Link>
        </List>
      </Drawer>
    </>
  );
}
