// import { useState } from "react";
// import { useAcceptJs, HostedForm } from "react-acceptjs";
// import {
//   Box,
//   Grid,
//   Button,
//   Select,
//   MenuItem,
//   Container,
//   TextField,
//   Typography,
//   FormControl,
//   Modal,
// } from "@mui/material";
// import { updateDocument } from "../../firebase";
// import { ReadContext } from "../../Context";
// import { useNavigate, useLocation } from "react-router-dom";

// const authData = {
//   apiLoginID: "3WKq6Th5xU",
//   clientKey: "5gQeY6nc4fuvYs2fMQn28eGmmELW6Hp3F4CjzD3nuKu6tNaWJcnF58PrZatB976q",
//   TransactionKey: "62F3Daw7zV3jZU26",
// };
export const Authorize = () => {
//   const location = useLocation();

//   const { userData } = ReadContext();
//   const navigate = useNavigate();
//   const monthNames = [
//     "01",
//     "02",
//     "03",
//     "04",
//     "05",
//     "06",
//     "07",
//     "08",
//     "09",
//     "10",
//     "11",
//     "12",
//   ];

//   const yearNames = [...Array(20)];

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [expMonth, setExpMonth] = useState("");
//   const [expYear, setExpYear] = useState("");
//   const [cardNum, setCardNum] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const [address, setAddress] = useState("");
//   const [showError, setShowError] = useState(false);
//   const [cvv, setCvv] = useState("");
//   const [show, setShow] = useState(false);
//   const { dispatchData, loading, error } = useAcceptJs({
//     environment: "PRODUCTION",
//     authData,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let cardData = {
//         cardNumber: cardNum,
//         month: expMonth,
//         year: expYear,
//         cardCode: cvv,
//         dataValue: "$5",
//         dataDescriptor: "ServiceArc payments"
//       };
//       // Dispatch CC data to Authorize.net and receive payment nonce for use on your server
//       const response = await dispatchData({ cardData });
//       console.log(response);
//       if (response.messages.message[0].text === "Successful.") {
//         updateDocument("users", userData.uid, {
//           isActive: true,
//           payDate: new Date(),
//         }).then(() => {
//           setShow(true);
//         });
//       }
//     } catch (error) {
//       setShowError(true);
//       console.log({ error: error.messages.message[0].text });
//     }
//   };
  // const handleSubmit = (response) => {
  //   console.log('Received response:', response);
  // };
  // return  <HostedForm authData={authData} onSubmit={handleSubmit} />;

  return ( <></>
    // <Box paddingBottom={15} paddingTop={15}>
    //   <Modal open={showError} onClose={() => setShowError(!showError)}>
    //     <Container
    //       // maxWidth="md"
    //       sx={{
    //         p: 8,
    //         mt: 20,
    //         backgroundColor: "white",
    //         maxWidth: 300,
    //       }}
    //     >
    //       <Typography variant="h5" textAlign="center">
    //         Enter correct card details
    //       </Typography>
    //       <br></br>
    //       <Grid item xs={4}>
    //         <Button
    //           onClick={() => setShowError(!showError)}
    //           variant="outlined"
    //           color="error"
    //           fullWidth
    //         >
    //           Cancel
    //         </Button>
    //       </Grid>
    //     </Container>
    //   </Modal>
    //   <Modal open={show} onClose={() => setShow(!show)}>
    //     <Container
    //       // maxWidth="md"
    //       sx={{
    //         p: 8,
    //         mt: 20,
    //         backgroundColor: "white",
    //         maxWidth: 300,
    //       }}
    //     >
    //       <Typography variant="h5" textAlign="center">
    //         Your Card Details Are Verify Successfully
    //       </Typography>
    //       <br></br>
    //       <Grid item xs={4}>
    //         <Button
    //           onClick={() => navigate(`/contractor/open-service/${location.state}`)}
    //           variant="outlined"
    //           fullWidth
    //         >
    //           OK
    //         </Button>
    //       </Grid>
    //     </Container>
    //   </Modal>
    //   <Container maxWidth="md" sx={{ p: 5, boxShadow: 5, borderRadius: 5 }}>
    //     <form onSubmit={handleSubmit}>
    //       <Grid container spacing={5}>
    //         <Grid item md={6} sx={{ width: "100%" }}>
    //           <TextField
    //             value={firstName}
    //             label="First Name"
    //             placeholder="Enter First Name"
    //             onChange={(e) => setFirstName(e.target.value)}
    //             fullWidth
    //             required
    //           />
    //         </Grid>
    //         <Grid item md={6} sx={{ width: "100%" }}>
    //           <TextField
    //             value={lastName}
    //             label="Last Name"
    //             placeholder="Enter Last Name"
    //             onChange={(e) => setLastName(e.target.value)}
    //             fullWidth
    //             required
    //           />
    //         </Grid>
    //         <Grid item md={6} sx={{ width: "100%" }}>
    //           <TextField
    //             type="number"
    //             value={cardNum}
    //             label="Card Number"
    //             placeholder="Enter Card Number"
    //             onChange={(e) => setCardNum(e.target.value)}
    //             fullWidth
    //             required
    //           />
    //         </Grid>
    //         <Grid item md={6} sx={{ width: "100%" }}>
    //           <TextField
    //             value={cvv}
    //             type="number"
    //             label="Card CVV"
    //             placeholder="Enter Card CVV"
    //             onChange={(e) => setCvv(e.target.value)}
    //             fullWidth
    //             required
    //           />
    //         </Grid>
    //         <Grid item md={6} sx={{ width: "100%" }}>
    //           <Typography>Expiration Month</Typography>
    //           <FormControl fullWidth>
    //             <Select
    //               value={expMonth}
    //               onChange={(e) => setExpMonth(e.target.value)}
    //             >
    //               {monthNames.map((e, index) => {
    //                 return (
    //                   <MenuItem value={e} key={index}>
    //                     {e}
    //                   </MenuItem>
    //                 );
    //               })}
    //             </Select>
    //           </FormControl>
    //         </Grid>
    //         <Grid item md={6} sx={{ width: "100%" }}>
    //           <Typography>Expiration Year</Typography>
    //           <FormControl fullWidth>
    //             <Select
    //               value={expYear}
    //               onChange={(e) => setExpYear(e.target.value)}
    //             >
    //               {yearNames.map((e, index) => {
    //                 return (
    //                   <MenuItem value={2023 + index} key={index}>
    //                     {2023 + index}
    //                   </MenuItem>
    //                 );
    //               })}
    //             </Select>
    //           </FormControl>
    //         </Grid>
    //         <Grid item md={6} sx={{ width: "100%" }}>
    //           <TextField
    //             value={zipCode}
    //             type="number"
    //             label="Zip Code"
    //             placeholder="Enter Zip Code"
    //             onChange={(e) => setZipCode(e.target.value)}
    //             fullWidth
    //             required
    //           />
    //         </Grid>
    //         <Grid item md={6} sx={{ width: "100%" }}>
    //           <TextField
    //             value={address}
    //             label="Address"
    //             placeholder="Enter Your Address"
    //             onChange={(e) => setAddress(e.target.value)}
    //             fullWidth
    //             required
    //           />
    //         </Grid>
    //       </Grid>
    //     </form>
    //     <br />
    //     <br />
    //     <Box textAlign="center">
    //       <Button variant="contained" color="success" type="submit" onClick={(event) => { handleSubmit(event) }}>
    //         <b>Submit</b>
    //       </Button>
    //     </Box>
    //   </Container>
    // </Box>
  );
};
