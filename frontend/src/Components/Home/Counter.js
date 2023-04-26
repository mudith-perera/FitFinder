import React, { useState, useEffect } from 'react';
import "./Counter.css";

import CounterScript from './CounterScript.js';

import Aos from "aos";
import "aos/dist/aos.css";

const Counter = (props) => {
    const [gyms, setGyms] = useState(null);
    const [coaches, setCoaches] = useState(null);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        Aos.init({ duration: 500 });

        const timeout = setTimeout(() => {
            CounterScript();
          }, 3000);
          return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (props.dataU && props.dataG) {
            const filteredUsers = props.dataU.filter((user) => user?.userType === "coach");
            setGyms(props.dataG?.length+'');
            setUsers(props.dataU?.length+'');
            setCoaches(filteredUsers?.length+'');
        }
    },[props.dataG,props.dataU]);
    
    console.log(gyms,users,coaches)

    return (
        <>
            <div className="c-wrapper">
                <div className="c-container" data-aos="fade-right">
                    {/* <i className="fab fa-twitter"></i> */}
                    <span className="num" data-val={gyms}>0</span>
                    <span className="text">Gyms</span>
                </div>
                <div className="c-container" data-aos="fade-right">
                    {/* <i className="fab fa-facebook-f"></i> */}
                    <span className="num" data-val={coaches}>0</span>
                    <span className="text">Coaches</span>
                </div>
                <div className="c-container" data-aos="fade-right">
                    {/* <i className="fab fa-youtube"></i> */}
                    <span className="num" data-val={users}>0</span>
                    <span className="text">Users</span>
                </div>
            </div>
        </>
    )
}
export default Counter;


