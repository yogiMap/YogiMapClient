import React, { useState } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Drawer } from 'antd';
import { IMobileMenu } from '@/pages/utils/mobileMenu/types';
import TopMenu from '@/layout/_menu/TopMenu';

interface IProps extends IMobileMenu {
  MobileMenu: IMobileMenu;
  close: () => void;
}

const MobileMenu = (props: IProps) => {
  const open = get(props, 'MobileMenu.open', false);
  const component = get(props, 'MobileMenu.component', '');
  const title = get(props, 'MobileMenu.title', '');
  const width = get(props, 'MobileMenu.width', 750);

  const onCloseDrawer = () => {
    props.close();
  };

  return (
    <Drawer title={title} width={width} onClose={onCloseDrawer} visible={open}>
      <TopMenu />
    </Drawer>
  );
};

const mapStateToProps = (state: any) => ({
  MobileMenu: state.MobileMenu,
});

const mapDispatchToProps = (dispatch: any) => ({
  close: () => dispatch({ type: 'MobileMenu/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
