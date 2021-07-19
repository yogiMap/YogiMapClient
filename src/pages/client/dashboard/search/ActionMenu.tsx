import { IClient, IClientQueryParams } from '@/pages/client/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { get } from 'lodash';
import { EditOutlined } from '@ant-design/icons';

interface IClientDeleteById {
  clientId: string;
  queryParams: IClientQueryParams;
}

interface ICallClient {
  phoneNumber: string;
  userId: string;
}

interface IProps {
  row: IClient;
  open: (arg: ISidepanel) => void;
  callUser: (arg: ICallClient) => void;
  clientDeleteById: (arg: IClientDeleteById) => void;
  queryParams: IClientQueryParams;
  userId: string;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;
  const code = get(row, 'phoneNumber1.code', '');
  const number = get(row, 'phoneNumber1.number', '');
  const userPhone = `${code + number}`;
  const menuItems = [
    { key: 'delete', handler: 'delete', name: 'Delete' },
    { key: 'call', handler: 'call', name: 'call' },
  ];

  const menu = (row: IClient) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IClient) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
    if (handler === 'call') {
      const userId = row._id;
      props.open({
        title: 'Calls-AM',
        component: 'CallsPanel',
        place: '',
        width: 380,
        userId,
        userPhone,
        // row,
      });
      console.log(' == userPhone from ActionMenu==: ', userPhone);
      console.log(' == userId from ActionMenu==: ', userId);
    }
    //   const userId = row._id;
    //   props.callUser(userPhone);
    //   console.log(' == userPhone from ActionMenu==: ', userPhone)
    // }
  };

  const editHandler = (clientId: string) => {
    props.open({
      title: 'Edit Client',
      component: 'ClientFormEdit',
      place: 'ClientDashboard',
      width: '95%',
      clientId,
    });
  };

  const deletePrompt = (client: IClient) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${client.name}`,
      okType: 'danger',
      onOk: () => props.clientDeleteById({ clientId: client._id, queryParams }),
    });
  };

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex align-items-end">
        <Button type="link" onClick={() => editHandler(row._id)}>
          <EditOutlined className="edit-pen-icon" />
        </Button>

        <Dropdown overlay={menu(row)} trigger={['click']}>
          <span className="ant-dropdown-link">
            <img src={dotsIcon} alt="" height="27" />
          </span>
        </Dropdown>
      </div>
    </span>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  clientDeleteById: (payload: IClientDeleteById) => dispatch({ type: 'ClientDashboard/deleteById', payload }),
  callUser: (payload: ICallClient) => dispatch({ type: 'ClientDashboard/callUser', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
