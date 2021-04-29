import React from 'react';
import { connect, Link, history, withRouter } from 'umi';
import { Menu } from 'antd';
import { UsergroupAddOutlined, IdcardOutlined, SafetyOutlined } from '@ant-design/icons';
import { get } from 'lodash';

interface IProps {}

const SettingsMenu = (props: IProps) => {
  const ownerId = get(props, 'Account._id', '');
  const teacherAccountId = get(props, 'Account.account', '');

  let menuItemName = '';

  if (history.location.pathname.split('/')[2] === 'teacherAccount') {
    menuItemName = 'Teacher account';
  } else if (history.location.pathname.split('/')[2] === 'profile') {
    menuItemName = 'Profile';
  } else if (history.location.pathname.split('/')[2] === 'security') {
    menuItemName = 'Password';
  }

  const menu = [
    {
      name: 'Teacher account',
      icon: <UsergroupAddOutlined />,
      link: `/settings/teacherAccount/${ownerId}`,
    },
    {
      name: 'Profile',
      icon: <IdcardOutlined />,
      link: `/settings/profile/${ownerId}`,
    },
    {
      name: 'Password',
      icon: <SafetyOutlined />,
      link: `/settings/security/${ownerId}`,
    },
  ];

  console.log(props);

  return (
    <Menu mode="inline" defaultSelectedKeys={[menuItemName]}>
      {menu.map((el) => (
        <Menu.Item key={el.name} disabled={!teacherAccountId && el.name !== 'Teacher account'}>
          {el.icon}
          {el.name}
          <Link to={el.link} />
        </Menu.Item>
      ))}
    </Menu>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default withRouter(connect(mapStateToProps, null)(SettingsMenu));
