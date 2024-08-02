import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Homepage.module.css';

const Homepage = () => {
  const [showBio, setShowBio] = useState(false);

  const handleExplore = () => {
    setShowBio(!showBio);
  };

  const handleLink = (destination) => {
    if (destination === 'kodit') {
      window.open('https://kodit.ai', '_blank');
    } else if (destination === 'whatsapp') {
      window.open('https://wa.me/2250701768724', '_blank');
    }
  };

  return (
    <div className={styles.homepage}>
      <div className={styles.scrollableBackground}></div>
      <div className={styles.staticContent}>
        <h1 className={styles.heroTitle}>
          Cultivating Clarity
          <br />
          <span className={styles.heroSubtitle}>in the digital wilderness</span>
        </h1>
        <button className={styles.cta} onClick={handleExplore}>
          {showBio ? "I've seen enough" : "See What I Do"}
        </button>
        {showBio && (
          <pre className={styles.bioSnippet}>
            {`if (you.needToBuild()) {
  return `}<span className={styles.link} onClick={() => handleLink('kodit')}>check out kodit.ai</span>{`;
}
  else if (you.seekCodes()) {
  return `}<Link to="/codes" className={styles.link}>"check out my codes"</Link>{`;
} 
  else if (you.seekWords()) {
  return `}<Link to="/words" className={styles.link}>"check out my words"</Link>{`;
} 
  else {
  return `}<span className={styles.link} onClick={() => handleLink('whatsapp')}>"Let's connect outside this bracket"</span>{`;
}`}
          </pre>
        )}
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <a href="https://api.whatsapp.com/send/?phone=2250701768724&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Contact</a>
          <a href="https://twitter.com/Koditxai" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Twitter</a>
          <a href="https://www.linkedin.com/in/thomas-de-rouck/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Linkedin</a>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} TL;DR
        </div>
      </footer>
    </div>
  );
};

export default Homepage;