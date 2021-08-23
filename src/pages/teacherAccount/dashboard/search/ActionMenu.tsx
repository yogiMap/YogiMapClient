import { Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { ITeacherAccount, ITeacherAccountQueryParams } from '@/pages/teacherAccount/types';

interface ITeacherAccountDeleteById {
  teacherAccountId: string;
  queryParams: ITeacherAccountQueryParams;
}

interface IProps {
  row: ITeacherAccount;
  open: (arg: ISidepanel) => void;
  teacherAccountDeleteById: (arg: ITeacherAccountDeleteById) => void;
  queryParams: ITeacherAccountQueryParams;
  User: IUser;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: ITeacherAccount) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: ITeacherAccount) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (teacherAccountId: string) => {
    props.open({
      title: 'Edit TeacherAccount',
      component: 'TeacherAccountFormEdit',
      place: 'TeacherAccountDashboard',
      width: 800,
      teacherAccountId,
    });
  };

  const deletePrompt = (teacherAccount: ITeacherAccount) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${teacherAccount.name}`,
      okType: 'danger',
      onOk: () => props.teacherAccountDeleteById({ teacherAccountId: teacherAccount._id, queryParams }),
    });
  };

  const isUserAuth = get(props, 'User._id');

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
  User: state.User,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  teacherAccountDeleteById: (payload: c) =>
    dispatch({ type: 'TeacherAccountDashboard/teacherAccountDeleteById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);
