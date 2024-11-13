import React from 'react'
import HomePage from '../pages/Homepage/HomePage'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
const Lander = () => {
  return (
    <div>
       <div id="homeSection">
        <HomePage />
      </div>

      <div id="aboutSection">
        <About />
      </div>

      <div id="contactSection">
        <Contact />
      </div>

      <Footer />

      </div>
  )
}

export default Lander
