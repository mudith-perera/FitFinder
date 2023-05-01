///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 20-04-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useEffect, useState } from "react";

import { useCookies } from "react-cookie";

import Aos from "aos";
import "aos/dist/aos.css";

import { calculateBMI, calculateBMR, getBodyFatDescription } from "../Shared/Calculators.js"

const MemberStats = () => {
    const styles = {
        root: {
            marginTop: '-3rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: '5rem',
        },
        card: {
            width: 'calc(50% - 6rem)',
            margin: '3rem',
            backgroundColor: '#212529',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            borderRadius: '5px',
            overflow: 'hidden',
        },
        cardContent: {
            padding: '1rem',
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#fff',
        },
        text: {
            fontSize: '1rem',
            color: '#fff',
        },
        h2: {
            textAlign: 'center',
            marginTop: '4rem',
        }
    };

    const [cookie] = useCookies([""]);
    const [userId] = useState(cookie.LoggedUser[5]);
    const [username] = useState(
        cookie.LoggedUser[2] + " " + cookie.LoggedUser[3]
    );

    const [userData, setUserData] = useState(null);


    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [fat, setFat] = useState("");
    const [bmiInfo, setBmiInfo] = useState(null);
    const [bmrInfo, setBmrInfo] = useState(null);
    const [bodyFatDes, setBodyFatDes] = useState(null);

    useEffect(() => {
        Aos.init({ duration: 1000 });
        fetch(`/api/users/${userId}`)
            .then((response) => response.json())
            .then((data) => setUserData(data));
    }, [userId]);

    useEffect(() => {
        setAge(userData?.age);
        setGender(userData?.gender);
        setWeight(userData?.weight);
        setHeight(userData?.height);
        setFat(userData?.fat);
        const { bmi, status, normalWeightRange } = calculateBMI(height, weight);
        setBmrInfo(calculateBMR(gender, height, weight, age));
        setBodyFatDes(getBodyFatDescription(gender, fat));
        setBmiInfo({ bmi, status, normalWeightRange });
    }, [userData, age, gender, weight, height, fat]);

    return (
        <div>
            <h2 style={styles.h2}>Welcome {username},</h2>
            <div style={styles.root}>
                <div data-aos="fade-right" style={styles.card}>
                    <div style={styles.cardContent}>
                        {height && weight ? (<><div style={styles.title}>Your BMI : {bmiInfo?.bmi} kg/m<sup>2</sup></div><div style={styles.text}>
                            Your Height  : {height} cm <br />
                            Your Weight  : {weight} kg <br />
                            Your are  <b>{bmiInfo?.status}</b>
                        </div></>) : (<div style={styles.title}>Set your Height and Weight to check BMI</div>)}

                    </div>
                </div>
                <div data-aos="fade-left" style={styles.card}>
                    <div style={styles.cardContent}>
                        <div style={styles.title}>Ideal BMI is 18.5 - 25</div>
                        {height && weight ? (<div style={styles.text}>
                            Weight Goal : <b>{bmiInfo?.normalWeightRange || 'Complete'}</b>
                        </div>) : (<></>)}
                    </div>
                </div>
                <div data-aos="fade-right" style={styles.card}>
                    <div style={styles.cardContent}>
                        {height && weight && age && gender ? (<><div style={styles.title}>Your BMR : {bmrInfo} Calories/day</div>
                            <div style={styles.text}>
                                Your basal metabolic rate (BMR) is the number of calories your body needs to accomplish its most basic life-sustaining functions
                            </div>
                        </>) : (<><div style={styles.title}>Set your Height, Weight, Age, Gender to Check BMR</div>
                        <div style={styles.text}>
                        Your basal metabolic rate (BMR) is the number of calories your body needs to accomplish its most basic life-sustaining functions
                    </div></>)}
                    </div>
                    </div>
                    <div data-aos="fade-left" style={styles.card}>
                        <div style={styles.cardContent}>
                            <div style={styles.title}>Your Body-Fat Description</div>
                            {fat?(<div style={styles.text}>
                                Exercise Body Fat Categorization: <b>{bodyFatDes}</b>
                            </div>):(<div style={styles.text}>Set Your Body Fat</div>)}
                        </div>
                    </div>
                </div>
            </div>
        
    );
};
export default MemberStats;
