import { Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { IUser, IUserAccount, IUserQueryParams } from '@/pages/user/userSearch/types';
import { get } from 'lodash';

interface IUserDeleteById {
  userId: string;
  queryParams: IUserQueryParams;
  Account: IUserAccount;
}

interface IProps {
  row: IUser;
  open: (arg: ISidepanel) => void;
  userDeleteById: (arg: { userId: string; queryParams: IUserQueryParams }) => void;
  queryParams: IUserQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'userImpersonate', handler: 'userImpersonate', name: 'userImpersonate' },
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
    if (handler === 'userImpersonate') {
      userImpersonateHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  // const name = get(props, 'item.name', '');
  // const userId = get(props, 'item._id', ' ');
  // const loading = get(props, 'loader.impersonateButton', false)}

  const userImpersonateHandler = (userId: string) => {
    props.open({
      title: 'userImpersonate',
      component: 'UserFormEdit',
      place: 'UserDashboard',
      width: 800,
      userId,
    });
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
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  userDeleteById: (payload: IUserDeleteById) => dispatch({ type: 'UserDashboard/userDeleteById', payload }),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);

{
  /*     <Button*/
}
{
  /*       loading={get(props, 'loader.impersonateButton', false)}*/
}
{
  /*       size="small"*/
}
{
  /*       type={'link'}*/
}
{
  /*       onClick={() => userImpersonate({ userId, loadId: loadId.impersonateButton })}*/
}
{
  /*     >*/
}
{
  /*          Impersonate*/
}
{
  /*        </Button>*/
}
{
  /*      </div>*/
}

{
  /*<div>*/
}
{
  /*  <Button danger onClick={UserDeleteHandler}>*/
}
{
  /*    Delete*/
}
{
  /*  </Button>*/
}
{
  /*  */
}
