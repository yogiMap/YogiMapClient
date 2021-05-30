import { Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { IUser, IUserQueryParams } from '@/pages/user/userSearch/types';

const loadId = { impersonateButton: 'impersonateButton' };

interface IUserDeleteById {
  userId: string;
  queryParams: IUserQueryParams;
}

interface IProps {
  row: IUser;
  open: (arg: ISidepanel) => void;
  userDeleteById: (arg: { userId: string; queryParams: IUserQueryParams }) => void;
  queryParams: IUserQueryParams;
  userImpersonate: (args: { userId: string; loadId: string }) => void;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams, userImpersonate } = props;

  const menuItems = [
    { key: 'impersonate', handler: 'impersonate', name: 'Impersonate' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IUser) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IUser) => {
    if (handler === 'impersonate') {
      userImpersonateHandler(row);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const userImpersonateHandler = (user: IUser) => {
    userImpersonate({ userId: user._id, loadId: loadId.impersonateButton });
  };

  const deletePrompt = (user: IUser) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${user.name}`,
      okType: 'danger',
      onOk: () => props.userDeleteById({ userId: user._id, queryParams }),
    });
  };

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex justify-content-center">
        <Dropdown overlay={menu(row)}>
          <span className="ant-dropdown-link">
            <img src={dotsIcon} alt="" height="27" />
          </span>
        </Dropdown>
      </div>
    </span>
  );
};

const mapStateToProps = (state: any) => ({
  loader: state.Loader,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  userImpersonate: (payload: { userId: string; loadId: string }) =>
    dispatch({ type: 'UsersDashboard/userImpersonate', payload }),
  userDeleteById: (payload: IUserDeleteById) => dispatch({ type: 'UsersDashboard/userDeleteById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);
