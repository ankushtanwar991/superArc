import { Typography, Container, Box, Button } from "@mui/material";

export const NotFound = () => {
  return (
    <Container
      sx={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box textAlign="center">
        <Typography variant="h1" color="primary">
          <b>404</b>
        </Typography>
        <Typography variant="h2" color="secondary">
          PAGE NOT FOUND
        </Typography>
        <br />
        <a href="/">
          <Button variant="contained" color="primary">
            Return To Home
          </Button>
        </a>
      </Box>
    </Container>
  );
};
