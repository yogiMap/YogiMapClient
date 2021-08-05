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
  const isLoading = get(props, 'loadingEffects.Telephony/create', false);
  const teacherEmployees = get(props, 'Telephony.teacherEmployee', []);
  const teacherAccountId = get(props, 'Sidepanel.teacherAccountId', '');

  const onFinish = (values: ISipPhone) => {
    values.teacherAccount = teacherAccountId;
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
  Telephony: state.Telephony,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: ISipPhone) => dispatch({ type: 'Telephony/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneFormCreateWrapper);
