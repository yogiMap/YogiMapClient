import React from 'react';
import { connect, Link } from 'umi';
import { Avatar, Dropdown, Menu } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { IUser } from '@/pages/user/userSearch/types';

interface IGetBack {
  adminId: string;
  adminToken: string;
}

interface IProps {
  User: IUser;
  initialValues?: IUser;
  logout: () => void;
  userImpersonateGetBack: (arg: IGetBack) => void;
}

const UserInfo = (props: IProps) => {
  const { logout, userImpersonateGetBack } = props;
  const authUser = get(props, 'User', '');

  const isTeacher = get(props, 'User.isTeacher', false);
  const emailConfirmed = get(props, 'User.emailConfirmation.confirmed', false);
  const teacherAccountId = get(props, 'User.teacherAccount', '');

  const userId = get(authUser, '_id', '');
  const name = get(authUser, 'name', '');
  const adminId = localStorage.getItem('adminId');
  const adminToken = localStorage.getItem('adminToken');

  const isAvatar = get(authUser, 'avatar', false);
  const avatarImg = isAvatar[1];

  const isAuthLoading = get(props, 'LoadingEffects.User/auth', false);
  if (isAuthLoading) return null;

  const menu = (
    <Menu>
      <Menu.Item key="profile" data-qa="profile">
        <Link to={`/profile/${userId}`}>Profile</Link>
      </Menu.Item>

      {/*<Menu.Item key="teacherAccount" data-qa="settings">*/}
      {/*  <Link to={`/settings/teacherAccount/${teacherAccountId}`}>Teacher Account</Link>*/}
      {/*</Menu.Item>*/}

      <Menu.Item key="settings" data-qa="settings">
        <Link to={`/settings/${userId}`}>Settings</Link>
      </Menu.Item>

      {/*{emailConfirmed && <Menu.Divider />}*/}

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

  if (userId) {
    return (
      <div className="mt-3">
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" data-qa="userInfoName" onClick={(e) => e.preventDefault()}>
            {isAvatar ? (
              <Avatar src={avatarImg} size="large" icon={<UserOutlined />} />
            ) : (
              <Avatar icon={<UserOutlined />} />
            )}
            <span className="ms-2 mr-2">{name}</span>
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
    );
  } else
    return (
      <div className="mt-3">
        <Link to={'/user/login'} data-qa="login">
          Log In
        </Link>
      </div>
    );
};

const mapStateToProps = (state: any) => ({
  User: state.User,
  LoadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch({ type: 'User/logout' }),
  userImpersonateGetBack: (payload: IGetBack) => dispatch({ type: 'User/userImpersonateGetBack', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
