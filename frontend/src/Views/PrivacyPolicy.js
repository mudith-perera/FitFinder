import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const PrivacyPolicy = () => {

    useEffect(() => {
        Aos.init({ duration: 1000 });

    });

    return (
        <section data-aos="fade-right" >
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-11">
                        <div
                            className="card card-registration card-registration-2"
                            style={{ borderRadius: "15px", backgroundColor: "white", padding: "50px" }}
                        >
                            <div className="card-body p-0"></div>
                            <div>
                                <h3>Privacy Policy</h3>
                                <p>FitFinder is committed to protecting the privacy of its users. This Privacy Policy describes the types of personal information we collect and how we use, disclose, and protect that information.</p>
                                <h5>Information We Collect</h5>
                                <p>We may collect the following personal information from you:</p>
                                <ul>
                                    <li>Name</li>
                                    <li>Age</li>
                                    <li>Height</li>
                                    <li>Weight</li>
                                    <li>Fat percentage</li>
                                    <li>Address</li>
                                    <li>Location</li>
                                </ul>
                                <p>We may also collect non-personal information about your use of our system, such as your IP address and browser type.</p>
                                <h5>How We Use Your Information</h5>
                                <p>We may use the personal information we collect from you to:</p>
                                <ul>
                                    <li>Provide you with personalized services based on your preferences and usage patterns</li>
                                    <li>Analyze and improve our system and services</li>
                                    <li>Communicate with you about our services</li>
                                    <li>Provide you with promotional offers and other marketing materials</li>
                                    <li>Comply with applicable laws and regulations</li>
                                </ul>
                                <h5>Disclosure of Your Information</h5>
                                <p>We may disclose your personal information to third parties in the following circumstances:</p>
                                <ul>
                                    <li>With your consent</li>
                                    <li>To comply with legal obligations, such as a court order or subpoena</li>
                                    <li>To protect our rights, property, or safety, or the rights, property, or safety of others</li>
                                    <li>In connection with a corporate transaction, such as a merger, acquisition, or sale of assets</li>
                                </ul>
                                <p>We may also disclose non-personal information to third parties for the purposes of analytics and advertising.</p>
                                <h5>Data Security</h5>
                                <p>We take reasonable measures to protect your personal information from unauthorized access, use, disclosure, and destruction. However, no security measures are perfect or impenetrable, and we cannot guarantee the security of your information.</p>
                                <h5>Your Rights</h5>
                                <p>You have the right to:</p>
                                <ul>
                                    <li>Access, correct, or delete your personal information</li>
                                    <li>Object to or restrict the processing of your personal information</li>
                                    <li>Withdraw your consent at any time</li>
                                    <li>Lodge a complaint with a data protection authority</li>
                                </ul>
                                <h5>Changes to This Policy</h5>
                                <p>We may update this Privacy Policy from time to time. The revised policy will be posted on our website, and the date of the most recent revision will be indicated at the top of the policy.</p>
                                <h5>Contact Us</h5>
                                <p>If you have any questions or concerns about our Privacy Policy or practices, please contact us at 077-8403561.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section >
    );
};

export default PrivacyPolicy;
