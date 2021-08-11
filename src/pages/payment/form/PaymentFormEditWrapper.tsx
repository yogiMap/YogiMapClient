import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import PaymentForm from '@/pages/payment/form/PaymentForm';
import { IPayment } from '@/pages/payment/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (paymentId: string) => void;
  reset: () => void;
  updateById: any;
  paymentInfo: IPayment;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PaymentFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const paymentId: string = get(props, 'sidepanel.paymentId', '');

  const isLoadingGet = get(props, 'loadingEffects.PaymentForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.PaymentForm/updateById', false);

  useEffect(() => {
    props.getById(paymentId);
  }, []);

  const onFinish = (values: IPayment) => {
    props.updateById({ values, paymentId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <PaymentForm
      onFinish={onFinish}
      initialValues={props.paymentInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  paymentInfo: state.PaymentForm.paymentInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'PaymentForm/reset' }),
  updateById: (payload: IPayment) => dispatch({ type: 'PaymentForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'PaymentForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentFormEditWrapper));
