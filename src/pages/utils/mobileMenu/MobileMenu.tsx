import React, { useState } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Button, Drawer } from 'antd';
import { IMobileMenu } from '@/pages/utils/mobileMenu/types';
import TopMenu from '@/layout/_menu/TopMenu';
import burger from '@/icons/burger.svg';
import UserInfo from '@/pages/user/topInfo/UserInfo';

interface IProps extends IMobileMenu {
  MobileMenu: IMobileMenu;
  close: () => void;
}

const MobileMenu = (props: IProps) => {
  const open = get(props, 'MobileMenu.open', false);
  const component = get(props, 'MobileMenu.component', '');
  const title = get(props, 'MobileMenu.title', '');
  const width = get(props, 'MobileMenu.width', '80%');

  const showDrawer = () => {
    props.open();
  };

  const onCloseDrawer = () => {
    props.close();
  };

  return (
    <>
      <div className="burger">
        <button onClick={showDrawer} className="btn btn-outline-secondary">
          <img src={burger} alt="click me" height={35} />
        </button>
      </div>

      <Drawer title={title} width={width} onClose={onCloseDrawer} visible={open} placement={'left'}>
        <nav className="mobile-nav">
          <div className="mobile-nav__items">
            <TopMenu />
          </div>
          <div className="mobile-user-info">
            <UserInfo />
          </div>
        </nav>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  MobileMenu: state.MobileMenu,
});

const mapDispatchToProps = (dispatch: any) => ({
  close: () => dispatch({ type: 'MobileMenu/close' }),
  open: () => dispatch({ type: 'MobileMenu/open' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
