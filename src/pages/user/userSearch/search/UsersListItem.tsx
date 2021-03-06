import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Modal } from 'antd';
import UsersListItemRoles from '@/pages/user/userSearch/search/UsersListItemRoles';
import { IUser, IUserAccount, IUserQueryParams } from '@/pages/user/userSearch/types';
import { ISidepanel, ISidepanelOpen } from '@/pages/utils/sidepanel/types';
import { DeleteTwoTone } from '@ant-design/icons';
import ActionMenu from '@/pages/user/userSearch/search/ActionMenu';

const loadId = { impersonateButton: 'impersonateButton' };

interface IUserDeleteById {
  userId: string;
  queryParams: IUserQueryParams;
  User: IUser;
}

interface IProps {
  item: IUser;
  usersRolesList: string[];
  loader: { args: boolean };
  usersUpdateRoleById: (values: { roles: string[]; userId: string }) => void;
  userVerifyEmailSend: (userId: { userId: string }) => void;
  open: ISidepanelOpen;
  userImpersonate: (args: { userId: string; loadId: string }) => void;
  userDeleteById: (arg: { userId: string; queryParams: IUserQueryParams }) => void;
  queryParams: IUserQueryParams;
  row: IUser;
}

const UsersListItem = (props: IProps) => {
  const { usersUpdateRoleById, userVerifyEmailSend, usersRolesList, userImpersonate } = props;

  const createdAt = get(props, 'item.createdAt', '');
  const lastLoginDate = get(props, 'item.lastLogin.date', null);
  const lastLogin = new Date().getTime() ? moment(lastLoginDate).fromNow() : 'Never';
  const userName = get(props, 'item.name', '');
  const userId = get(props, 'item._id', ' ');
  const userEmail = get(props, 'item.email', '');
  const userRoles = get(props, 'item.roles', '');
  const userEmailConfirmed = get(props, 'item.emailConfirmation.confirmed', false);
  const onUserRolesChange = (values: { roles: string[]; userId: string }) => {
    usersUpdateRoleById(values);
  };
  const queryParams = get(props, 'location.query', {});
  const userTeacherAccountId = get(props, 'item.teacherAccount._id', '');
  const userTeacherAccountName = get(props, 'item.teacherAccount.name', '');
  const userStudentId = get(props, 'item.studentAccount._id', '');
  const userStudentFirstName = get(props, 'item.studentAccount.firstName', '');
  const userStudentLastName = get(props, 'item.studentAccount.lastName', '');
  const studentName = `${userStudentFirstName} ${userStudentLastName}`;

  // @ts-ignore
  return (
    <div className="row mb-3 border-bottom">
      <div className="col-md-2">
        <div>{moment(createdAt).format('LL HH:mm')}</div>
        <div>Last login {lastLogin}</div>
      </div>

      <div className="col-md-2">
        <div>
          <Link className="primary-link" to={`/profile/${userId}`}>
            {userName}
          </Link>

          <UsersListItemRoles
            usersRolesList={usersRolesList}
            userRoles={userRoles}
            userId={userId}
            onChange={onUserRolesChange}
          />
        </div>
      </div>

      <div className="col-md-4">
        <span className={userEmailConfirmed && 'text-success'}>{userEmail}</span>
        <Button type="link" className="ps-0 d-block" size="small" onClick={() => userVerifyEmailSend({ userId })}>
          Send confirm email
        </Button>
      </div>

      <div className="col-md-2">
        {userTeacherAccountId && (
          <>
            <div>Teacher Account:</div>
            <Link className="primary-link" to={`/teacherAccount/${userTeacherAccountId}`}>
              {userTeacherAccountName}
            </Link>
          </>
        )}
        {userStudentId && (
          <>
            <div>Student Account:</div>
            <Link className="primary-link" to={`/student/${userStudentId}`}>
              {studentName}
            </Link>
          </>
        )}
      </div>

      <div className="col-md-2">
        <ActionMenu row={props.item} queryParams={queryParams} userImpersonate={userImpersonate} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loader: state.Loader,
  usersRolesList: state.UsersDashboard.usersRolesList,
});

const mapDispatchToProps = (dispatch: any) => ({
  userVerifyEmailSend: (payload: string) => dispatch({ type: 'UsersDashboard/userVerifyEmailSend', payload }),
  usersUpdateRoleById: (payload: { roles: string[]; userId: string }) =>
    dispatch({ type: 'UsersDashboard/usersUpdateRoleById', payload }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  userImpersonate: (payload: { userId: string; loadId: string }) =>
    dispatch({ type: 'UsersDashboard/userImpersonate', payload }),
  userDeleteById: (payload: IUserDeleteById) => dispatch({ type: 'UsersDashboard/userDeleteById', payload }),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(UsersListItem);
