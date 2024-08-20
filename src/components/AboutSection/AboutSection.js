import React from 'react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  return (
    <div className={`${styles.aboutSection} content-box`}>
      <h2 className={`section-title ${styles.logoContainer}`} style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
        <a 
          href="https://github.com/tdeu" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ lineHeight: 0 }}
          className={styles.logoLink}
        >
          <img 
            src="/images/Github_logo.svg" 
            alt="GitHub Profile" 
            style={{ height: '1.5em', verticalAlign: 'middle' }}
            className={styles.logo}
          />
        </a>
        <a 
          href="https://medium.com/@0xkodit" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ lineHeight: 0, position: 'relative', left: '-8px', top: '-5px' }}
          className={styles.logoLink}
        >
          <img 
            src="/images/logo_medium.svg" 
            alt="Medium Profile" 
            style={{ height: '1.4em', verticalAlign: 'middle' }}
            className={styles.logo}
          />
        </a>
      </h2>
      <p>
        I am <span className="preselected">TL;DR</span> - these are both my initials and my approach to life and work. I believe in keeping codes and words simple and concise. My passion for innovation, blockchain, maps, and nature fuels my creativity, allowing me to cultivate clarity in the digital wilderness.
      </p>
      <p>
        At <a href="https://kodit.ai/" className="preselected">kodit.ai</a>, I channel these diverse interests, distill complex ideas into their essence, and build innovative solutions.
        <a href="https://t.me/tderouck" className="preselected">let's Collaborate</a>
      </p>
    </div>
  );
};

export default AboutSection;