import React, { useEffect } from 'react';
import { get } from 'lodash';
import { connect } from 'umi';
import { IUser } from '@/pages/user/userSearch/types';
import UserSettingsEditProfileForm from '@/pages/user/settings/profile/UserSettingsEditProfileForm';
import { Alert } from 'antd';

interface IProps {
  userId: string;
  match: any;
  userGetInfo: () => void;
  userInfo: any;
  userUpdateById: (user: { values: IUser; userId: any }) => void;
  initialValues?: IUser;
  reset: () => void;
}

const UserSettingsEditProfileWrapper = (props: IProps) => {
  const userId = get(props, 'match.params.userId', '');
  const name = get(props, 'userInfo.name', '');
  const userTeacherAccountId = get(props, 'teacherAccount', '');
  const email = get(props, 'userInfo.email', '');
  const phone = get(props, 'userInfo.phone', '');
  const address = get(props, 'userInfo.personalAddress.address', '');
  const city = get(props, 'userInfo.personalAddress.city', '');
  const state = get(props, 'userInfo.personalAddress.state', '');
  const zipCode = get(props, 'userInfo.personalAddress.zipCode', '');
  const currentCountry = get(props, 'userInfo.personalAddress.countryName', '');

  useEffect(() => {
    props.userGetInfo();
  }, []);

  const initialValues = {
    userId,
    email,
    name,
    phone,
    address,
    city,
    state,
    zipCode,
    countryName: currentCountry,
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
  userUpdateById: function (payload: IUser) {
    dispatch({ type: 'Settings/userUpdateById', payload });
  },
  reset: () => dispatch({ type: 'Settings/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsEditProfileWrapper);
