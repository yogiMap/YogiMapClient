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
  initialValues?: IUser;
  reset: () => void;
}

const UserSettingsEditProfileWrapper = (props: IProps) => {
  const userId = get(props, 'match.params.userId', '');
  const name = get(props, 'userInfo.name', '');
  const teacherAccountId = get(props, 'teacherAccount', '');
  const email = get(props, 'userInfo.email', '');
  const phoneNumber = get(props, 'userInfo.phoneNumber', '');
  const address = get(props, 'userInfo.address', '');
  const city = get(props, 'userInfo.city', '');
  const state = get(props, 'userInfo.state', '');
  const zipCode = get(props, 'userInfo.zipCode', '');
  const currentCountry = get(props, 'userInfo.countryName', '');
  const avatar = get(props, 'userInfo.avatar', '');

  useEffect(() => {
    props.userGetInfo();
  }, []);

  const initialValues = {
    userId,
    teacherAccountId,
    email,
    name,
    phoneNumber,
    address,
    city,
    state,
    zipCode,
    countryName: currentCountry,
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
  userInfo: state.Settings.userInfo,
  teacherAccount: state.Account.teacherAccount,
});

const mapDispatchToProps = (dispatch: any) => ({
  userGetInfo: () => dispatch({ type: 'Settings/userGetInfo' }),
  userUpdateById: function (payload: any) {
    dispatch({ type: 'Settings/userUpdateById', payload });
  },
  reset: () => dispatch({ type: 'Settings/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsEditProfileWrapper);
