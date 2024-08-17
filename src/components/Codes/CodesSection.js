import React from 'react';
import styles from './CodesSection.module.css';
import GitHubRepos from '../github/GitHubRepos';

const CodesSection = () => {
  return (
    <section className={`${styles.codesSection} content-box`}>
      <h2 className="section-title">Coding Sandbox</h2>
      <p>
        This is where I am experimenting and keep my half-baked ideas into codes. 
        It's messy, imperfect but it's how I'm learning to cultivate clarity in this vast world of code:
      </p>
      <GitHubRepos username="tdeu" />
    </section>
  );
};

export default CodesSection;