import { IClass, IClassQueryParams } from '@/pages/class/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';
import { IEvent } from '@/pages/event/types';

interface IClassDeleteById {
  classId: string;
  queryParams: IClassQueryParams;
}

interface IProps {
  row: IClass;
  open: (arg: ISidepanel) => void;
  classDeleteById: (arg: IClassDeleteById) => void;
  queryParams: IClassQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IClass) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IClass) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      // deletePrompt(row);
    }
  };

  const editHandler = (classId: string) => {
    props.open({
      title: 'Edit Class',
      component: 'ClassFormEdit',
      place: 'ClassDashboard',
      width: 800,
      classId,
    });
  };

  // const deletePrompt = (class: ШclasШs) => {
  //   Modal.confirm({
  //     title: `Do you want to delete?`,
  //     content: `${class.name}`,
  //     okType: 'danger',
  //     onOk: () => props.classDeleteById({ classId: class._id, queryParams }),
  //   });
  // };

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
  classDeleteById: (payload: IClassDeleteById) => dispatch({ type: 'ClassDashboard/classDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
