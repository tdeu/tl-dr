import React, { useEffect, useRef } from 'react';
import styles from './AboutSection.module.css';
import githubLogo from '../../images/Github_logo.svg';
import mediumLogo from '../../images/logo_medium.svg';

const AboutSection = ({ isMobile }) => {
  const aboutRef = useRef(null);

  return (
    <div 
      id="me" 
      ref={aboutRef} 
      className={`${styles.aboutSection} content-box ${styles.aboutContent} ${isMobile ? styles.mobileView : ''}`}
    >
      <div className={`${styles.logoContainer} ${isMobile ? styles.mobileLogoContainer : ''}`}>
        <a 
          href="https://github.com/tdeu" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.logoLink}
        >
          <img 
            src={githubLogo} 
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
            src={mediumLogo}
            alt="Medium Profile" 
            className={`${styles.logo} ${styles.mediumLogo}`}
          />
        </a>
      </div>
      <div className={styles.textContent}>
        <div className={styles.textWrapper}>
          <p>
            I am TL;DR - these are both my initials and my approach to life and work. 
            I believe in keeping codes and words simple and concise. My passion for 
            innovation, blockchain and nature fuels my creativity, allowing me to 
            cultivate clarity in the digital wilderness.
          </p>
          <p>
            At <a href="https://kodit.ai/" className={styles.preselected}>kodit.ai</a>, 
            I channel these diverse interests, distill complex ideas into their essence, 
            and build innovative solutions.{' '}
            <a href="https://t.me/tderouck" className={styles.preselected}>let's Collaborate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;