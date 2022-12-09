import React from 'react';

import { Link } from "react-router-dom"

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

//css
import "./styles/Footer.css"

function App() {
    return (
        <section id="footer-section">

            <div className="social-icons-wrapper">
                <a style={{ color: "inherit" }}>
                    <FontAwesomeIcon icon={faLinkedin} size="xl" />
                </a>
                <a style={{ color: "inherit" }}>
                    <FontAwesomeIcon icon={faInstagram} size="xl" />
                </a>
                <a style={{ color: "inherit" }}>
                    <FontAwesomeIcon icon={faTwitter} size="xl" />
                </a>
                <a style={{ color: "inherit" }}>
                    <FontAwesomeIcon icon={faFacebook} size="xl" />
                </a>
            </div>

            <div className="copyright-details">
                ©2022 YUVRS Consulting Pvt Ltd. All Rights Reserved. <a style={{ color: "inherit", textDecoration: "none", marginLeft: "0.5rem" }}>Privacy Policy</a>
            </div>
        </section>
    );
}

export default App;