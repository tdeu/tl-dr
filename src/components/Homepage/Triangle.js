import React from 'react';
import styles from './Triangle.module.css';

const Triangle = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.heroContent}>
        <h1 className={styles.mainTitle}>
          <span className={styles.selectedText}>TL;DR</span>
        </h1>
        <p className={styles.subtitle}>Cultivating <br /> Digital <br />Clarity</p>
      </div>
    </div>
  );
};

export default Triangle;