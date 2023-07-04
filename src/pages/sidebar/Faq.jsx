import {
  Container,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export const Faq = () => {
  return (
    <Container>
      <Typography variant="h3" textAlign="center">
        <b>Frequently Asked Questions</b>
      </Typography>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. What is ServiceArc?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            ServiceArc is a website(soon to be App) designed to simplify the
            process of connecting a customer with a contractor by eliminating
            the wasted time and energy through modernizing the estimation
            process. Simply create a service request and get multiple estimates
            from local contractors, no harassing phone calls or wasted time
            scheduling multiple appointments for appraisals. The integrated map
            makes it easier for contractors to give estimates based on location
            and travel time.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. How is ServiceArc different from other sites?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            Most every other site works in the same fashion, you tell them the
            work you need done and they either provide a list of contractors to
            call or pass your information onto the contractors so that the
            contractors can call you directly. You still need to schedule
            appointments with all of the contractors to get estimates.
            ServiceArc eliminates all of this headache and hassle, list only
            once and wait for estimates from contractors in the area. No
            annoying phone calls, emails, or time wasted scheduling appointments
            for estimates. Our fees are substantially less for contractors than
            other sites as well! Many other sites charge 10% or more per job,
            whether they receive the contract or not! We only charge a $5
            monthly fee, and there is no guessing if there is work or not. You
            can see the service requests pending on the interactive map as well
            as the current range of existing estimates, so the risk of wasting
            your hard earned money to find more work is greatly reduced.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. Is it safe to use ServiceArc?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            ⦁ This greatly depends on the community. Customers who are concerned
            for their safety should never meet with contractors alone,
            especially if you have agreed the payment will be cash. Even if it
            is someone you already know and have had business dealings.
            Contractors should never use machinery or perform work they do not
            have experience in. Always use proper safety equipment such as
            goggles, hearing protection, proper footwear, and gloves. Always
            notify friends or family of addresses you plan to perform work at.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. Do I need a business license?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            ⦁ Yes, most cities and/or counties require a business license.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. Do I need insurance?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            Yes, it is required by law in most jurisdictions to have insurance.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. Do I need to be bonded?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            No, it is not required to be bonded but it is highly recommended,
            especially if you will be paying others to assist with the work.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. Do I need to be a Union member to perform the work?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            No, it is not required to be a member of the Union to do work.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. How do customers use ServiceArc?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            Create a profile and then create a new service request. Choose the
            category that is the best match and fill in the description area the
            best you can with what you need done. Be sure to include
            measurements, what you know or think the problem might be,
            year-make-model if applicable, and upload as many photos so that
            contractors can have a better understanding. Select the dates you
            would like the work performed and then just wait for the estimates
            to . Choose the contractor that best suites your needs and once
            selected the contractor will receive your contact information.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. How do contractors use ServiceArc?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            Create a profile and search for service requests that you have
            training, previous experience, or feel confident in completing. If
            you find work in the area of your preference and without current
            estimates or with estimates you feel you could compete with then pay
            the $5 monthly fee and begin placing estimates
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. How do I know I am getting the best estimate?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            The best estimate will be what you and your budget can afford. Do
            you want it done right away? It will be the first contractor to
            respond and can do it the soonest. Do you want the highest quality
            work done? This will most likely be the contractor with the highest
            review score submitting an estimate but not necessarily the lowest
            price. Do you want the cheapest? Your service request will remain
            active 30 days past your request date, if you haven’t received an
            estimate within your budget within that time frame simply delete the
            service request or we will remove it for you. No questions asked, no
            annoying phone calls or emails.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. Are estimates the total cost of repairs?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            We have added 2 selections when creating a service request, one for
            “Labor Only” and one for “Whole Job.” Labor only estimates are for
            service requests like lawn cutting(you will provide the mower),
            cleaning(you will provide supplies), moving(you will provide truck)
            or furniture assembly. With these types of service requests the only
            additional fee should be for payment processing. Whole Job estimates
            on the hand could be more or less once a contractor arrives to begin
            or even during the job. Most contractors should be able to inform
            you if the estimate will be more than initially appraised before
            beginning work, but things could arise in the middle of a job. If at
            any time you feel uncomfortable with what a contractor is telling
            you, politely inform them that you would like a second opinion. Of
            course any work already performed will need to be compensated for.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. How much is ServiceArc for customers?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            Creating and submitting a service request on ServiceArc is free.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. How much is ServiceArc for contractors?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            Contractors are able to view pending service requests prior to
            payment to confirm there is demand in the areas and types of work
            they have knowledge of. Unlimited estimates may be submitted once
            the $5 monthly fee has been paid.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. How does a contractor know an estimate has been accepted?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            If a submitted estimate has been accepted it will be listed in the
            Accepted Service Request tab.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. How does the contractor get paid?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            Customers have options of preferred payment when submitting a
            service request and contractors can select the different forms of
            payment they are capable of accepting. Please check to ensure
            contractors can accept your payment option before selecting them and
            contractors should also verify they are able to receive payment.
            (Future releases of our software will provide alerts users that do
            not have compatible payment methods)
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. When does the contractor get paid?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            As with any service industry of this nature payments should only be
            made once the work is completed. The only exceptions to this is
            where the contractor is supplying materials, or the job is
            exceptionally large, in which case a percentage may need to be given
            to or put in an escrow account for the contractor.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. What is the best way to pay a contractor?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            Whatever is the easiest and most comfortable for you. Some people
            only like dealing with cash, others prefer credit because it is
            safer. For safety we recommend paying credit, paypal, or some other
            previously agreed upon App for larger jobs. That being said,
            selecting cash as a payment option in smaller service requests will
            probably receive more estimates. Hobbyists, weekend warriors, or
            neighborhood youth that are of legal age to work may not have credit
            processing ability.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. What contractors can use ServiceArc?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            Any individual or company that wishes to submit an estimate and has
            the proper licensing in the jurisdiction that the work is being
            performed.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. Does ServiceArc do criminal background checks?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            No, ServiceArc has no affiliation with the contractors.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>
              Q. A contractor gave an estimate but changed it after arriving to
              do the job, what can I do?
            </b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            Hire the current contractor if the modified price seems fair, or
            list a new service request and be sure to include any missing
            information that caused the contractor to change the original
            estimate.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. What services can I hire through ServiceArc?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            You can list work for help with anything that is legal and you would
            like to pay someone a contracted fee to perform. While we have
            created the most common categories and subcategories someone may
            look to contract a job out for, you can list anything not specified
            in the Other/MISC category. Even things like cleaning grills,
            hanging Christmas lights, bathing dogs or anything else you might be
            willing to pay someone to do alone or help you with.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. What cities is ServiceArc available in?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            While we are based out of Memphis, TN and beginning our marketing
            campaign there we are expanding as fast as revenue and investments
            allow.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. How do I know the people I am hiring are professional?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            We have a review system so customers and contractors can see and
            leave reviews on each other.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. How can I leave a review?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            Reviews can be submitted by customers and contractors after the
            customer has accepted a contractor's estimate. This way if a
            customer or contractor is a no show, or repetitively reschedules an
            appointment, appropriate reviews may be left.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. How can I contact customer support?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            Send an Email to webmaster@ServiceArc.app As we expand we will add
            an 800 number
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">
            <b>Q. How much is the average price for cutting grass?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="justify">
            This depends if the contractor will have to use their own equipment
            or if you will be providing a mower and weeder. The simplest thing
            to do is create a profile if you have not already and submit a
            service request. Nobody will call or email before you approve an
            estimate from a contractor, if you don’t see any you like just
            delete the service request or wait 30 days past the date of request
            and it will be removed for you.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
    </Container>
  );
};
