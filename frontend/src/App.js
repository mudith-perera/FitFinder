import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UC from "./Views/UnderConstructions.js";
import WithNavBar from "./Components/WithNav.jsx";
import WithoutNavBar from "./Components/WithoutNav.jsx";
import Footer from "./Components/Footer.js";

import Login from "./Views/Login.js";
import SignUp from "./Views/SignUp.js";
import Home from "./Views/Home.js";
import AboutUs from "./Components/About/AboutUs.js";
import ForgotPassword from "./Components/Password/ForgotPasswordForm.js";
import FAQ from "./Components/Home/FNQ";
import SearchResultElement from "./Components/Home/SearchResultElement.js";

import AdminHome from "./Views/Admin/AdminHome.js";

import CoachHome from "./Views/Coach/CoachHome.js";
import CoachSignUpForm from "./Components/Coach/CoachSignUpForm.js";
import CoachViewUpdateForm from "./Components/Coach/CoachViewAndUpdateForm.js";
import CoachRegisteredGym from "./Components/Coach/CoachRegisteredGym.js";

import GymHome from "./Views/Gym/GymHome.js";
import GymSignUpForm from "./Components/Gym/GymSignUpForm.js";
import GymViewUpdateForm from "./Components/Gym/GymViewAndUpdateForm.js";
import ViewAllGymMembers from "./Components/Gym/ViewAllGymMembersTable.js";
import ViewAllGymCoaches from "./Components/Gym/ViewAllGymCoachesTable.js";

import MemberHome from "./Views/Member/MemberHome.js";
import MemberViewUpdate from "./Components/Member/MemberViewAndUpdateForm.js";
import MemberRegisteredGym from "./Components/Member/MemberRegisteredGym.js";
import MemberPayment from "./Components/Payment/MemberPayment.js";

import Schedule from "./Components/Member/ScheduleForm.js";
import ScheduleManage from "./Components/Coach/ManageSchedule.js";


import PasswordReset from "./Components/Password/ResetPasswordForm.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<WithoutNavBar />}>

          <Route exact path="/uc-w" element={<UC />} />
          <Route exact path="/admin-home" element={<AdminHome />} />

          <Route exact path="/coach-home" element={<CoachHome />} />
          <Route exact path="/coach-view-update" element={<CoachViewUpdateForm />} />
          <Route exact path="/coach-registered-gym" element={<CoachRegisteredGym />} />

          <Route exact path="/gym-home" element={<GymHome />} />
          <Route exact path="/gym-view-update" element={<GymViewUpdateForm />}/>
          <Route exact path="/view-all-gym-members" element={<ViewAllGymMembers/>}/>
          <Route exact path="/view-all-gym-coaches" element={<ViewAllGymCoaches/>}/>

          <Route exact path="/member-home" element={<MemberHome />} />
          <Route exact path="/member-view-update"  element={<MemberViewUpdate />}/>
          <Route exact path="/member-registered-gym"  element={<MemberRegisteredGym />}/>
          <Route exact path="/schedule" element={<Schedule />} />
          <Route exact path="/manage-schedule" element={<ScheduleManage />} />
          <Route exact path="/member-payment" element={<MemberPayment/>}/>


          <Route exact path="/password-reset" element={<PasswordReset />} />
        </Route>

        <Route element={<WithNavBar />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/uc" element={<UC />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/about-us" element={<AboutUs />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />

          <Route exact path="/gym-sign-up" element={<GymSignUpForm />} />
          <Route exact path="/Coach-sign-up" element={<CoachSignUpForm />} />

          <Route exact path="/element/:id" element={<SearchResultElement />} />
          <Route exact path="/faq" element={<FAQ />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
