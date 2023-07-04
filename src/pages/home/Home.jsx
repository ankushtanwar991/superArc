import style from "./style.module.css";
import { useEffect, useState } from "react";
import { ReadContext } from "../../Context";
import { Link, useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import MobileFooter from "../../components/MobileFooter";
import { Twitter, Facebook, Instagram } from "@mui/icons-material";
import {
  Box,
  Alert,
  Modal,
  Button,
  Snackbar,
  Container,
  IconButton,
  Typography,
} from "@mui/material";

export const Home = () => {

  const theme = useTheme();
  const isMatch = useMediaQuery('(max-width:500px)');

  const navigate = useNavigate();
  const { userData } = ReadContext();

  const [value, setValue] = useState({});
  const [open, setOpen] = useState(false);
  const [verify, setVerify] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const actionData = () => {
    if (value.displayName !== undefined) {
      handleClickOpen();
    } else {
      console.log("dadas");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (userData.emailVerified === false) {
      setShowAlert(true);
    }

    setVerify(userData.emailVerified);
    setValue(userData);
  }, [userData]);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(!open)}>
        <Container
          maxWidth="md"
          sx={{
            p: 5,
            mt: 10,
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h5">
            Please verify your email to continue.
          </Typography>
          <br />
          <br />
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setOpen(!open)}
          >
            <Typography>
              <b>Close</b>
            </Typography>
          </Button>
        </Container>
      </Modal>

      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        {verify || value.displayName === undefined ? (
          <>
            <div className={style.grid_sec}>
              <Link to="/consumer/need-help">
                <div className={style.left}>
                  <Typography variant="h5">
                    <b>CUSTOMER</b>
                  </Typography>
                </div>
              </Link>
              <Link to="/contractor/open-service">
                <div className={style.right}>
                  <Typography variant="h5" color="white">
                    <b>CONTRACTOR</b>
                  </Typography>
                </div>
              </Link>
            </div>
            <div></div>
          </>
        ) : (
          <>
            <div className={style.grid_sec}>
              <Link to="">
                <div className={style.left} onClick={() => actionData()}>
                  <Typography variant="h5">
                    <b>CUSTOMER</b>
                  </Typography>
                </div>
              </Link>
              <Link to="">
                <div className={style.right} onClick={() => actionData()}>
                  <Typography variant="h5" color="white">
                    <b>CONTRACTOR</b>
                  </Typography>
                </div>
              </Link>
            </div>
            <div></div>
          </>
        )}
        {localStorage.getItem("userData") ? (<></>) : (<>
          {/*  */}
        </>)}
      </Container>

      {isMatch ? (
        <></>
      ) : (
        <Box
          p={2}
          display="flex"
          justifyContent="center"


          left="50%"
          right="50%"

        >
          <Link to="">
            <IconButton>
              <Twitter />
            </IconButton>
          </Link>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Link to="">
            <IconButton>
              <Facebook />
            </IconButton>
          </Link>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Link to="">
            <IconButton>
              <Instagram />
            </IconButton>
          </Link>
        </Box>
      )}

      <MobileFooter />

      <Snackbar
        open={showAlert}
        autoHideDuration={2500}
        onClose={() => setShowAlert(!showAlert)}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setShowAlert(!showAlert)}
        >
          <Typography>
            <b>Please Verify Your Email</b>
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
};
