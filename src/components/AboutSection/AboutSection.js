// AboutSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './AboutSection.module.css';

const AboutSection = ({ isMobile }) => {
  const [scrollY, setScrollY] = useState(0);
  const aboutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Remove the inline mobile styles and handle everything in CSS
  return (
    <div id="me" ref={aboutRef} className={`${styles.aboutSection} content-box ${isMobile ? styles.mobileView : ''}`}>
      <div className={styles.logoContainer}>
        <a 
          href="https://github.com/tdeu" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.logoLink}
        >
          <img 
            src="/images/Github_logo.svg" 
            alt="GitHub Profile" 
            className={styles.logo}
          />
        </a>
        <a 
          href="https://medium.com/@0xkodit" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.logoLink}
        >
          <img 
            src="/images/logo_medium.svg" 
            alt="Medium Profile" 
            className={`${styles.logo} ${styles.mediumLogo}`}
          />
        </a>
      </div>
      <div className={styles.textContent}>
        <p>
          I am TL;DR - these are both my initials and my approach to life and work. I believe in keeping codes and words simple and concise. My passion for innovation, blockchain and nature fuels my creativity, allowing me to cultivate clarity in the digital wilderness.
        </p>
        <p>
          At <a href="https://kodit.ai/" className="preselected">kodit.ai</a>, I channel these diverse interests, distill complex ideas into their essence, and build innovative solutions.
          <a href="https://t.me/tderouck" className="preselected">let's Collaborate</a>
        </p>
      </div>
    </div>
  );
};

export default AboutSection;