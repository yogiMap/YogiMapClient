import React, { useState } from 'react';
import { Link } from 'umi';

const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);

import AdminMenu from '@/layout/_menu/AdminMenu';
import TopMenu from '@/layout/_menu/TopMenu';
import UserInfo from '@/pages/user/topInfo/UserInfo';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light-'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          YogiMap
        </Link>

        <button className='custom-toggler navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarsExample09'
                aria-controls='navbarsExample09'
                aria-expanded={!isNavCollapsed ? true : false}
                aria-label='Toggle navigation'
                onClick={handleNavCollapse}>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id='navbarsExample09'>
          <div className='d-flex justify-content-end'>
            <UserInfo />
            <TopMenu />
            <AdminMenu />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
