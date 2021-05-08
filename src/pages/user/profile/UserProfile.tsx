import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get, isEmpty } from 'lodash';
import UserRoles from '@/pages/user/profile/UserRoles';
import TeacherAccountViewAddressList from '@/pages/teacherAccount/view/TeacherAccountViewAddressList';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  teacherAccountId: string;
  name: string;
  teacherAccountGetById: (teacherAccountId: string) => void;
  Account: IUserAccount;
}

const UserProfile = (props: any) => {
  const teacherAccountId: string = get(props, 'TeacherAccountView.teacherAccountId', '');
  const userId = get(props, 'match.params.userId', '');

  const userInfo = get(props, 'userInfo', '');
  const userName = get(userInfo, 'name', '');
  const roles = get(userInfo, 'roles', []);
  const about = get(userInfo, 'about', '');
  const email = get(userInfo, 'email', '');
  const profile = get(props, 'Profile');
  // const phoneNumber = profile.map((el: { phoneNumber: any; }) => el.phoneNumber)
  //
  // console.log(phoneNumber);

  useEffect(() => {
    props.userGetById(userId);
    props.teacherAccountGetById(teacherAccountId);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Profile Page</h1>
      <h3 className="text-end">{userName}</h3>
      <h5 className="text-end">{email}</h5>
      {/*<h5 className="text-end">{phoneNumber}</h5>*/}
      <div className="text-end">{!isEmpty(roles) ? <UserRoles roles={roles} /> : null}</div>

      <h3>Address</h3>
      <div>
        <TeacherAccountViewAddressList />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  // TeacherAccountView: state.TeacherAccountView,
  userInfo: state.Profile.userInfo,
  Profile: state.Profile,
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  userGetById: (payload: string) => dispatch({ type: 'Profile/userGetById', payload }),
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'Profile/teacherAccountGetById', payload: teacherAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
