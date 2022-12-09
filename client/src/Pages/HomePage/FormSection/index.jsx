import React from 'react';

//components
import Contact from "./Sections/ContactSection"
import Form from "./Sections/FormSection"


//css
import "./Styles/index.css"

function App() {
    return (
        <div>
            <div className="form-contact-outer-wrapper">
                <div className="form-contact-inner-wrapper">
                    <Contact />
                    <Form />
                </div>
            </div>
        </div>

    );
}

export default App;
