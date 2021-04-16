import React, { useState } from 'react';
import { Link } from 'umi';
import AdminMenu from '@/layout/_menu/AdminMenu';
import TopMenu from '@/layout/_menu/TopMenu';
import UserInfo from '@/pages/user/topInfo/UserInfo';
import logo from '@/icons/logo_yogimap.svg';
import UserInfoNavCollapse from '@/pages/user/topInfo/UserInfoNavCollapse';
import TopMenuDropdown from '@/pages/pages/TopMenuDropdown';

const Navbar = () => {
  // const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  // const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    // <nav className="navbar navbar-expand-xl">
    //   <div className="container flex-nowrap">
    //     <Link to="/" className="site-name text-nowrap">
    //       <img src={logo} alt="Yogi Map Logo" height={40} className="logo mr-2" />
    //     </Link>
    //
    //     <div className="navbar-toggler">
    //       <div className="d-flex align-items-center">
    //         <UserInfo />
    //         <TopMenuDropdown />
    //         <UserInfoNavCollapse />
    //       </div>
    //     </div>
    //
    //     <div className="collapse navbar-collapse">
    //       <div className="navbar-nav">
    //         <TopMenu />
    //         <AdminMenu />
    //       </div>
    //
    //
    //     </div>
    //   </div>
    // </nav>


    <nav className='navbar navbar-expand-lg navbar-light bg-light-'>
      <div className='container-fluid'>
           <Link to="/" className="site-name text-nowrap">
           <img src={logo} alt="Yogi Map Logo" height={40} className="logo mr-2" />
          </Link>

        {/*<button className='custom-toggler navbar-toggler'*/}
        {/*        type='button'*/}
        {/*        data-toggle='collapse'*/}
        {/*        data-target='#navbarsExample09'*/}
        {/*        aria-controls='navbarsExample09'*/}
        {/*        aria-expanded={!isNavCollapsed ? true : false}*/}
        {/*        aria-label='Toggle navigation'*/}
        {/*        onClick={handleNavCollapse}>*/}
        {/*  <span className='navbar-toggler-icon'></span>*/}
        {/*</button>*/}

          <div className='d-flex justify-content-end'>
            <AdminMenu />
            <TopMenu />
            <UserInfo />
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
