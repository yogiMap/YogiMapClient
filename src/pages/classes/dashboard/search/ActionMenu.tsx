import { IClasses, IClassesQueryParams } from '@/pages/classes/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IClassesDeleteById {
  classesId: string;
  queryParams: IClassesQueryParams;
}

interface IProps {
  row: IClasses;
  open: (arg: ISidepanel) => void;
  classesDeleteById: (arg: IClassesDeleteById) => void;
  queryParams: IClassesQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IClasses) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IClasses) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (classesId: string) => {
    props.open({
      title: 'Edit Classes',
      component: 'ClassesFormEdit',
      place: 'ClassesDashboard',
      width: 800,
      classesId,
    });
  };

  const deletePrompt = (classes: IClasses) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${classes.name}`,
      okType: 'danger',
      onOk: () => props.classesDeleteById({ classesId: classes._id, queryParams }),
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
  classesDeleteById: (payload: IClassesDeleteById) => dispatch({ type: 'ClassesDashboard/classesDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
