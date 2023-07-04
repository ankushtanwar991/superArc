import { Container, Grid, Typography } from "@mui/material";

export const Terms = () => {
  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        <b>Terms & Conditions</b>
      </Typography>
      <br />
      <Typography variant="h5" textAlign="center">
        <b>User Agreement</b>
      </Typography>
      <br />
      <Typography textAlign="justify">
        WHEREAS _(“User”) wishes to utilize the referral services, website, and/or mobile applications (collectively “Services”) maintained and operated by ServiceArc, LLC (“Provider”); and
      </Typography>
      <br />
      <Typography textAlign="justify">
        WHEREAS User and Provider wish to memorialize the terms and conditions between them regarding User’s use of Provider’s Services; and
      </Typography>
      <br />
      <Typography textAlign="justify">
        NOW THEREFORE, in consideration of the promises and mutual covenants contained herein, and other good and valuable consideration, the receipt and sufficiency of which is hereby acknowledged, the Parties agree as follows:
      </Typography>
      <br />
      <ul style={{ paddingLeft: '40px' }}>
        <li>
          <Typography textAlign='justify'>
            PROVIDER’S BUSINESS. Provider is a technology company engaged in the business of providing referrals and/or connections between homeowners and individuals or businesses providing maintenance and improvement services. Provider’s business is conducted by creating a marketplace via Provider website and/or mobile applications to Provider’s Users who access said marketplace through a user account with Provider. The marketplace created by Provider’s business allows Users and Service Providers to connect with one another, and hire, retain, or bid for maintenance and improvement services.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign='justify'>
            SERVICE FEE. In exchange for access to and use of Provider’s Services, User shall pay a monthly fee in the amount of Five Dollars ($5.00) per month (“Monthly Fee”). Provider may increase the Monthly Fee from time to time by providing notice to User and said increase shall not commence until the next full month following the date notice of the increase is provided by Provider.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign='justify'>
            ACCOUNT USAGE. User must create and maintain an account on Provider’s website and/or mobile applications to utilize Provider’s Services. User acknowledges that accounts with Provider’s website and/or mobile applications are individualized, and User shall not allow another individual to utilize its account to obtain Provider’s Services. Notwithstanding the foregoing, a User who creates an account with Provider for a business or legal entity may allow different personnel to utilize User’s account with Provider so long as said personnel are only obtaining Provider’s Services for the business or entity in whose name the account is registered. Should Provider learn that a User is allowing multiple individuals to utilize User’s account, then Provider may terminate User’s account and shall not owe any refund of Monthly Fees to User in connection with terminating User’s account.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign='justify'>
            PROVIDER’S SERVICES. User hereby acknowledges that Provider’s Services are solely limited to facilitating the connection and referral of various carpenters, contractors, electricians, handymen, landscapers, mechanics, materialmen, painters, plumbers, or other repair professionals (collectively “Service Providers”) with property owners utilizing the website and/or mobile applications maintained and operated by Provider. As such, Provider explicitly disclaims and shall not warrant the quality, workmanship, or suitability of any work performed or services provided to a User by a Service Provider. Nor shall Provider be liable for any damage or claim, whether to property or person, arising from a Service Provider’s acts or omissions and regardless of whether said damage or claim arises in contract or tort.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign='justify'>
            PAYMENT FOR AND OF SERVICE PROVIDERS. User hereby acknowledges and agrees that Provider shall not be responsible for ensuring the payment of a Service Provider for any work performed for a User of Provider’s Services. Payments for services rendered by a Service Provider for a User are solely the responsibility of the Service Provider and User.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign='justify'>
            DISCLAIMER OF PARTERNSHIP. Nothing in this Agreement or the use of Provider’s Services shall be taken to create a partnership, joint venture, or collective undertaking between the Provider and any User. All Service Providers utilizing Provider’s Services shall be considered independent contractors, and Provider shall not exercise any authority, control, or discretion over how a Service Provider renders services for a User of Provider’s Services.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign='justify'>
            INDEMNITY. User shall indemnify and hold harmless Provider, its parents, officers, agents, and employees from any and all liability, including claims, demands, losses, costs, damages, and expenses of every kind and description (including death), or damages to persons or property arising out of or in connection with, or occurring during the course of User’s use of Provider’s Services where such liability is founded upon or grows out of the acts or omissions of any of the officers, employees or agents of User.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign='justify'>
            TERMINATION. Either Party may terminate this Agreement at any time by giving thirty (30) days written notice to the non-terminating Party. Upon termination of this Agreement, User shall pay any outstanding Monthly Fees owed to Provider and Provider shall then shut off User’s account with Provider.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign='justify'>
            NOTICES. All notices, requests, consents, claims, demands, waivers, and other communications hereunder (each, a “Notice”) shall be in writing and shall be deemed to have been given (a) when delivered by hand (with written confirmation of receipt); (b) when received by the addressee if sent by a nationally recognized overnight courier (receipt requested); or (c) on the date sent by email (with confirmation of transmission) if sent during normal business hours of the recipient, and on the next business day if sent after normal business hours of the recipient. Notices must be sent to the respective Parties at the following addresses (or at such other address for a Party as shall be specified in a Notice given in accordance with this Section 19):
          </Typography>
        </li>
      </ul>
      <Grid container mt={2} px={5}>
        <Grid item md={6}>
          <Typography>
            Address for Provider:
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography>
            Address for User:
          </Typography>
        </Grid>
        <Grid container mt={3}>
          <Grid item md={6} sm={6} xs={7}>
            <Typography>
              ServiceArc, LLC
            </Typography>
          </Grid>
          <Grid item md={6} sm={6} xs={5} mt={3}>
            <Typography>
              <hr style={{ width: '70%' }} />
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6} sm={6} xs={7}>
            <Typography>
              c/o James Howard
            </Typography>
          </Grid>
          <Grid item md={6} sm={6} xs={5} mt={3}>
            <Typography>
              <hr style={{ width: '70%' }} />
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6} sm={6} xs={7}>
            <Typography>
              2809 Kirby Rd. #116-224
            </Typography>
          </Grid>
          <Grid item md={6} sm={6} xs={5} mt={3} >
            <Typography>
              <hr style={{ width: '70%' }} />
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6} sm={6} xs={7}>
            <Typography>
              Memphis, TN 38119
            </Typography>
          </Grid>
          <Grid item md={6} sm={6} xs={5} mt={3}>
            <Typography>
              <hr style={{ width: '70%' }} />
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <ul style={{ paddingLeft: '40px', paddingTop: '25px' }}>
        <li>
          <Typography textAlign='justify'>
            GOVERNING LAW. This Agreement shall be governed by and construed in accordance with the internal laws of the State of Tennessee without giving effect to any choice or conflict of law provision or rule (whether of the State of Tennessee or any other jurisdiction). The Parties irrevocably consent to the jurisdiction and venue of the Courts located in Shelby County, Tennessee, for any dispute arising under this Agreement. Should Provider be required to enforce its rights under this Agreement, then Provider shall be entitled to recover its reasonable attorney's fees, court costs, and expenses incurred in enforcing its rights in addition to any other remedy available at law or in equity.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign='justify'>
            ASSIGNMENT.  Provider may, without the necessity of consent, assign or transfer its rights or obligations under this Agreement to any parent, subsidiary or affiliate corporation or entity.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign='justify'>
            ENTIRE AGREEMENT. This Agreement constitutes the whole agreement between User and Provider and may not be amended except by a writing duly executed by the Parties hereto.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign='justify'>
            SUBJECT HEADINGS.  The headings in this Agreement are inserted for convenience only and are not a part of this Agreement and shall not in any way affect the meaning or interpretation of this Agreement.
          </Typography>
        </li>
      </ul>
      <Typography textAlign='justify' mt={2}>
        IN WITNESS WHEREOF, the Parties hereto have executed this Agreement to be effective as of the Agreement date written below.
      </Typography>

      <Grid container mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item md={5}>
          <Typography><b>USER</b></Typography>
          <Grid container mt={1}>
            <Grid item md={2} xs={2}>
              <Typography>By:</Typography>
            </Grid>
            <Grid item md={10} xs={10} mt={2}>
              <Typography>
                <hr style={{ width: '300px' }} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item md={2} xs={2}>
              <Typography>Name:</Typography>
            </Grid>
            <Grid item md={10} xs={10} mt={2}>
              <Typography>
                <hr style={{ width: '300px' }} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item md={2} xs={2}>
              <Typography>Title:</Typography>
            </Grid>
            <Grid item md={10} xs={10} mt={2}>
              <Typography>
                <hr style={{ width: '300px' }} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item md={2} xs={2}>
              <Typography>Date:</Typography>
            </Grid>
            <Grid item md={10} xs={10} mt={2}>
              <Typography>
                <hr style={{ width: '300px' }} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5}>
          <Typography><b>ServiceArc, LLC</b></Typography>
          <Grid container mt={1}>
            <Grid item md={2} xs={2}>
              <Typography>By:</Typography>
            </Grid>
            <Grid item md={10} xs={10} mt={2}>
              <Typography>
                <hr style={{ width: '300px' }} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item md={2} xs={2}>
              <Typography>Name:</Typography>
            </Grid>
            <Grid item md={10} xs={10}>
              <Typography sx={{ borderBottom: '1px solid gray', width: '300px' }}>
                James Howard
              </Typography>
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item md={2} xs={2}>
              <Typography>Title:</Typography>
            </Grid>
            <Grid item md={10} xs={10}>
              <Typography sx={{ borderBottom: '1px solid gray', width: '300px' }}>
                Manager
              </Typography>
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item md={2} xs={2}>
              <Typography>Date:</Typography>
            </Grid>
            <Grid item md={10} xs={10} mt={2}>
              <Typography>
                <hr style={{ width: '300px' }} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
