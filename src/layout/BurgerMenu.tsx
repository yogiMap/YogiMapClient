import React, { useState } from 'react';
import { Link } from 'umi';
import logoSmall from '@/icons/logo_yogymap_small.svg';
import burger from '@/icons/burger.svg';
import UserInfo from '@/pages/user/topInfo/UserInfo';
import TopMenu from '@/layout/_menu/TopMenu';

const BurgerMenu = (props: any) => {

  const {openBurgerMenu, toggleOpenBurgerMenu, closeBurgerMenu} = props;

  return (
    <div>
      <div className="burger-nav">
        <div className="burger">
          <button onClick={toggleOpenBurgerMenu} className="btn btn-outline-secondary">
            <img src={burger} alt="click me" height={35} />
          </button>
        </div>

        <Link to="/" className="logo-burger" onClick={closeBurgerMenu}>
          <img src={logoSmall} alt="Yogi Map LogoSmall" height={35} />
        </Link>
        {openBurgerMenu && (
          <>
            <nav className="mobile-nav">
              <div className="mobile-nav__items">
                <TopMenu />
              </div>
              <div className="mobile-user-info">
                <UserInfo />
              </div>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;