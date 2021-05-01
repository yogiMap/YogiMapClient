import { IClassType, IClassTypeQueryParams } from '@/pages/classType/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IClassTypeDeleteById {
  classTypeId: string;
  queryParams: IClassTypeQueryParams;
}

interface IProps {
  row: IClassType;
  open: (arg: ISidepanel) => void;
  classTypeDeleteById: (arg: IClassTypeDeleteById) => void;
  queryParams: IClassTypeQueryParams;
  Account: IUserAccount;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IClassType) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IClassType) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (classTypeId: string) => {
    props.open({
      title: 'Edit ClassType',
      component: 'ClassTypeFormEdit',
      place: 'ClassTypeDashboard',
      width: 800,
      classTypeId,
    });
  };

  const deletePrompt = (classType: IClassType) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${classType.name}`,
      okType: 'danger',
      onOk: () => props.classTypeDeleteById({ classTypeId: classType._id, queryParams }),
    });
  };

  const isUserAuth = get(props, 'Account._id');

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex justify-content-center">
        {/*<Button type="link" onClick={() => editHandler(row._id)}>*/}
        {/*  <EditOutlined className="edit-pen-icon" />*/}
        {/*</Button>*/}
        {isUserAuth && (
        <Dropdown overlay={menu(row)}>
          <span className="ant-dropdown-link">
            <img src={dotsIcon} alt="" height="27" />
          </span>
        </Dropdown>
        )}
      </div>
    </span>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  classTypeDeleteById: (payload: IClassTypeDeleteById) => dispatch({ type: 'ClassTypeDashboard/classTypeDeleteById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);
