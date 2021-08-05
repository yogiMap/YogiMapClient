import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import SipPhoneForm from '@/pages/teacherAccount/telephony/form/SipPhoneForm';
import { ISipPhone, ISipPhoneQueryParams } from '@/pages/telephony/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (sipPhoneId: string) => void;
  reset: () => void;
  updateById: (payload: ISipPhoneUpdate) => void;
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

  const isLoadingGet = get(props, 'loadingEffects.Telephony.getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.Telephony.updateById', false);

  const teacherAccountId = get(props, 'Sidepanel.teacherAccountId', '');

  const teacherEmployees = get(props, 'Telephony.teacherEmployee', []);
  const initialValues = get(props, 'Telephony.sipPhoneInfo', {});

  useEffect(() => {
    props.getById(sipPhoneId);
    props.teacherAccountGetEmployee(teacherAccountId);
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
      teacherEmployees={teacherEmployees}
    />
  );
};

const mapStateToProps = (state: any) => ({
  Sidepanel: state.Sidepanel,
  Telephony: state.Telephony,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'Telephony/reset' }),
  updateById: (payload: ISipPhoneUpdate) => dispatch({ type: 'Telephony/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'Telephony/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SipPhoneFormEditWrapper));
