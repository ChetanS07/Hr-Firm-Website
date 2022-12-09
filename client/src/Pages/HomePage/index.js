import React from 'react';

import Navbar from "../../components/Navbar/index"
import HeroSection from "./HeroSection/index"
import AboutSection from "./AboutSection/index"
import FormSection from "./FormSection/index"
import Footer from "../../components/Footer/index"

function App() {

    return (
        <>
            <Navbar />
            <HeroSection />
            <AboutSection />
            <FormSection />
            <Footer />
        </>

    );
}


export default App;