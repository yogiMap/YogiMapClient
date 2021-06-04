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
  const email = get(userInfo, 'email', '');
  const roles = get(userInfo, 'roles', []);

  //teacher account info
  const teacherAccountInfo = get(props, 'teacherAccountInfo', '');
  const teacherName = get(teacherAccountInfo, 'name');
  const teacherPhone = get(teacherAccountInfo, 'phoneNumber.number');
  const teacherFocus = get(teacherAccountInfo, 'phoneNumber.focus');
  const teacherClassType = get(teacherAccountInfo, 'classType');
  const teacherClasses = get(teacherAccountInfo, 'classes');
  const teacherEvent = get(teacherAccountInfo, 'event');
  const teacherDescription = get(teacherAccountInfo, 'description');
  const teacherAddressLine1 = get(teacherAccountInfo, 'addressLine1');
  const teacherAddressLine2 = get(teacherAccountInfo, 'addressLine2');
  const teacherCity = get(teacherAccountInfo, 'city');
  const teacherCountry = get(teacherAccountInfo, 'country');
  const teacherState = get(teacherAccountInfo, 'state');
  const teacherTimeZone = get(teacherAccountInfo, 'timeZone');
  const teacherZipCode = get(teacherAccountInfo, 'zipCode');

  useEffect(() => {
    props.userGetById(userId);
    props.teacherAccountGetById(teacherAccountId);
    props.studentGetById(studentId);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Profile Page</h1>
      <h3 className="text-end">{userName}</h3>
      <p className="text-end">Email: {email}</p>
      <p className="text-end">
        User's roles:{' '}
        {roles.map((el: string) => (
          <span className="ms-2">{el}</span>
        ))}
      </p>

      {teacherAccountId && (
        <div className="my-5">
          <h5>{userName} Has a Teacher Account</h5>
          <p>
            Teacher's Address:
            {`${teacherCountry} ${teacherAddressLine1} ${teacherAddressLine2} ${teacherCity}, , ${teacherState}, ${teacherZipCode}`}
          </p>
        </div>
      )}
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
