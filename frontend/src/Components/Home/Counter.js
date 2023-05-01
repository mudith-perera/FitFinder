import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import "./Counter.css";

import Aos from "aos";
import "aos/dist/aos.css";

import { FaDumbbell, FaUserAlt } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';

import Trust from "../../Images/trust.png"

let iconStyle = { fontWeight: "400", color: "#fff", fontSize: "3.5rem" };
const Counter = (props) => {

    const [gyms, setGyms] = useState(null);
    const [coaches, setCoaches] = useState(null);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);

    useEffect(() => {
        if (props.dataU && props.dataG) {
            const filteredUsers = props.dataU.filter((user) => user?.userType === "coach");
            setGyms(props.dataG?.length);
            setUsers(props.dataU?.length);
            setCoaches(filteredUsers?.length);
        }
    }, [props.dataG, props.dataU]);

    return (
        <>
            <div className="c-header" data-aos="fade-right"><h2>We are trusted with &nbsp;&nbsp;<img style={{ height: "70px" }} alt="trust" src={Trust} /></h2></div>

            <div className="c-wrapper">
                <div className="c-container" data-aos="flip-right">
                    <FaDumbbell style={iconStyle} />
                    <CountUp className="num" end={gyms} />
                    <span className="text">Gyms</span>
                </div>
                <div className="c-container" data-aos="flip-right">
                    <GiTeacher style={iconStyle} />
                    <CountUp className="num" end={coaches} />
                    <span className="text">Coaches</span>
                </div>
                <div className="c-container" data-aos="flip-right">
                    <FaUserAlt style={iconStyle} />
                    <CountUp className="num" end={users} />
                    <span className="text">Users</span>
                </div>
            </div>
        </>
    )
}
export default Counter;


