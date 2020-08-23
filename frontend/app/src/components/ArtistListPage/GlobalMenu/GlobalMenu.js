import React, { useEffect, useState } from 'react';
import styles from './GlobalMenu.module.css';


const GlobalMenu = (props) => {
  const [turningScrollpos, setTurningScrollpos] = useState(30);
  const [scrolled, setScrolled] = useState(false);

  // スクロールを認知したらhandleScrollを実行
  useEffect(() => {
    window.addEventListener("scroll",handleScroll);
    return () => {
      window.removeEventListener("scroll",handleScroll)
    }
  });

  // スクロールしているのか否か判断する関数
  const handleScroll = () => {
    // window.pageYOffsetは垂直方向のスクロール量
    // currentScrollPosはスクロールした量
    const currentScrollPos = window.pageYOffset;
    const scrolled = turningScrollpos < currentScrollPos;
    setScrolled(scrolled)
  };

  return (
    <div className={`${styles.menubar} ${scrolled ? styles.hidden : null}`}>
      <div className={styles.namebox}>
        <a href="#">
          <h1 className={`${styles.title} ${scrolled ? styles.hidden_title : null}`}>Amato MUSIC</h1>
        </a>
      </div>
      
      <div className={styles.menu}>
        <nav>
          <ul>
            <li><a href="#"><i className="fas fa-user"></i>My Profile</a></li>
            <li><a href="#"><i className="fas fa-home"></i>Home</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default GlobalMenu;
