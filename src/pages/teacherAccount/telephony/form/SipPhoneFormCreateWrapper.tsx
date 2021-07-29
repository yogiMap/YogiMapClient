import React, { useEffect } from 'react';
import { connect } from 'umi';
import SipPhoneForm from '@/pages/teacherAccount/telephony/form/SipPhoneForm';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import { ISipPhone } from '@/pages/telephony/types';

interface IProps {
  create: (arg: ISipPhone) => void;
  loadingEffects: ILoadingEffects;
  teacherAccountGetEmployee: (teacherAccountId: string) => void;
}

const SipPhoneFormCreateWrapper = (props: IProps) => {
  const isLoading = get(props, 'loadingEffects.SipPhoneForm/create', false);
  const teacherEmployees = get(props, 'SipPhoneForm.teacherEmployee', []);
  const teacherAccountId = get(props, 'Sidepanel.teacherAccountId', '');

  const onFinish = (values: ISipPhone) => {
    props.create(values);
  };

  useEffect(() => {
    props.teacherAccountGetEmployee(teacherAccountId);
  }, []);

  return (
    <SipPhoneForm
      teacherEmployees={teacherEmployees}
      onFinish={onFinish}
      submitButtonText="Create"
      isLoading={isLoading}
    />
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  Sidepanel: state.Sidepanel,
  SipPhoneForm: state.SipPhoneForm,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetEmployee: (teacherAccountId: string) =>
    dispatch({ type: 'SipPhoneForm/teacherAccountGetEmployee', payload: teacherAccountId }),
  create: (payload: ISipPhone) => dispatch({ type: 'SipPhoneForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneFormCreateWrapper);
