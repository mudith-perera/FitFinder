import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

function SideNavBar({ userRole }) {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        {/* SideBar For Admin (START) */}
        {userRole === "admin" && (
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Admin
            </a>
          </CDBSidebarHeader>
        )}

        {userRole === "admin" && (
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink
                to="/test1"
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="user">
                  Manage All Users
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to="/test2"
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="table">Manage All Gyms</CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="user">
                  FAQs
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="fa-light fa-arrow-right-from-bracket" >
                  Sign Out
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        )}
        {/* SideBar For Admin (END) */}

        {/* SideBar For Gym (START) */}
        {userRole === "gym" && (
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Gym
            </a>
          </CDBSidebarHeader>
        )}

        {userRole === "gym" && (
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink
                to="#"
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="user">
                  View / Update My Gym
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="table">Gym Coachs</CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="user">
                  Gym Members
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="fa-light fa-arrow-right-from-bracket" >
                  Sign Out
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        )}
        {/* SideBar For Gym (END) */}

        {/* SideBar For Coach (START) */}
        {userRole === "coach" && (
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Mr. Coach
            </a>
          </CDBSidebarHeader>
        )}

        {userRole === "coach" && (
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink
                to="#"
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="user">
                  My Details
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="fa-light fa-dumbbell">My Gym</CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="fa-light fa-book">
                  Manage Schedules
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="fa-light fa-arrow-right-from-bracket" >
                  Sign Out
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        )}
        {/* SideBar For Coach (END) */}

        {/* SideBar For Member (START) */}
        {userRole === "member" && (
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Mr. Member
            </a>
          </CDBSidebarHeader>
        )}

        {userRole === "member" && (
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink
                to="#"
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="user">
                  My Details
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="fa-light fa-dumbbell">My Gym</CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="fa-light fa-book">
                  My Schedule
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <CDBSidebarMenuItem icon="fa-light fa-arrow-right-from-bracket" >
                  Sign Out
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        )}
        {/* SideBar For Member (END) */}


        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default SideNavBar;
