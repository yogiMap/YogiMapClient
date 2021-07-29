import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import SipPhoneForm from '@/pages/teacherAccount/telephony/form/SipPhoneForm';
import { ISipPhone, ISipPhoneQueryParams } from '@/pages/sipPhone/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (sipPhoneId: string) => void;
  reset: () => void;
  updateById: (payload: ISipPhoneUpdate) => void;
  teacherAccountId: string;
  sipPhoneInfo: ISipPhone;
  loadingEffects: ILoadingEffects;
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

  const isLoadingGet = get(props, 'loadingEffects.SipPhoneForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.SipPhoneForm/updateById', false);

  const teacherAccountId = get(props, 'Sidepanel.teacherAccountId', '');
  const initialValues = get(props, 'SipPhoneForm.sipPhoneInfo', {});

  useEffect(() => {
    props.getById(sipPhoneId);
  }, []);

  const onFinish = (values: ISipPhone) => {
    props.updateById({ values, sipPhoneId, queryParams, teacherAccountId });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <SipPhoneForm
      onFinish={onFinish}
      initialValues={initialValues}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  Sidepanel: state.Sidepanel,
  sipPhoneInfo: state.SipPhoneForm,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'SipPhoneForm/reset' }),
  updateById: (payload: ISipPhoneUpdate) => dispatch({ type: 'SipPhoneForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'SipPhoneForm/getById', payload }),
});

// @ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SipPhoneFormEditWrapper));
