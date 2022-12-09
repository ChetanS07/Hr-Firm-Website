import React, { useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faPhone, faFile, faClipboard } from '@fortawesome/free-solid-svg-icons'

import "./styles/CandidateCard.css"

function App(props) {

    const [remark, setRemark] = useState("");
    const [viewPdf, setViewPdf] = useState(false);

    const postData = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('applId', props.id)
        formData.append('position', remark)
        axios.post('http://localhost:8000/update', formData).then(res => {
            console.log(res.data);
        })
        setRemark("")
        window.location.reload()
    }


    const openPdf = () => {

        if (props.fileName)
            axios('http://localhost:8000/viewPDF', {
                method: 'POST',
                responseType: 'blob', //Force to receive data in a Blob Format
                data: {
                    fileName: props.fileName
                }
            })
                .then(response => {//Create a Blob from the PDF Stream
                    const file = new Blob(
                        [response.data],
                        { type: 'application/pdf' });//Build a URL from the file
                    const fileURL = URL.createObjectURL(file);//Open the URL on new Window
                    window.open(fileURL);
                })
                .catch(error => {
                    console.log(error);
                });
    }


    return (
        <div className='candidate-info'>

            <div className='name'>
                <FontAwesomeIcon icon={faUser} />
                <div>
                    {props.name}
                </div>

            </div>

            <div className='resume'>
                <button
                    onClick={openPdf}
                >
                    <FontAwesomeIcon icon={faFile} />
                    <br></br>
                    Resume
                </button>
            </div>

            <div className='note'>
                <FontAwesomeIcon icon={faClipboard} />
                {props.status === 'Reviewed' ? <div>{props.remark}</div> : <div>{props.note}</div>}
            </div>

            <div className='contact'>
                <div className='email'>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <div> {props.email}</div>
                    <button>
                        <a
                            style={{ textDecoration: "none", color: "#eee" }}
                            href={"mailto:" + props.email}
                        >Send Email</a>
                    </button>

                </div>
                <div className='phone'>
                    <FontAwesomeIcon icon={faPhone} />
                    <div>{props.phone}</div>
                </div>
            </div>

            {
                props.status === 'Pending'
                    ? <form className='review-form'>
                        <div className='remark'>
                            <h4>Add Remark</h4>
                            <input
                                placeholder='suitable position'
                                name='remark'
                                onChange={(e) => {
                                    // console.log(e.target.value);
                                    setRemark(e.target.value)
                                }}
                                value={remark}
                            />
                        </div>

                        <div className='review'>
                            <button
                                type='submit'
                                onClick={postData}
                            >
                                Mark as Reviewed</button>
                        </div>
                    </form>
                    :
                    <></>
            }

        </div >
    );
}

export default App;