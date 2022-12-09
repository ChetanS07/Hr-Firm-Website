import React, { useState } from 'react';
// import { Document, Page, ReactPDF } from 'react-pdf';
import axios from "axios"

function App() {

    const [pdf, setPdf] = useState();

    // axios.get("http://localhost:8000/viewPDF").then((res) => {
    //     setPdf(res)
    // })

    axios('http://localhost:8000/viewPDF', {
        method: 'GET',
        responseType: 'blob' //Force to receive data in a Blob Format
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

    return (
        <div>
        </div>
    );
}

export default App;