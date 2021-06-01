import React from 'react';
import { connect, Link, history, withRouter } from 'umi';
import { Menu } from 'antd';
import {
  UsergroupAddOutlined,
  IdcardOutlined,
  SafetyOutlined,
  LockOutlined,
  ScheduleOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { get } from 'lodash';

interface IProps {}

const SettingsMenu = (props: IProps) => {
  const ownerId = get(props, 'Account._id', '');
  const teacherAccountId = get(props, 'Account.teacherAccount', '');
  const studentId = get(props, 'Account.student', '');

  let menuItemName = '';

  if (history.location.pathname.split('/')[2] === 'teacherAccount') {
    menuItemName = 'Teacher`s Account';
  } else if (history.location.pathname.split('/')[2] === 'student') {
    menuItemName = 'Student`s Account';
  } else if (history.location.pathname.split('/')[2] === 'profile') {
    menuItemName = 'User`s Profile';
  } else if (history.location.pathname.split('/')[2] === 'security') {
    menuItemName = 'Password';
  }

  const menu = [
    {
      name: 'User`s Profile',
      icon: <IdcardOutlined />,
      link: `/settings/profile/${ownerId}`,
    },
    {
      name: 'Password',
      icon: <SafetyOutlined />,
      link: `/settings/security/${ownerId}`,
    },
    {
      name: 'Student`s Account',
      icon: <UserAddOutlined />,
      link: `/settings/student/${ownerId}`,
    },
  ];

  const menuTeacher = [
    {
      name: 'Teacher`s Account',
      icon: <UsergroupAddOutlined />,
      link: `/settings/teacherAccount/${ownerId}`,
    },
    {
      name: 'Create Class',
      icon: <ScheduleOutlined />,
      link: `/settings/classes/${ownerId}`,
    },
    {
      name: 'Create Event',
      icon: <ScheduleOutlined />,
      link: `/settings/event/${ownerId}`,
    },
  ];

  return (
    <>
      <Menu mode="inline" defaultSelectedKeys={[menuItemName]}>
        {menu.map((el) => (
          <Menu.Item key={el.name}>
            {el.icon}
            {el.name}
            <Link to={el.link} />
          </Menu.Item>
        ))}
      </Menu>
      <Menu mode="inline" defaultSelectedKeys={[menuItemName]} className="mt-4 border-top">
        {menuTeacher.map((el) => (
          <Menu.Item key={el.name} disabled={!teacherAccountId && el.name !== 'Teacher`s Account'}>
            {el.icon}
            {el.name}
            <Link to={el.link} />
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default withRouter(connect(mapStateToProps, null)(SettingsMenu));
