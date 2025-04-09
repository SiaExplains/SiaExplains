"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from './MenuBar.module.scss';

const MenuBar: React.FC = () => {
    const [openBurger, setOpenBurger] = useState(false);
    const toggleBurger = () => {
        setOpenBurger((prev) => !prev);
    };


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
    <nav className={styles.menuBar}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}><a href="#">My Book</a></li>

        <li className={styles.menuItem}>
          <button className={styles.dropdownButton} onClick={toggleDropdown}>
            Projects
            <span className={`${styles.chevron} ${isDropdownOpen ? styles.open : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdown} ref={dropdownRef}>
              <div className={styles.dropdownSection}>
                <strong>Browse by type:</strong>
                <ul>
                  <li>📄 Articles</li>
                  <li>💵 Book Notes</li>
                  <li>🎥 Videos</li>
                  <li>🎧 Podcast</li>
                  <li>📬 Newsletter</li>
                </ul>
              </div>
              <div className={styles.dropdownSection}>
                <strong>Browse by topic:</strong>
                <ul>
                  <li>⚙️ Productivity</li>
                  <li>🧑‍💻 YouTube</li>
                  <li>📚 Studying</li>
                  <li>💼 Online Business</li>
                  <li>🧰 Tools & Tech</li>
                  <li className={styles.link}><a href="#">all categories →</a></li>
                </ul>
              </div>
            </div>
          )}
        </li>

        <li className={styles.menuItem}><a href="#">Channels</a></li>
        <li className={styles.menuItem}><a href="#">Roadmap</a></li>
      </ul>
    </nav>
    <div className={styles.burgerMenuContainer}>
        <div className={styles.menuBurger} onClick={toggleBurger}>
            <div className={`${styles.menuBurgerLine} ${isDropdownOpen ? styles.open : ''}`} />
            <div className={`${styles.menuBurgerLine} ${isDropdownOpen ? styles.open : ''}`} />
            <div className={`${styles.menuBurgerLine} ${isDropdownOpen ? styles.open : ''}`} />
        </div>
        <div className={`${styles.burgerMenu} ${openBurger ? styles.open : ''}`}>
        <ul className={styles.burgerMenuList}>
            <li className={styles.burgerMenuItem}><a href="#">My Book</a></li>
            <li className={styles.burgerMenuItem}><a href="#">Projects</a></li>
            <li className={styles.burgerMenuItem}><a href="#">Channels</a></li>
            <li className={styles.burgerMenuItem}><a href="#">Roadmap</a></li>
        </ul>
    </div>
    </div>

    </>
  );
};

export default MenuBar;
