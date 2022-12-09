import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faEnvelope, faLocationDot, faBriefcase } from "@fortawesome/free-solid-svg-icons"

//css
import "./Styles/ContactSection.css"


function App() {
    return (
        <section id="form-conctact-section">
            <div className="contact-wrapper">

                <div className="contact-image-section">
                    <div className="contact-image-section-text">
                        <b>Get In Touch..</b>
                    </div>
                </div>
                <div className="contact-section-details">
                    <div className="working-details">
                        <div><FontAwesomeIcon icon={faBriefcase} size="1x" /></div>
                        <div className="contact-working-days">Monday - Friday</div>
                        <div className="contact-working-hours"> 10 Am - 6 Pm</div>
                    </div>
                    <div className="phone-email-details">
                        <div >
                            <b>Get to us Today...</b>
                        </div>
                        <div>
                            <span style={{ marginRight: "1rem" }}> <FontAwesomeIcon icon={faPhone} /></span>
                            +91 1234567890
                        </div>
                        <div>
                            <span style={{ marginRight: "1rem" }}> <FontAwesomeIcon icon={faEnvelope} /></span>
                            yuvrsconsulting@gmail.com
                        </div>
                    </div>
                </div>
                <div className="contact-section-address">
                    <div style={{ marginRight: "1rem" }}><FontAwesomeIcon icon={faLocationDot} size="2x" /></div>
                    <div style={{ textAlign: "center" }}>
                        #123 abcd galli, Bangalore
                    </div>
                </div>
            </div>
        </section >
    );
}

export default App;
