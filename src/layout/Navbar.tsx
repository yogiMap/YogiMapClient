import React, { useState } from 'react';
import { connect, Link, withRouter } from 'umi';
import AdminMenu from '@/layout/_menu/AdminMenu';
import TopMenu from '@/layout/_menu/TopMenu';
import UserInfo from '@/pages/user/topInfo/UserInfo';
import logo from '@/icons/logo_yogimap.svg';
import MobileMenu from '@/pages/utils/mobileMenu/MobileMenu';
import logoSmall from '@/icons/logo_yogymap_small.svg';

const Navbar = () => {
  // const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  //
  // const toggleOpenBurgerMenu = () => setOpenBurgerMenu(!openBurgerMenu);
  // const closeBurgerMenu = () => setOpenBurgerMenu(false);

  // @ts-ignore
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

      <div className="burger-nav">
        <MobileMenu />
        <Link to="/" className="logo-burger">
          <img src={logoSmall} alt="Yogi Map LogoSmall" height={35} />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  mobileMenu: state.mobileMenu,
});

const mapDispatchToProps = (dispatch: any) => ({
  close: () => dispatch({ type: 'MobileMenu/close' }),

  open: () => dispatch({ type: 'MobileMenu/open' }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
// export default Navbar;
