import React, { useState } from 'react';
import axios from 'axios';

//components
import Navbar from "../../components/Navbar/index"
import Footer from "../../components/Footer/index"

//css
import "./index.css"

function App() {

    const [user, setUser] = useState(
        { userName: "", password: "" }
    );

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
        console.log(user);
    }

    async function postData(e) {

        e.preventDefault();

        const formData = new FormData();
        formData.append('username', user.userName);
        formData.append('password', user.password);

        if (user.userName && user.password) {
            axios.post("http://localhost:8000/login", formData).then(async (data) => {
                console.log(data);
                if (data.status === 200) {
                    window.alert('Successfully Logged In')
                    window.location.replace("/login/admin");
                } else {
                    console.log(data.data);
                    window.alert('Invalid Username/password Combination')
                }
            })
        } else {
            window.alert('Enter Valid Credentials')
        }

    }



    return (
        <>
            <Navbar />
            <form id='login-form'>
                <div className='username-input'>
                    <label htmlFor='username'>Username</label>
                    <input
                        id='username'
                        placeholder='Enter Username'
                        type='text'
                        required
                        name='userName'
                        onChange={handleInputs}
                        value={user.userName}
                    />
                </div>
                <div className='password-input'>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        placeholder='Enter Password'
                        type='password'
                        name='password'
                        required
                        onChange={handleInputs}
                        value={user.password}
                    />
                </div>
                <button
                    type='submit'
                    onClick={postData}
                >
                    Login
                </button>

            </form>
            <Footer />
        </>
    );
}

export default App;