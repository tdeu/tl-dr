import React from 'react';
import styles from './Codes.module.css';
import GitHubRepos from '../github/GitHubRepos';  // Adjust the import path as needed

const Codes = () => {
  return (
    <div className={styles.codesContainer}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>My Coding Sandbox</h1>
      <p>This is where I am experimenting and keep my half-baked ideas into codes. </p>
      <p>It's messy, imperfect but it's how I'm learning to cultivate clarity in this vast world of code:</p>
    
      <GitHubRepos username="tdeu" />
    </div>
  );
};

export default Codes;