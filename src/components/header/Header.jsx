// import React from 'react'
import styles from "./header.module.css";

function Header() {
    return (
        <div className={`flex items-center justify-evenly text-xl ${styles.body}`}>
            <a href="#hero">Hero</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#services">Services</a>
            <a href="#timeline">Timeline</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
        </div>
    );
}

export default Header;
