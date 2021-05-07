import React, { useState } from 'react';
import { Link } from 'umi';
import logo from '@/icons/logo_yogimap.svg';
import logoSmall from '@/icons/logo_yogymap_small.svg';
import burger from '@/icons/burger.svg';
import UserInfo from '@/pages/user/topInfo/UserInfo';
import AdminMenu from '@/layout/_menu/AdminMenu';
import TopMenu from '@/layout/_menu/TopMenu';

const BurgerMenu = () => {
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const [burgerShow, setBurgerShow] = useState(false);

  const toggleOpenBurgerMenu = () => setOpenBurgerMenu(!openBurgerMenu);
  const toggleBurgerShow = () => setBurgerShow(!burgerShow);

  return (
    <div>
      <div className="burger-nav">
        <div className="burger">
          <button onClick={toggleOpenBurgerMenu}>
            <img src={burger} alt="click me" height={35} />
          </button>
        </div>

        <Link to="/" className="logo-burger">
          <img src={logoSmall} alt="Yogi Map LogoSmall" height={35} />
        </Link>
        {openBurgerMenu && (
          <>
            <nav className="mobile-nav">
              {/*<div className="mobile-user-info">*/}
              {/*  <UserInfo />*/}
              {/*</div>*/}
              <div className="mobile-nav__items">
                <TopMenu />
              </div>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
