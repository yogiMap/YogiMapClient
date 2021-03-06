import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
import { IUser } from '@/pages/user/userSearch/types';
import { Dropdown, Menu } from 'antd';

interface IProps {
  User: IUser;
}

const TopMenu = (props: IProps) => {
  const location = get(props, 'location.pathname', '');
  const acl = get(props, 'User.acl', []);
  const roles = get(props, 'User.roles', []);

  const isAdmin = roles.includes('admin');
  if (!isAdmin) return null;

  const menuItems = [
    { path: '/style', name: 'Style', perm: 'style.get.own' },
    { path: '/classType', name: 'Type', perm: 'classType.get.own' },
    { path: '/telephony', name: 'Telephony', perm: 'user.delete.any' },
    { path: '/users', name: 'Users', perm: 'user.auth' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
    isVisible: acl.includes(el.perm),
  }));

  const menu = (
    <Menu>
      {menuItems.map(
        (el) =>
          el.isVisible && (
            <Menu.Item key={el.path}>
              <Link to={el.path}>{el.name}</Link>
            </Menu.Item>
          ),
      )}
    </Menu>
  );

  return (
    <div id="admin-menu" role="menu" className="mt-3">
      <Dropdown overlay={menu}>
        <span className="ant-dropdown-link pointer item">Admin</span>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  User: state.User,
});

export default withRouter(connect(mapStateToProps)(TopMenu));
