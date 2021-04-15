import React from 'react';
import { connect, Link } from 'umi';
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import Permission from '@/utils/permission/permission';

interface IGetBack {
  adminId: string;
  adminToken: string;
}

interface IProps {
  Account: IUserAccount;
  logout: () => void;
  userImpersonateGetBack: (arg: IGetBack) => void;
}

const UserInfoNavCollapse = (props: IProps) => {
  const { logout, userImpersonateGetBack } = props;
  const authUser = get(props, 'Account', '');

  const isAvatar = get(authUser, 'avatar', false);
  const avatar = get(authUser, 'avatar', '');
  const userId = get(authUser, '_id', '');
  const name = get(authUser, 'name', '');
  const adminId = localStorage.getItem('adminId');
  const adminToken = localStorage.getItem('adminToken');

  const isAuthLoading = get(props, 'LoadingEffects.Account/auth', false);
  if (isAuthLoading) return null;

  const menu = (
    <Menu>
      <Menu.Item key="profile" data-qa="profile">
        <Link to={`/profile/${userId}`}>Profile</Link>
      </Menu.Item>

      <Menu.Item key="shop" data-qa="shop">
        <Permission perm="shop.product.get.all">
          <Link to={'/shop'}>Shop</Link>
        </Permission>
      </Menu.Item>

      <Menu.Item key="settings" data-qa="settings">
        <Link to={`/settings/${userId}`}>Settings</Link>
      </Menu.Item>

      <Menu.Item key="orders" data-qa="orders">
        <Link to={`/orders/${userId}`}>Orders</Link>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout" onClick={logout} data-qa="logout">
        Logout
      </Menu.Item>

      {adminId && adminToken && (
        <Menu.Item key="userImpersonateGetBack" onClick={() => userImpersonateGetBack({ adminId, adminToken })}>
          Get back to admin
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      {name && (
        <div className="ml-2">
          <Dropdown className="d-flex align-items-center" overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              {isAvatar ? <Avatar src={avatar} size="large" /> : <Avatar icon={<UserOutlined />} />}
            </a>
          </Dropdown>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
  LoadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch({ type: 'Account/logout' }),
  userImpersonateGetBack: (payload: IGetBack) => dispatch({ type: 'UsersDashboard/userImpersonateGetBack', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoNavCollapse);
