import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  teacherAccountId: string;
  studentId: string;
  name: string;
  teacherAccountGetById: (teacherAccountId: string) => void;
  studentGetById: (teacherAccountId: string) => void;
  Account: IUserAccount;
}

const UserProfile = (props: any) => {
  const teacherAccountId: string = get(props, 'Account.teacherAccount', '');
  const studentId: string = get(props, 'Account.student', '');
  const userId = get(props, 'match.params.userId', '');

  const userInfo = get(props, 'userInfo', '');
  const userName = get(userInfo, 'name', '');
  const roles = get(userInfo, 'roles', []);
  const email = get(userInfo, 'email', '');

  console.log('+++++++++++++++++++++', teacherAccountId, studentId);
  // const phoneNumber = profile.map((el: { phoneNumber: any; }) => el.phoneNumber)
  //
  // console.log(phoneNumber);

  useEffect(() => {
    props.userGetById(userId);
    props.teacherAccountGetById(teacherAccountId);
    props.studentGetById(studentId);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Profile Page</h1>
      <h3 className="text-end">{userName}</h3>
      <h5 className="text-end">{email}</h5>
      {/*<h5 className="text-end">{phoneNumber}</h5>*/}
      {/*<div className="text-end">{!isEmpty(roles) ? <UserRoles roles={roles} /> : null}</div>*/}

      <div></div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Profile: state.Profile,
  Account: state.Account,
  userInfo: state.Profile.userInfo,
  teacherAccountInfo: state.Profile.teacherAccountInfo,
  studentInfo: state.Profile.studentInfo,
  // TeacherAccountView: state.TeacherAccountView,
  // StudentView: state.StudentView,
});

const mapDispatchToProps = (dispatch: any) => ({
  userGetById: (payload: string) => dispatch({ type: 'Profile/userGetById', payload }),
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'Profile/teacherAccountGetById', payload: teacherAccountId }),
  studentGetById: (studentId: string) => dispatch({ type: 'Profile/studentGetById', payload: studentId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
