// import React from 'react'
import styles from "./header.module.css";

function Header() {
    return (
        <div className={`flex items-center justify-evenly text-xl ${styles.body}`}>
            <a href="#hero">hero</a>
            <a href="#about">about</a>
            <a href="#skills">skills</a>
            <a href="#projects">projects</a>
            <a href="#services">services</a>
            <a href="#timeline">timeline</a>
            <a href="#testimonials">testimonials</a>
            <a href="#contact">contact</a>
        </div>
    );
}

export default Header;
