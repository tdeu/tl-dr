import React from 'react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  return (
    <div className={`${styles.aboutSection} content-box`}>
      <h2 className="section-title">gm</h2>
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