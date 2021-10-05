import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import SipPhoneForm from '@/pages/teacherAccount/telephony/form/SipPhoneForm';
import { ISipPhone, ISipPhoneQueryParams } from '@/pages/telephony/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  telephonyGetById: (sipPhoneId: string) => void;
  reset: () => void;
  TelephonyUpdateById: (payload: ISipPhoneUpdate) => void;
  teacherAccountId: string;
  sipPhoneInfo: ISipPhone;
  loadingEffects: ILoadingEffects;
  teacherAccountGetEmployee: (teacherAccountId: string) => void;
}

interface ISipPhoneUpdate {
  values: ISipPhone;
  sipPhoneId: string;
  queryParams: ISipPhoneQueryParams;
  teacherAccountId: string;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SipPhoneFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const sipPhoneId: string = get(props, 'Sidepanel.sipPhoneId', '');

  const isLoadingGet = get(props, 'loadingEffects.TeacherAccount/telephonyGetById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.TeacherAccount/TelephonyUpdateById', false);

  const teacherAccountId = get(props, 'Sidepanel.teacherAccountId', '');

  const teacherEmployees = get(props, 'TeacherAccount.teacherEmployee', []);
  const initialValues = get(props, 'TeacherAccount.sipPhoneInfo', {});

  useEffect(() => {
    props.telephonyGetById(sipPhoneId);
    props.teacherAccountGetEmployee(teacherAccountId);
  }, []);

  const onFinish = (values: ISipPhone) => {
    props.TelephonyUpdateById({ values, sipPhoneId, queryParams, teacherAccountId });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <SipPhoneForm
      onFinish={onFinish}
      initialValues={initialValues}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
      teacherEmployees={teacherEmployees}
    />
  );
};

const mapStateToProps = (state: any) => ({
  Sidepanel: state.Sidepanel,
  TeacherAccount: state.TeacherAccount,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'TeacherAccount/reset' }),
  TelephonyUpdateById: (payload: ISipPhoneUpdate) => dispatch({ type: 'TeacherAccount/TelephonyUpdateById', payload }),
  telephonyGetById: (payload: string) => dispatch({ type: 'TeacherAccount/telephonyGetById', payload }),
  teacherAccountGetEmployee: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccount/teacherAccountGetEmployee', payload: teacherAccountId }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SipPhoneFormEditWrapper));
