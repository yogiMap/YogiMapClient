import React, { useState } from 'react';
import { Link } from 'umi';
import AdminMenu from '@/layout/_menu/AdminMenu';
import TopMenu from '@/layout/_menu/TopMenu';
import UserInfo from '@/pages/user/topInfo/UserInfo';
import logo from '@/icons/logo_yogimap.svg';
import BurgerMenu from '@/layout/BurgerMenu';

const Navbar = () => {
  return (
    <div>
      <div className="main-nav">
        <nav className="main-nav__items">
          <Link to="/" className="site-name text-nowrap">
            <img src={logo} alt="Yogi Map Logo" height={40} className="logo mr-2" />
          </Link>

          <div className="main-nav__item">
            <TopMenu />
          </div>

          <div className="main-nav__item">
            <AdminMenu />
          </div>

          <div className="main-nav__item">
            <UserInfo />
          </div>
        </nav>
      </div>

      <BurgerMenu />
    </div>
  );
};

export default Navbar;
