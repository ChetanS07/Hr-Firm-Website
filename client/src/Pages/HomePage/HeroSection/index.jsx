import react from "react"

//css
import "./styles/HeroSection.css"

import Image from "../../../assets/image5.jpg"

export default function App() {
    return (
        <section id="hero-section">
            <img
                className="hero-image"
                src={Image}
            />
            <article className="hero-article">
                <h1>HR Solutions</h1>
                <p>Let us find you jobs at companies where people, work and recognition match your unique professional needs. Let us upgrade your careers.</p>
            </article>
        </section>
    );
}