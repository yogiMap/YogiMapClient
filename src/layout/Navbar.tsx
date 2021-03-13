import React from 'react';
import { Link } from 'umi';
import AdminMenu from '@/layout/_menu/AdminMenu';
import TopMenu from '@/layout/_menu/TopMenu';
import UserInfo from '@/pages/user/topInfo/UserInfo';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light-">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          YogiMap
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <AdminMenu />
        <TopMenu />
        <UserInfo />
      </div>
    </nav>
  );
};

export default Navbar;
