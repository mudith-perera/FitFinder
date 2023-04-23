///////////////////////// Developer       : Gimhani Harshika  /////////////////////////
///////////////////////// Modified Date   : 12-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { CDBSidebarMenuItem } from "cdbreact";

import {  MdScheduleSend, MdPayments } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import { FaUsers, FaUserPlus, FaBars,FaSearch,FaPeopleCarry,FaDumbbell,FaHome } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";

let iconStyle = { fontWeight: "400", color: "#fff", fontSize: "1.5rem" };

export const MenuItems = [
    {
        Role: 'member',
        Name: "Mr.Member",
        NavsArray: [
            {
                text: 'Home',
                icon: <FaHome style={iconStyle} />,
                path: "/member-home",
            },
            {
                text: 'Search For Gyms',
                icon: <FaSearch style={iconStyle} />,
                path: "/",
            },
            {
                text: 'Schedule',
                icon: <AiFillSchedule style={iconStyle} />,
                path: "/member-home/schedule",
            },
            {
                text: 'My Gym',
                icon: <FaDumbbell style={iconStyle} />,
                path: "/member-home/member-registered-gym",
            },
            //////// (Mudith Perera) Payment added - (START) ///////
            {
                text: 'Payment',
                icon: <MdPayments style={iconStyle} />,
                path: "/member-home/member-payment",
            },
            {
                text: 'Profile',
                icon: <AiFillSetting style={iconStyle} />,
                path: "/member-home/member-view-update",
            },
             //////// (Mudith Perera) Payment added - (END) ///////
        ],
    },
    {
        Role: 'coach',
        Name: "Mr.Coach",
        NavsArray: [
            {
                text: 'Search For Gyms',
                icon: <FaSearch style={iconStyle} />,
                path: "/",
            },
            {
                text: 'Schedule Request',
                icon: <MdScheduleSend style={iconStyle} />,
                path: "/coach-home/choose-user",
            },
            {
                text: 'My Gym',
                icon: <FaDumbbell style={iconStyle} />,
                path: "/coach-home/coach-registered-gym",
            },
            {
                text: 'Profile',
                icon: <AiFillSetting style={iconStyle} />,
                path: "/coach-home/coach-view-update",
            },
        ],
    },
    {
        Role: 'gym',
        Name: "Mr.Gym",
        NavsArray: [
            {
                text: 'Manage Gym Members',
                icon: <FaUsers style={iconStyle} />,
                path: "/gym-home/view-all-gym-members",
            },
            {
                text: 'Manage Gym Coaches',
                icon: <FaPeopleCarry style={iconStyle} />,
                path: "/gym-home/view-all-gym-coaches",
            },
            {
                text: 'Add Gym Coach',
                icon: <FaUserPlus style={iconStyle} />,
                path: "/uc-w",
            },
            {
                text: 'Gym Profile',
                icon: <AiFillSetting style={iconStyle} />,
                path: "/gym-home/gym-view-update",
            },
        ],
    },
    {
        Role: 'admin',
        Name: "Mr.Admin",
        NavsArray: [
            {
                text: 'Manage Gyms',
                icon: <FaUserPlus style={iconStyle} />,
                path: "/admin-home/manage-gyms",
            },
            {
                text: 'Manage Members',
                icon: <FaUsers style={iconStyle} />,
                path: "/admin-home/manage-members",
            },
            {
                text: 'View FAQs',
                icon: <MdScheduleSend style={iconStyle} />,
                path: "/admin-home/faq-table",
            },
            
        ],
    },
]

const Container = styled.div`
`
const Sidebar = styled.div`
    background: #333;
    color: #fff;
    height: 100vh;
    width: 300px;
    transition: all 0.05s;
`
const TopSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 40px;
    border-bottom: 0.1rem solid grey ;

`
const Row = styled.div`
    display: flex;
    flex-direction: row;
`
const UserRole = styled.h2`
    font-size: 30px;
    letter-spacing: 0.1rem;
    display: flex;
`
const Toggle = styled.div`
    display: flex;
    font-size: 27px;
    margin-top: 8px;

    &:hover{
        cursor: pointer;
    }
    
`
const UserName = styled.div`
    margin-right: 90px;
`
const BottomSection = styled.div`
    margin-top: 30px;
`

const StyledNavLink = styled(NavLink)`
    display: flex;
    color: #fff;
    padding: 20px 15px;
    gap: 15px;
    transition: all 0.5s;
    text-decoration: none;
    height: 80px;

    &:hover{
        background: #6a11cb;
        color: #fff;
        transition: all 0.5s;
    }
    &:active{
        background: #6a11cb;
        color: #fff;
    }

`
const MenuIcon = styled.div`
    margin-left: 20px;
`
const MenuText = styled.div`
    font-size: 18px;
    margin-left: 10px;
    text-decoration: none;
`
const SignoutText = styled.div`
`
const Signout = styled.div`
    margin-right: 1px;
