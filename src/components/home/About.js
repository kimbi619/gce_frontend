import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section className="main">
        <h3>About the project</h3>
        <p className="description-text">
            <span>Validing certificates and setting requirements for your companies or academies just got easier</span>
            <span>Please Note that the system will filter and oly return you students who meet those requirements</span>
        </p>


        <h3>Contact</h3>
        <span>Please Note that the system will filter and oly return you students who meet those requirements</span>
        <h4 className="description-text">
            <Link to="/" className="backLink">back to homepage</Link>
        </h4>
    </section>

  )
}

export default About
