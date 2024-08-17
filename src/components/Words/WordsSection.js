import React from 'react';
import styles from './WordsSection.module.css';
import MediumArticles from '../Medium/MediumArticles';

const WordsSection = () => {
  return (
    <section className={`${styles.wordsSection} content-box`}>
      <h2 className="section-title">Digital Words</h2>
      <p>
        Here, I keep ideas and reflections as I navigate the vast expanse of technology and culture. It's a bit chaotic, often unpolished, but always genuine.
      </p>
      <MediumArticles username="0xkodit" />
    </section>
  );
};

export default WordsSection;