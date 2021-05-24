import { ITeacher, ITeacherQueryParams } from '@/pages/teacher/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface ITeacherDeleteById {
  teacherId: string;
  queryParams: ITeacherQueryParams;
}

interface IProps {
  row: ITeacher;
  open: (arg: ISidepanel) => void;
  teacherDeleteById: (arg: ITeacherDeleteById) => void;
  queryParams: ITeacherQueryParams;
  Account: IUserAccount;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: ITeacher) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: ITeacher) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (teacherId: string) => {
    props.open({
      title: 'Edit Teacher',
      component: 'TeacherFormEdit',
      place: 'TeacherDashboard',
      width: 800,
      teacherId,
    });
  };

  const deletePrompt = (teacher: ITeacher) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${teacher.name}`,
      okType: 'danger',
      onOk: () => props.teacherDeleteById({ teacherId: teacher._id, queryParams }),
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
  teacherDeleteById: (payload: ITeacherDeleteById) => dispatch({ type: 'TeacherDashboard/teacherDeleteById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);
