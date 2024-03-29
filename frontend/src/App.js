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
import FAQ from "./Components/Home/FAQ";
import PrivacyPolicy from "./Views/PrivacyPolicy.js";

import AdminHome from "./Views/Admin/AdminHome.js";
import FaQTable from "./Components/Admin/FaQTable.js";
import ManageMembers from "./Components/Admin/ManageMembers.js";
import ManageCoaches from "./Components/Admin/ManageCoaches.js";
import ManageGyms from "./Components/Admin/ManageGyms.js";

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
import MemberStats from "./Components/Member/MemberStats.js";
import PaymentSuccess from "./Components/Payment/PaymentSuccess.js";

import Schedule from "./Components/Member/ScheduleForm.js";
import ScheduleManage from "./Components/Coach/ManageSchedule.js";
import ChooseUsers from "./Components/Coach/ChooseUsers.js";

import PasswordReset from "./Components/Password/ResetPasswordForm.js";
import PasswordResetReroute from "./Components/Password/PasswordResetReroute.js"
import ToTopBtn from "./Components/BackToTop/ToTopBtn.jsx";
import ChatBot from "./Components/Home/FitFinderChatbot.js";

import FavoriteGym from "./Components/Shared/FavoritedGyms.js"

function App() {
  return (
    <Router>
      <ToTopBtn />
      <ChatBot/>
      <Routes>
        <Route element={<WithoutNavBar />}>

          <Route exact path="/uc-w" element={<UC />} />
          <Route exact path="/admin-home" element={<AdminHome />} />
          <Route exact path="/admin-home/faq-table" element={<FaQTable />} />
          <Route exact path="/admin-home/manage-members" element={<ManageMembers />} />
          <Route exact path="/admin-home/manage-coaches" element={<ManageCoaches />} />
          <Route exact path="/admin-home/manage-gyms" element={<ManageGyms />} />

          <Route exact path="/coach-home" element={<CoachHome />} />
          <Route exact path="/coach-home/coach-view-update" element={<CoachViewUpdateForm />} />
          <Route exact path="/coach-home/coach-registered-gym" element={<CoachRegisteredGym />} />
          <Route exact path="/coach-home/choose-user" element={<ChooseUsers />} />

          <Route exact path="/gym-home" element={<GymHome />} />
          <Route exact path="/gym-home/gym-view-update" element={<GymViewUpdateForm />} />
          <Route exact path="/gym-home/view-all-gym-members" element={<ViewAllGymMembers />} />
          <Route exact path="/gym-home/view-all-gym-coaches" element={<ViewAllGymCoaches />} />

          <Route exact path="/member-home" element={<MemberHome />} />
          <Route exact path="/member-home/member-view-update" element={<MemberViewUpdate />} />
          <Route exact path="/member-home/member-registered-gym" element={<MemberRegisteredGym />} />
          <Route exact path="/member-home/schedule" element={<Schedule />} />
          <Route exact path="/member-home/member-payment" element={<MemberPayment />} />
          <Route exact path="/member-home/member-stats" element={<MemberStats />} />
          <Route exact path="/checkout-success" element={<PaymentSuccess />} />
          <Route exact path="/member-home/member-favorited-gym" element={<FavoriteGym />} />



          <Route exact path="/manage-schedule/:userId" element={<ScheduleManage />} />
          <Route exact path="/password-reset" element={<PasswordReset />} />
          <Route exact path="/password-reset-reroute/:token" element={<PasswordResetReroute />} />
        </Route>

        <Route element={<WithNavBar />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/uc" element={<UC />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/about-us" element={<AboutUs />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/gym-sign-up" element={<GymSignUpForm />} />
          <Route exact path="/Coach-sign-up" element={<CoachSignUpForm />} />

          <Route exact path="/faq" element={<FAQ />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
