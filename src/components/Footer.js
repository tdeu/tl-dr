import React from 'react';
import styles from './Footer.module.css';

const Footer = ({ isVisible }) => {
  return (
    <footer className={`${styles.footer} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.socialIcons}>
        <a 
          href="https://t.me/tderouck" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.preselected}
        >
          Contact
        </a>
      </div>
      <div className={styles.romanNumeral}>
        MMXXIV - TL;DR
      </div>
    </footer>
  );
};

export default Footer;