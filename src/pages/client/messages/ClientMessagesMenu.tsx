import React from 'react';
import { connect, Link } from 'umi';
import { Menu } from 'antd';

import { get } from 'lodash';

interface IProps {}

const ClientMessagesMenu = (props: IProps) => {
  const menu = [
    {
      name: 'Phone Number',
      link: `phone`,
    },
    {
      name: 'Viber',
      link: `viber`,
    },
    {
      name: 'Whatsapp',

      link: `whatsapp`,
    },
    {
      name: 'Email',

      link: `email`,
    },
    {
      name: 'Telegram',
      link: `telegram`,
    },
  ];
  return (
    <Menu mode="inline">
      {menu.map((el) => (
        <Menu.Item key={el.name}>
          {el.name}
          <Link to={el.link} />
        </Menu.Item>
      ))}
    </Menu>
  );
};

const mapStateToProps = (state: any) => ({ location: state.router.location });

export default connect(mapStateToProps, null)(ClientMessagesMenu);
