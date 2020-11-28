import React from 'react'
import Particles from '../Components/Particles';
import InputCard from '../Components/InputCard';
import Footer from '../Components/Footer';
import '../Styles/HomePage.css';

function HomePage() {
    return (
        <div className="homePage">
            <InputCard/>      
            <Particles/>
            <Footer/>
        </div>
    )
}

export default HomePage
