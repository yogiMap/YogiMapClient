import { IEvent, IEventQueryParams } from '@/pages/event/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IEventDeleteById {
  eventId: string;
  queryParams: IEventQueryParams;
}

interface IProps {
  row: IEvent;
  open: (arg: ISidepanel) => void;
  eventDeleteById: (arg: IEventDeleteById) => void;
  queryParams: IEventQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IEvent) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IEvent) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (eventId: string) => {
    props.open({
      title: 'Edit Event',
      component: 'EventFormEdit',
      place: 'EventDashboard',
      width: 800,
      eventId,
    });
  };

  const deletePrompt = (event: IEvent) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${event.name}`,
      okType: 'danger',
      onOk: () => props.eventDeleteById({ eventId: event._id, queryParams }),
    });
  };

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex align-items-end">
        <Button type="link" onClick={() => editHandler(row._id)}>
          <EditOutlined className="edit-pen-icon" />
        </Button>

        <Dropdown overlay={menu(row)}>
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
  eventDeleteById: (payload: IEventDeleteById) => dispatch({ type: 'EventDashboard/eventDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
