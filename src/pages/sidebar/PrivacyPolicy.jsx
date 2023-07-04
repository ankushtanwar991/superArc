import { Container, Typography } from "@mui/material";

export const PrivacyPolicy = () => {
  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        <b>Privacy Policy</b>
      </Typography>
      <br />

      <Typography>
        <b>
          At ServiceArc, we take your privacy seriously. This Privacy Policy
          outlines the information we collect, how we use it, and your choices
          about its use. By using our website, you agree to the terms of this
          policy.
        </b>
      </Typography>
      <br />
      <ol style={{ marginLeft: '10px' }}>
        <li>
          <Typography textAlign="justify">
            Information We Collect We collect personal information that you
            voluntarily provide us, such as your name, email address, and phone
            number. We also collect non-personal information, such as your IP
            address and web browser type, to improve our website and services.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign="justify">
            Use of Information <br /> We use your personal information to
            respond to your inquiries and provide you with the services you
            request. We may also use your personal information to send you
            marketing and promotional materials, but you can opt-out of
            receiving these communications at any time.
          </Typography>
        </li>
        <br />
        <Typography textAlign="justify">
          We may use non-personal information for website analytics and to
          improve our website and services.
        </Typography>
        <br />
        <li>
          <Typography textAlign="justify">
            Use of Information <br /> We use your personal information to
            respond to your inquiries and provide you with the services you
            request. We may also use your personal information to send you
            marketing and promotional materials, but you can opt-out of
            receiving these communications at any time.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign="justify">
            Sharing of Information <br /> We do not share your personal
            information with third parties, except as necessary to provide you
            with the services you request or as required by law. We may share
            non-personal information with third parties for website analytics
            and other legitimate business purposes.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign="justify">
            Security <br /> We take reasonable measures to protect your personal
            information from unauthorized access, use, and disclosure. However,
            no data transmission over the Internet can be guaranteed to be
            completely secure, so we cannot ensure or warrant the security of
            any information you transmit to us.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign="justify">
            Cookies and Tracking Technologies <br /> We use cookies and similar
            tracking technologies to enhance your user experience and to gather
            information about how you use our website. You can control the use
            of cookies at the individual browser level. If you reject cookies,
            you may still use our website, but your ability to use some features
            or areas of our website may be limited.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign="justify">
            Third-Party Links <br /> Our website may contain links to
            third-party websites. We are not responsible for the privacy
            practices or content of these third-party websites.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign="justify">
            Children's Privacy <br /> Our website is not intended for use by
            children under the age of 13. We do not knowingly collect personal
            information from children under the age of 13. If we become aware
            that we have inadvertently collected personal information from a
            child under the age of 13, we will delete that information.
          </Typography>
        </li>
        <br />
        <li>
          <Typography textAlign="justify">
            Changes to this Policy <br /> We may update this Privacy Policy from
            time to time. If we make material changes to this policy, we will
            notify you by posting a prominent notice on our website or by other
            means.
          </Typography>
        </li>
      </ol>
      <br />
      <br />
      <Typography textAlign="justify">
        If you have any questions about this Privacy Policy, please contact us
        at <i>contact@ServiceArc.com</i>.
      </Typography>
      <br />
      <br />
    </Container>
  );
};
