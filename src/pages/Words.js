import React from 'react';
import styles from './Writings.module.css';
import MediumArticles from '../components/Medium/MediumArticles';  // Adjust the import path as needed

const Writings = () => {
  return (
    <div className={styles.writingsContainer}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1 className={styles.pageTitle}>Welcome to my digital journal</h1>
      <p className={styles.description}>
        Here, I'm keeping ideas and reflections 
        as I navigate the vast expanse of technology and culture. It's a bit chaotic, 
        often unpolished, but always genuine.
      </p>
      <MediumArticles username="0xkodit" />
    </div>
  );
};

export default Writings;