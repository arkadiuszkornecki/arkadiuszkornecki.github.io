import './styles.css'
import "tailwindcss"
import {Link} from "react-router-dom"
import { HashLink } from 'react-router-hash-link';

import {Database, PanelTop, Code, Mail, Globe} from "lucide-react"

import smallLogo from "@/assets/small-logo.png";
import profileLogo from "@/assets/profile.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faReddit, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {useState} from "react";

export default function Bio() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <div id="container">
            <div id="nav-bar">
                <a href="https://arkadiuszkornecki.github.io/"><img src={smallLogo} alt="logo"/></a>
                <div id="menu" className={menuOpen ? "menu open" : "menu"}>
                    <ul>
                        <li><HashLink to="#home" onClick={() => setMenuOpen(false)}>HOME</HashLink></li>
                        <li><HashLink to="#aboutme" onClick={() => setMenuOpen(false)}>ABOUT</HashLink></li>
                        <li><HashLink to="#service" onClick={() => setMenuOpen(false)}>SERVICE</HashLink></li>
                        <li><HashLink to="#experiences" onClick={() => setMenuOpen(false)}>EXPERIENCE</HashLink></li>
                        <li><HashLink to="#contact" onClick={() => setMenuOpen(false)}>CONTACT</HashLink></li>
                        <li><Link to={"/quiz"}>QUIZZES</Link></li>
                    </ul>
                </div>
                <button type="button" className={`burger ${menuOpen ? "active" : ""}`} onClick={handleClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div id="home">
                <div id="img_photo">
                    <img src={profileLogo} alt="photo"/>
                </div>
                <div id="about">
                    <h4 className="font-bold">Hello, Welcome</h4>
                    <h1 className="font-bold">I'm Arkadiusz Kornecki</h1>
                    <p>I'm junior Python backend developer</p>
                    <button type="button" className="contact_us_home"><a href="#contact">Contact us</a></button>
                </div>
            </div>
            <div id="aboutme">
                <div id="img">
                    <div id="image_border"></div>
                    <img src={profileLogo} alt="photo"/>
                </div>
                <div id="description">
                    <h1 className="font-bold">About <span className="text-primary">Me</span></h1>
                    <p>I'm still learning Python. In the future I'm going to be professional Python backend
                        developer</p>
                    <button type="button" className="contact_us_home"><a href="#contact">Contact us</a></button>
                </div>
            </div>
            <div id="service">
                <div id="service_title">
                    <h1 className="font-bold">My <span className="text-primary">Service</span></h1>
                </div>
                <div id="service_section">
                    <div className="service_item">
                        <Database className="text-primary w-12 h-16 "/>
                        <h3 className="font-bold">Database<br/>service</h3>
                        <p>I have a basic knowledge of SQL.<br/>I use DBMS like MySQL</p>
                    </div>
                    <div className="service_item">
                        <PanelTop className="text-primary w-12 h-16 "/>
                        <h3 className="font-bold">Web<br/>Development</h3>
                        <p>I know HTML, CSS, JavaScript and basics of PHP, React, TypeScript and Tailwind</p>
                    </div>
                    <div className="service_item">
                        <Code className="text-primary w-12 h-16 "/>
                        <h3 className="font-bold">Website<br/>backend</h3>
                        <p>I write in Python using frameworks<br/>like Django or Flask<br/> - <b>still learning</b></p>
                    </div>
                </div>
            </div>
            <div id="experiences">
                <div id="experiences_title">
                    <h1 className="font-bold">My <span className="text-primary">Experiences</span></h1>
                </div>
                <div id="experiences_section">
                    <div className="experience">
                        <h5>April- 2023 - 2024</h5>
                        <h1 className="font-bold">Web designer</h1>
                        <h6 className="font-bold">HTML, CSS, JavaScript</h6>
                        <p>I made some websites</p>
                    </div>
                    <div className="experience">
                        <h5>February- 2024 - 2025</h5>
                        <h1 className="font-bold">Python Developer</h1>
                        <h6 className="font-bold">Python, Tkinter</h6>
                        <p>I made GUI desktop apps</p>
                    </div>
                    <div className="experience">
                        <h5>February- 2025 - January 2026</h5>
                        <h1 className="font-bold">Python - Backend web developer</h1>
                        <h6 className="font-bold">Python, Django, Flask</h6>
                        <p>I made small web apps</p>
                    </div>
                    <div className="experience">
                        <h5>March - 2026 - now</h5>
                        <h1 className="font-bold">Web Developer</h1>
                        <h6 className="font-bold">React with TypeScript and Tailwind</h6>
                        <p>I made small web apps</p>
                    </div>
                </div>
            </div>
            <div id="contact">
                <div id="contact_title">
                    <h1 className="font-bold">Contact <span className="text-primary ">Me</span></h1>
                </div>
                <div id="contact_section">
                    <div className="contact_method">
                        <a href="mailto:#"><Mail className="w-20 h-20"/></a>
                    </div>
                    <div className="contact_method">
                        <a href="https://arkadiuszkornecki.github.io"><Globe className="w-20 h-20"/></a>
                    </div>
                </div>
            </div>
            <div id="footer">
                <div id="footer_items">
                    <a href="https://github.com/arkadiuszkornecki"><FontAwesomeIcon icon={faGithub} /></a>
                    <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="#"><FontAwesomeIcon icon={faLinkedin} className="text-primary"/></a>
                    <a href="#"><FontAwesomeIcon icon={faReddit} /></a>
                    <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                </div>
            </div>
        </div>
    )
}