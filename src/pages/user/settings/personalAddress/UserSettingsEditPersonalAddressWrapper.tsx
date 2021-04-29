import React from 'react';
import UserSettingsEditPersonalAddressForm from '@/pages/user/settings/personalAddress/UserSettingsEditPersonalAddressForm';

const UserSettingsCreateTeacherAccountWrapper = () => {
  const onFinish = () => {
    console.log('onFinish');
  };

  return <UserSettingsEditPersonalAddressForm onFinish={onFinish} />;
};

export default UserSettingsCreateTeacherAccountWrapper;
