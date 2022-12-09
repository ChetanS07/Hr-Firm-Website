import react from "react"

//components
import MangerImg from "../../../assets/image4.jpg"

//css
import "./styles/AboutSection.css"

export default function App() {
    return (
        <section id="about-section">
            <div className="about-firm">
                <article>
                    <h2>Welcome...</h2>
                    <p>
                        <b>HR Solutions</b> is a global HR & Recruitment consulting organization, which helps corporate smoothen the process of HR and business flow with the right people. We are currently ranked among one of the top 15 HR firms in the country.
                        The medulla of the business is collaborative approach for the next level generative initiatives as a staffing consultant for inbuilt national and global network paradigm.
                        The application tool comprises with the Core HR Practices branching with the Recruitment business, consulting practices, Training zone, Solutions provider and Services benefits.
                    </p>
                </article>
            </div>
            <div className="about-manager">
                <img
                    src={MangerImg}
                />
                <article>
                    <h3>Mr Deepak G S</h3>
                    <p>Manager</p>
                </article>
            </div>
        </section>
    );
}