import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { Dropdown, Menu } from 'antd';

interface IProps {
  User: IUser;
}

const TopMenu = (props: IProps) => {
  const location = get(props, 'location.pathname', '');
  const acl = get(props, 'User.acl', []);
  const roles = get(props, 'User.roles', []);

  const menuItems = [
    { path: '/base', name: 'Base', perm: 'base.get.own' },
    { path: '/users', name: 'Users', perm: 'user.delete.any' },
    { path: '/admin/challenge', name: 'Challenges', perm: 'challenge.update.any' },
    { path: '/telephony', name: 'Telephony', perm: 'telephony.call.generate.token' },
    { path: '/admin-order', name: 'Orders', perm: 'shop.product.create' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
    isVisible: acl.includes(el.perm),
  }));

  // role shop is supposed to see only "shop" submenu etc., so individual permissions are also implemented inside child components
  const rolesAllowedToAccessAdmin = ['admin', 'shop', 'challenge', 'telephony'];

  // check whether current user roles include at least one of roles that are allowed to access admin menu
  const adminIsPermitted: boolean = roles.some((role: string) => rolesAllowedToAccessAdmin.includes(role));

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
    <div id="top-menu" role="menu" className="d-flex align-items-center">
      {adminIsPermitted && (
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Admin
          </a>
        </Dropdown>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  User: state.User,
});

export default withRouter(connect(mapStateToProps)(TopMenu));
