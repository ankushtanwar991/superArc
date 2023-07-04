import { useEffect } from "react";
import { ReadContext } from "../../Context";
import { updateDocument } from "../../firebase";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Grid ,Button,makeStyles} from "@mui/material";
import "./style.css"
export const Receipt = () => {


  const jobId = localStorage.getItem("jobId")
  const todayDate = new Date();
  const navigate = useNavigate();
  const { userData } = ReadContext();
  const [paramsData] = useSearchParams();
  useEffect(() => {

    if (paramsData.get("x_response_code") === "1") {
      const data = {
        isActive: true,
        payDate: new Date(),
        show: true,
        payments:{
          date: `${todayDate}`,
          firstName: paramsData.get("x_first_name"),
          lastName: paramsData.get("x_last_name"),
          cardNumber: paramsData.get("x_account_number"),
          paymentMethod: paramsData.get("x_card_type"),
        }
      };

      updateDocument("users", userData.uid, data)
      // .then(() => {
      //   setTimeout(() => {
      //     navigate(`/contractor/open-service/${jobId}`);
      //   }, 1500);
      // });
    } else {
      console.log("Response Code Not Found");
    }
  }, [userData]);

  return (
    <>
      <Container>
        <Box boxShadow={4} p={4} marginY={4} borderRadius={4}>
       
          <br />
          <Typography variant="h5">
            <b>Thank You For Your Order!</b>
          </Typography>
          <br />
          <hr />
          <br />
          <Typography bgcolor="gray" p={1} color="white">
            <b>Order Information</b>
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              Merchant
            </Grid>
            <Grid item xs={2}>
              <b>:</b>
            </Grid>
            <Grid item xs={6}>
              ServiceArc
            </Grid>
            <Grid item xs={4}>
              Date/Time
            </Grid>
            <Grid item xs={2}>
              <b>:</b>
            </Grid>
            <Grid item xs={6}>
              {`${todayDate}`}
            </Grid>
            <Grid item xs={4}>
              Name
            </Grid>
            <Grid item xs={2}>
              <b>:</b>
            </Grid>
            <Grid item xs={6}>
              {`${paramsData.get("x_first_name")} ${paramsData.get(
                "x_last_name"
              )}`}
            </Grid>
          </Grid>
          <br />
          <hr />
          <br />
          <Grid container spacing={2}>
            <Grid item md={2}>
              <b>Item</b>
            </Grid>
            <Grid item md={2}>
              <b>Description</b>
            </Grid>
            <Grid item md={2}>
              <b>Qty</b>
            </Grid>
            <Grid item md={2}>
              <b>Taxable</b>
            </Grid>
            <Grid item md={2}>
              <b>Unit Price</b>
            </Grid>
            <Grid item md={2}>
              <b>Item Total</b>
            </Grid>
            <Grid item md={2}>
              ServiceArc
            </Grid>
            <Grid item md={2}>
              ServiceArc
            </Grid>
            <Grid item md={2}>
              1
            </Grid>
            <Grid item md={2}>
              N
            </Grid>
            <Grid item md={2}>
              $ {paramsData.get("x_amount")} (USD)
            </Grid>
            <Grid item md={2}>
              $ {paramsData.get("x_amount")} (USD)
            </Grid>
          </Grid>
          <br />
          <hr />
          <br />
          <Typography textAlign="right">
            <b>Total : $ {paramsData.get("x_amount")} (USD)</b>
          </Typography>
          <br />
          <Typography bgcolor="gray" p={1} color="white">
            <b>Card Details</b>
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              Date/Time
            </Grid>
            <Grid item xs={2}>
              <b>:</b>
            </Grid>
            <Grid item xs={6}>
              {`${todayDate}`}
            </Grid>
            <Grid item xs={4}>
              Catalog Link ID
            </Grid>
            <Grid item xs={2}>
              <b>:</b>
            </Grid>
            <Grid item xs={6}>
              {paramsData.get("x_catalog_link_id")}
            </Grid>
            <Grid item xs={4}>
              Card Number
            </Grid>
            <Grid item xs={2}>
              <b>:</b>
            </Grid>
            <Grid item xs={6}>
              {paramsData.get("x_account_number")}
            </Grid>
            <Grid item xs={4}>
              Payment Method
            </Grid>
            <Grid item xs={2}>
              <b>:</b>
            </Grid>
            <Grid item xs={6}>
              {paramsData.get("x_card_type")}
            </Grid>
          </Grid>
          <br/>
          <br/>
         <div className="buttondiv" >
          
        <Button variant="contained" className="butt"  onClick={()=>navigate(`/contractor/open-service/${jobId}`)}>Back to offer page</Button>
         </div>
        </Box>
      </Container>
    </>
  );
};
