import react from "react"
import { Link } from "react-router-dom"

//css
import "./styles/Navbar.css"

export default function App(props) {
    return (
        <header id="navbar">
            <div className="logo-div">
                HR Solutions
            </div>
            <nav className="navbar-links-wrapper">
                <ul className="navbar-links">
                    <li>
                        <a href='/home'>Home</a>
                    </li>
                    <li>
                        <a href="/home/#forms-section">Upload Resume</a>
                    </li>
                    <li>
                        <a href="/home/#forms-section">Contact Us</a>
                    </li>
                    <li>
                        <a href="/login">
                            {props.page === "admin" ? "Logout" : "Login"}
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}