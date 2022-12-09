import React, { useEffect, useState } from 'react';
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"

//css
import "./Styles/FormSection.css"

function App() {

    const [user, setUser] = useState({
        fName: "", lName: "", email: "", phone: "", message: ""
    })

    const [resume, setFile] = useState(null);

    let name, value;

    async function postData(e) {
        e.preventDefault();

        const { fName, lName, email, phone, message } = user;
        // console.log(fName + lName + email + phone + resume + message);

        const formData = new FormData();

        if (fName && lName && email && phone && message) {
            formData.append('fName', fName);
            formData.append('lName', lName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('message', message);
            formData.append('resume', resume);

            axios.post("http://localhost:8000/upload", formData).then(async (data) => {
                // const data = await res.json();
                console.log(data);
                if (data.status === 200) {
                    window.alert('Successfully Uploaded')
                }
                if (data.status === 400) {
                    window.alert('file not uploaded')
                }
            })
        } else {
            window.alert('Enter All Details !!!!')
        }

        setUser({ ...user, fName: "", lName: "", email: "", phone: "", message: "" })
        setFile(null)
    }

    const handleInputs = (e) => {
        // console.log(user);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })

    }

    const handleFile = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0])
            console.log(e.target.files[0]);
        } else {
            window.alert('Upload File')
        }
    }

    return (
        <section id="forms-section">
            <form className="form-wrapper">

                <div className="name-input">
                    <input
                        placeholder="First Name"
                        type="text"
                        required
                        id="name"
                        name="fName"
                        onChange={handleInputs}
                        value={user.fName}
                    />
                    <input
                        placeholder="Last Name"
                        type="text"
                        required
                        id="name"
                        name="lName"
                        onChange={handleInputs}
                        value={user.lName}
                    />
                </div>

                <div>
                    <input
                        placeholder="Email"
                        type="email"
                        id="emailid"
                        name="email"
                        required
                        onChange={handleInputs}
                        value={user.email}
                    />
                </div>

                <div>
                    <input
                        placeholder="10 digit Phone No."
                        type="tel"
                        id="phoneno"
                        name="phone"
                        required
                        onChange={handleInputs}
                        value={user.phone}
                    />
                </div>

                <label className="upload-resume">
                    <span style={{ margin: "1rem" }}>
                        <FontAwesomeIcon icon={faFileUpload} size="1x" />
                    </span>
                    Upload Your Resume
                    <input
                        type="file"
                        name="resume"
                        accept='.pdf'
                        required
                        onChange={handleFile}
                    // value={resume}
                    />
                </label>

                <div>
                    <textarea
                        type="text"
                        id="for-message"
                        name="message"
                        placeholder="Enter Message"
                        rows="4"
                        onChange={handleInputs}
                        value={user.message}
                    />
                </div>

                <div className="form-btn">
                    <button
                        type='submit'
                        value="submit"
                        onClick={postData}>
                        Submit
                    </button>
                </div>
            </form>
        </section >
    );
}

export default App;
