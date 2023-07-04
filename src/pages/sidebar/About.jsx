import { Container, Grid, Typography } from "@mui/material";

export const About = () => {
  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        <b>About Us</b>
      </Typography>
      <br />
      <Grid container sx={{ pr: "10px", textAlign: "justify" }}>
        <Typography sx={{}}>
        ServiceArc was created to simplify the hiring process of contractors
          for small to medium jobs. Gone are the days when word of mouth found
          you someone who is affordable, reliable, and trustworthy. Technology
          was supposed to simplify things but for some reason all of those other
          contractor sites complicated it and now they won't stop calling and
          emailing. We changed all of that at ServiceArc.
        </Typography>
        <Typography>
          At ServiceArc you only need to list the job you want done one time.
          You don't need to call a dozen contractors and schedule a half dozen
          appraisals. All you need to do is create a new Service Request and
          wait for contractors to submit their estimates. Choose the contractor
          you prefer and you're contact information will be exchanged, it's that
          simple.
        </Typography>
        <Typography>
          If it's a time sensitive issue and you want to hire the first person
          that responds, or wait a bit and see what offers come in, the choice
          is yours. Maybe you want the best deal even if it's an individual with
          few reviews or perhaps you want the professional so it is done to code
          and done right the first time. No matter whom you choose, nobody will
          call, email or be an annoying middleman until you do choose.
        </Typography>
        <Typography>
          Those other sites make everybody guess about everything. Customers
          wondering how many and which contractors are getting your information.
          Contractors not knowing if there are even customers worth advertising
          for. ServiceArc shows it all on an interactive map. We want
          contractors to keep more of their hard earned money. Contractors can
          now know if there are jobs and where they are before paying any fees.
          We also want customers to get the best service for their hard earned
          money. Customers can see how much demand is out there so they don't
          have to worry about being price gouged.
        </Typography>
        <Typography>
          So whether its cleaning, moving, planting, mowing, raking, washing,
          watering, fixing, painting, plumbing, flooring, wiring, installing,
          hanging or assembling the easiest, simplest, and fastest way to find
          the person that's right for the job is by listing on ServiceArc and
          letting them come to you.
        </Typography>
      </Grid>
    </Container>
  );
};
