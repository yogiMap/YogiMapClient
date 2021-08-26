import React, { useEffect } from 'react';
import { get } from 'lodash';
import { connect } from 'umi';
import { IUser } from '@/pages/user/userSearch/types';
import UserSettingsEditProfileForm from '@/pages/user/settings/profile/UserSettingsEditProfileForm';

interface IProps {
  userId: string;
  match: any;
  userGetInfo: () => void;
  userInfo: any;
  userUpdateById: (user: { values: IUser; userId: string }) => void;
  //userGetById: (user: { values: IUser; userId: string }) => void;
  initialValues?: IUser;
  reset: () => void;
}

const UserSettingsEditProfileWrapper = (props: IProps) => {
  const userId = get(props, 'match.params.userId', '');
  const name = get(props, 'User.name', '');
  const teacherAccountId = get(props, 'teacherAccount', '');
  const email = get(props, 'User.email', '');
  const phoneNumber = get(props, 'User.phoneNumber', '');
  // const address = get(props, 'userInfo.personalAddress.address', '');
  // const city = get(props, 'userInfo.personalAddress.city', '');
  // const state = get(props, 'userInfo.personalAddress.state', '');
  // const zipCode = get(props, 'userInfo.personalAddress.zipCode', '');
  // const currentCountry = get(props, 'userInfo.personalAddress.countryName', '');
  const avatar = get(props, 'User.avatar', '');

  useEffect(() => {
    props.userGetInfo();
    // props.userGetById();
  }, []);

  const initialValues = {
    userId,
    teacherAccountId,
    email,
    name,
    phoneNumber,
    // address,
    // city,
    // state,
    // zipCode,
    // countryName: currentCountry,
    avatar: avatar[1],
  };

  const onFinish = (values: IUser) => {
    props.userUpdateById({ values, userId });
  };

  if (!initialValues.name) return null;
  // if (!userTeacherAccountId)
  //   return (
  //     <>
  //       {!userTeacherAccountId && (
  //         <div className="ml-5 mt-1">
  //           <Alert message="Please, create Company Account..." type="warning" />
  //         </div>
  //       )}
  //     </>
  //   );

  // @ts-ignore
  return <UserSettingsEditProfileForm onFinish={onFinish} initialValues={initialValues} />;
};

const mapStateToProps = (state: any) => ({
  User: state.User,
  // userInfo: state.User.userInfo,
  teacherAccount: state.User.teacherAccount,
});

const mapDispatchToProps = (dispatch: any) => ({
  userGetInfo: () => dispatch({ type: 'User/userGetInfo' }),
  // userGetById: (payload: string) => dispatch({ type: 'User/userGetById', payload }),
  userUpdateById: function (payload: any) {
    dispatch({ type: 'User/userUpdateById', payload });
  },
  reset: () => dispatch({ type: 'User/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsEditProfileWrapper);
