import React, { useEffect, useState } from 'react';


//components
import Navbar from "../../components/Navbar/index"
import MainSection from "../AdminPage/MainSection"
import Footer from "../../components/Footer/index"

import PdfViewer from "../../components/PdfViewer/PdfViewer"


//test why 2 get requests are going to backend

function App() {

    // async function doGetRequest() {
    //     // axios.defaults.withCredentials(true);
    //     let res = await axios.get('http://localhost:8000/admin', { message: 'send data' });
    //     //     let data = res.data;
    //     //     console.log(data);

    // }
    // doGetRequest();


    return (
        <>
            <Navbar page="admin" />
            <MainSection />
            <Footer />
        </>
    );
}

export default App;