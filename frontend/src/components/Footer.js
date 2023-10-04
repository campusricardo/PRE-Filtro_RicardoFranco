import React from "react";
import logo from '../data/recyclingSmaller.svg'
const Footer = () => {
    return (
        <footer className='footer'>
        <ul>
        <li>
        <figure className="footer-logo">
            <img src={logo} alt="logo"></img>
            <figcaption> Standard Recycling Company Inc.</figcaption>
        </figure>
        </li>
        <li>
            <p>
                The Standard Recycling Company that is mentioned such as standard-recycling-company is an fictional company it doesn't exist.
            </p>
        </li>
        </ul>   


        </footer>
    )
}

export default Footer;