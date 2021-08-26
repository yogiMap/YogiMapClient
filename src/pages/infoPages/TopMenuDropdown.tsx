import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
import classNames from 'classnames';
import { IUser } from '@/pages/user/userSearch/types';
import { Dropdown, Menu } from 'antd';
import menuIcon from '@/icons/burger.svg';
import AdminMenu from '@/pages/infoPages/AdminMenu';

interface IProps {
  User: IUser;
}

const TopMenuDropdown = (props: IProps) => {
  const location = get(props, 'location.pathname', '');
  const acl = get(props, 'User.acl', []);

  const menuItems = [
    { path: '/classes', name: 'Classes', perm: null },
    { path: '/type', name: 'TeacherType', perm: null },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
    isVisible: !el.perm || acl.includes(el.perm),
  }));

  const menu = (
    <Menu>
      {menuItems.map(
        (el) =>
          el.isVisible && (
            <Menu.Item key={el.path} className={classNames('item', { active: el.isActive })}>
              <Link to={el.path}>{el.name}</Link>
            </Menu.Item>
          ),
      )}
      <Menu.Item key={'/admin'}>
        <AdminMenu />
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <img src={menuIcon} alt="menu icon" height="32" className="pointer" />
    </Dropdown>
  );
};

const mapStateToProps = (state: any) => ({
  User: state.User,
});

export default withRouter(connect(mapStateToProps)(TopMenuDropdown));
