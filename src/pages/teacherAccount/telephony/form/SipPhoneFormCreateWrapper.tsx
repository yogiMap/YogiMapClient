import React from 'react';
import { connect } from 'umi';
import SipPhoneForm from '@/pages/teacherAccount/telephony/form/SipPhoneForm';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import { ISipPhone } from '@/pages/sipPhone/types';

interface IProps {
  create: (arg: ISipPhone) => void;
  loadingEffects: ILoadingEffects;
}

const SipPhoneFormCreateWrapper = (props: IProps) => {
  const isLoading = get(props, 'loadingEffects.SipPhoneForm/create', false);

  const onFinish = (values: ISipPhone) => {
    props.create(values);
  };

  return <SipPhoneForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  Sidepanel: state.Sidepanel,
  SipPhoneForm: state.SipPhoneForm,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: ISipPhone) => dispatch({ type: 'SipPhoneForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneFormCreateWrapper);
