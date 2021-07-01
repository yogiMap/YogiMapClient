import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import SipPhoneForm from '@/pages/teacherAccount/sipPhone/form/SipPhoneForm';
import { ISipPhone } from '@/pages/sipPhone/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (sipPhoneId: string) => void;
  reset: () => void;
  updateById: any;
  sipPhoneInfo: ISipPhone;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SipPhoneFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const sipPhoneId: string = get(props, 'sidepanel.sipPhoneId', '');

  const isLoadingGet = get(props, 'loadingEffects.SipPhoneForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.SipPhoneForm/updateById', false);

  const teacherAccountID = get(props, 'sipPhoneInfo.teacherAccount', '');

  useEffect(() => {
    props.getById(sipPhoneId);
  }, []);

  const onFinish = (values: ISipPhone) => {
    props.updateById({ values, sipPhoneId, queryParams, teacherAccountID });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <SipPhoneForm
      onFinish={onFinish}
      initialValues={props.sipPhoneInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  sipPhoneInfo: state.SipPhoneForm.sipPhoneInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'SipPhoneForm/reset' }),
  updateById: (payload: ISipPhone) => dispatch({ type: 'SipPhoneForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'SipPhoneForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SipPhoneFormEditWrapper));
