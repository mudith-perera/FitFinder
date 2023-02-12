import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UC from "./Views/UnderConstructions.js";
import WithNavBar from "./Components/WithNav.jsx";
import WithoutNavBar from "./Components/WithoutNav.jsx";
import Footer from "./Components/Footer.js";

import Login from "./Views/Login.js";
import SignUp from "./Views/SignUp.js";
import Home from "./Views/Home.js";

import AdminHome from "./Views/Admin/AdminHome.js";

import CoachHome from "./Views/Coach/CoachHome.js";
import CoachSignUpForm from "./Components/Coach/CoachSignUpForm.js";

import GymHome from "./Views/Gym/GymHome.js";
import GymSignUpForm from "./Components/Gym/GymSignUpForm.js";

import MemberHome from "./Views/Member/MemberHome.js";
import MemberViewUpdate from "./Components/Member/MemberViewAndUpdateForm.js";

import Schedule from "./Components/Member/ScheduleForm.js";
import ScheduleManage from "./Components/Coach/ManageSchedule.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<WithoutNavBar />}>
          <Route exact path="/admin-home" element={<AdminHome />} />

          <Route exact path="/coach-home" element={<CoachHome />} />

          <Route exact path="/gym-home" element={<GymHome />} />

          <Route exact path="/member-home" element={<MemberHome />} />
          <Route exact path="/member-view-update" element={<MemberViewUpdate/>} />
        </Route>

        <Route element={<WithNavBar />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/uc" element={<UC />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />

          <Route exact path="/gym-sign-up" element={<GymSignUpForm />} />
          <Route exact path="/Coach-sign-up" element={<CoachSignUpForm />} />

          <Route exact path="/Schedule" element={<Schedule/>} />
          <Route exact path="/ManageSchedule" element={<ScheduleManage/>} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
