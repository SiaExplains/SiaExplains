import { useState } from "react";
import Link from "next/link";
import { MenuItems } from "../Navigation/MenuItems";
import { MenuItem } from "../../types/menu-item";

const Header = () => {
  const [openBurgerMenu, setOpenBurgerMenu] = useState<boolean>(false);

  const onBurgerMenuClick = () => {
    setOpenBurgerMenu(!openBurgerMenu);
  };

  return (
    <div className="se-header">
      <div className="se-header__menu">
        {MenuItems.map((item: MenuItem, index: number) => {
          return (
            <Link
              id="category"
              className="menu-item"
              href={item.path}
              // onClick={closeSideBar}
              key={index}
              target={item.target ?? "_self"}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
      <div className="se-header__burger">
        <div onClick={onBurgerMenuClick}>
          <div className="burger-icon"></div>
          <div className="burger-icon"></div>
          <div className="burger-icon"></div>
        </div>
        <div className="mobile-title">
          <input placeholder="Search in blog..." />
        </div>
      </div>
      <div
        className={`burger-menu ${openBurgerMenu ? "burger-menu--show" : ""}`}
      >
        <div>
          <div onClick={onBurgerMenuClick}>
            <div className="burger-icon"></div>
            <div className="burger-icon"></div>
            <div className="burger-icon"></div>
          </div>
        </div>
        <a href="#about" onClick={onBurgerMenuClick}>
          About Me
        </a>
        <a href="#courses" onClick={onBurgerMenuClick}>
          Courses
        </a>
        <a href="#blog" onClick={onBurgerMenuClick}>
          Blog
        </a>
        <a href="#videos" onClick={onBurgerMenuClick}>
          Videos
        </a>
        <a href="#coaching" onClick={onBurgerMenuClick}>
          Coaching
        </a>
        <a href="#contact" onClick={onBurgerMenuClick}>
          Contact
        </a>
      </div>
    </div>
  );
};

export default Header;
