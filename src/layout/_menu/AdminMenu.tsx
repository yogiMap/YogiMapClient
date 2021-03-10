import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { Dropdown, Menu } from 'antd';

interface IProps {
  Account: IUserAccount;
}

const TopMenu = (props: IProps) => {
  const location = get(props, 'location.pathname', '');
  const acl = get(props, 'Account.acl', []);
  const roles = get(props, 'Account.roles', []);

  const isAdmin = roles.includes('admin');
  if (!isAdmin) return null;

  const menuItems = [
    { path: '/users', name: 'Users', perm: 'user.auth' },
    { path: '/lineItem', name: 'LineItem', perm: 'lineItem.get.own' },
    { path: '/companyAccount', name: 'Company Accounts', perm: 'companyAccount.get.all' },
    { path: '/telephony', name: 'Telephony', perm: 'user.delete.any' },
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
    <div id="admin-menu" role="menu" className="d-flex d-print-none me-3">
      <Dropdown overlay={menu}>
        <span className="ant-dropdown-link pointer item">Admin</span>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default withRouter(connect(mapStateToProps)(TopMenu));