`

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 10%;
    height: 15%;

    &:hover{
        cursor: pointer;
    }
`
const SideNavbar = (props) => {
    const [userType] = useState(props.userRole);

    //////// (Mudith Perera) Logged User Data - (START) ///////
    const [username] = useState(props.userName);
    //////// (Mudith Perera) Logged User Data - (END) ///////
    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Container>
            <Sidebar style={{ width: isOpen ? "300px" : "90px" }}>
                <TopSection>
                    {
                        userType === "member" ?
                            <React.Fragment>
                                <Row>
                                    <UserRole style={{ display: isOpen ? "block" : "none" }}>
                                        Member
                                    </UserRole>
                                    <Toggle style={{ marginLeft: isOpen ? "50px" : "0px" }}>
                                        <FaBars onClick={toggle} />
                                    </Toggle>
                                </Row>
                                <UserName style={{ display: isOpen ? "block" : "none" }}>
                                    {username}
                                </UserName>
                            </React.Fragment>
                            :
                            userType === "coach" ?
                                <React.Fragment>
                                    <Row>
                                        <UserRole style={{ display: isOpen ? "block" : "none" }}>
                                            Coach
                                        </UserRole>
                                        <Toggle style={{ marginLeft: isOpen ? "50px" : "0px" }}>
                                            <FaBars onClick={toggle} />
                                        </Toggle>
                                    </Row>
                                    <UserName style={{ display: isOpen ? "block" : "none" }}>
                                        {username}
                                    </UserName>
                                </React.Fragment>
                                :
                                userType === "gym" ?
                                    <React.Fragment>
                                        <Row>
                                            <UserRole style={{ display: isOpen ? "block" : "none" }}>
                                                Gym
                                            </UserRole>
                                            <Toggle style={{ marginLeft: isOpen ? "50px" : "0px" }}>
                                                <FaBars onClick={toggle} />
                                            </Toggle>
                                        </Row>
                                        <UserName style={{ display: isOpen ? "block" : "none" }}>
                                            {username}
                                        </UserName>
                                    </React.Fragment>
                                    :
                                    userType === "admin" ?
                                        <React.Fragment>
                                            <Row>
                                                <UserRole style={{ display: isOpen ? "block" : "none" }}>
                                                    Admin
                                                </UserRole>
                                                <Toggle style={{ marginLeft: isOpen ? "50px" : "0px" }}>
                                                    <FaBars onClick={toggle} />
                                                </Toggle>
                                            </Row>
                                            <UserName style={{ display: isOpen ? "block" : "none" }}>
                                                {MenuItems[3].Name}
                                            </UserName>
                                        </React.Fragment>
                                        : null
                    }

                </TopSection>
                <BottomSection>

                    {
                        userType === "member" ?
                            MenuItems[0].NavsArray.map((item, index) => {
                                return (
                                    <StyledNavLink to={item.path} key={index} activeclassname="active" className="MenuLink">
                                        <MenuIcon>
                                            {item.icon}
                                        </MenuIcon>
                                        <MenuText style={{ display: isOpen ? "block" : "none" }}>
                                            {item.text}
                                        </MenuText>
                                    </StyledNavLink>
                                )
                            }) :
                            userType === "coach" ?
                                MenuItems[1].NavsArray.map((item, index) => {
                                    return (
                                        <StyledNavLink to={item.path} key={index} activeclassname="active" className="MenuLink">
                                            <MenuIcon>
                                                {item.icon}
                                            </MenuIcon>
                                            <MenuText style={{ display: isOpen ? "block" : "none" }}>
                                                {item.text}
                                            </MenuText>
                                        </StyledNavLink>
                                    )
                                }) :
                                userType === "gym" ?
                                    MenuItems[2].NavsArray.map((item, index) => {
                                        return (
                                            <StyledNavLink to={item.path} key={index} activeclassname="active" className="MenuLink">
                                                <MenuIcon>
                                                    {item.icon}
                                                </MenuIcon>
                                                <MenuText style={{ display: isOpen ? "block" : "none" }}>
                                                    {item.text}
                                                </MenuText>
                                            </StyledNavLink>
                                        )
                                    }) :
                                    userType === "admin" ?
                                        MenuItems[3].NavsArray.map((item, index) => {
                                            return (
                                                <StyledNavLink to={item.path} key={index} activeclassname="active" className="MenuLink">
                                                    <MenuIcon>
                                                        {item.icon}
                                                    </MenuIcon>
                                                    <MenuText style={{ display: isOpen ? "block" : "none" }}>
                                                        {item.text}
                                                    </MenuText>
                                                </StyledNavLink>
                                            )
                                        }) : null
                    }

                </BottomSection>
                <Footer>
                    <Signout>
                        <NavLink
                            to="/login"
                            className={({ isActive }) => (isActive ? "active" : null)}
                            style={{ textDecoration: "none", fontSize: "20px", color: "grey", }}
                        >
                            <CDBSidebarMenuItem icon="fa-light fa-arrow-right-from-bracket" >
                                <SignoutText style={{ display: isOpen ? "block" : "none" }}>
                                    Sign Out
                                </SignoutText>
                            </CDBSidebarMenuItem>
                        </NavLink>
                    </Signout>
                </Footer>
            </Sidebar>
        </Container >
    );
}

export default SideNavbar;

/////////////////////////           (END)                /////////////////////////