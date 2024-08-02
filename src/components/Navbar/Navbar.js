import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
<Link to="/" className={styles.navLogo}>
  <img src="/images/tldr_logo.png" alt="TL;DR" />
</Link>
<div className={styles.hamburger} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        <li className={styles.navItem}><Link to="/" className={styles.navLink}>Home</Link></li>
        <li className={styles.navItem}><Link to="/dapps" className={styles.navLink}>Codes</Link></li>
        <li className={styles.navItem}><Link to="/writings" className={styles.navLink}>Words</Link></li>
        <li className={styles.navItem}>
  <a 
    href="https://kodit.ai/" 
    className={styles.navLink}
    target="_blank" 
    rel="noopener noreferrer"
  >
    KODIT.AI
  </a>
</li>      </ul>
    </nav>
  );
};

export default Navbar;