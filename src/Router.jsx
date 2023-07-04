import "./style.css";
import { createContext, useEffect, useState } from "react";
import { CheckAuth } from "./auth/checkAuth";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { LoginKeeper } from "./auth/loginKeeper";
import { MobileHeader } from "./components/MobileHeader";
import { CssBaseline, useTheme, useMediaQuery } from "@mui/material";
import {
  Faq,
  Home,
  Login,
  About,
  Terms,
  SignUp,
  Contact,
  Receipt,
  NeedHelp,
  NotFound,
  Authorize,
  FoundJobs,
  OpenService,
  DataDeletion,
  PrivacyPolicy,
  SignUpDetails,
  OpenServiceTwo,
  ForgetPassword,
  PendingService,
  AcceptedService,
  ApprovedService,
  ConsumerProfile,
  CompletedService,
  NewServiceRequest,
  ConstructorProfile,
} from "./pages";
import { Sample } from "./pages/sample/Sample";
import ImagePopup from "./components/ImagePopup";
// import { SignUpContainer } from "./firebase/firebaseAuth/userSignUp";


export const SignUpContext = createContext()
export const Router = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
   const [name1,setName1] = useState('')
  const [email1,setEmail1] = useState('')
  const [pass1,setPass1] = useState('')


  useEffect(() => {
    window.onbeforeunload = () => {
      return "";
    };
  }, []);

  return (
    <>
      <CssBaseline />
      {isMatch ? <MobileHeader /> : <Header />}
      <SignUpContext.Provider value={{setName1,setEmail1,setPass1,name1,email1,pass1,}}>
      <Routes>
        <Route path="sample" element={<Sample />} />

        <Route index element={<Home />} />
        <Route path="faq" element={<Faq />} />
        <Route path="about" element={<About />} />
        <Route path="terms" element={<Terms />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="image-popup" element={<ImagePopup />} />
        <Route path="delete-data" element={<DataDeletion />} />
        <Route path="sign-up/details" element={<SignUpDetails />} />

        {/* Keep logged in user out */}
        <Route element={<LoginKeeper />}>
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          {/* <Route path="sign-up" element={<SignUpContainer />} /> */}
        </Route>

        {/* Protected Routes */}
        <Route element={<CheckAuth />}>
          {/* Consumer Routes */}
          <Route path="consumer">
            <Route path="need-help" element={<NeedHelp />} />
            <Route path="pending-service" element={<PendingService />} />
            <Route path="post-job/:cat" element={<NewServiceRequest />} />
            <Route path="approved-service" element={<ApprovedService />} />
          </Route>

          {/* Contractor Routes */}
          <Route path="contractor">
            <Route path="found-jobs" element={<FoundJobs />} />
            <Route path="open-service" element={<OpenService />} />
            <Route path="open-service/:id" element={<OpenServiceTwo />} />
            <Route path="accepted-service" element={<AcceptedService />} />
            <Route path="complete-service" element={<CompletedService />} />
          </Route>

          {/* Profile Routes */}
          <Route path="profile">
            <Route path="consumer-profile" element={<ConsumerProfile />} />
            <Route path="contractor-profile" element={<ConstructorProfile />} />
          </Route>

          {/* Route For Authorize.net Page */}
          <Route path="authorize" element={<Authorize />} />
          <Route path="authorize/receipt" element={<Receipt />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      </SignUpContext.Provider>
    </>
  );
};
