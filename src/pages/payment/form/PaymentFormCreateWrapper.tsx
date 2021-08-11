import React from 'react';
import { connect } from 'umi';
import PaymentForm from '@/pages/payment/form/PaymentForm';
import { IPayment } from '@/pages/payment/types';
import _, { get, pickBy } from 'lodash';
import { IInvoice } from '@/pages/invoice/types';
import { ILoadingEffects } from '@/types';
import { IClient } from '@/pages/client/types';

interface IProps {
  create: (arg: any) => void;
  loadingEffects: ILoadingEffects;
  invoiceInfo: IInvoice;
  clientInfo: IClient;
}

const PaymentFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IPayment) => {
    const trimValue = pickBy(values, _.identity); //remove all undefined and null properties
    props.create(trimValue);
  };

  const isLoading = get(props, 'loadingEffects.PaymentForm/create', false);

  return (
    <PaymentForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} initialValues={props.clientInfo} />
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  invoiceInfo: state.InvoiceView,
  clientInfo: state.ClientInfo,
  Sidepanel: state.Sidepanel,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IPayment) => dispatch({ type: 'PaymentForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentFormCreateWrapper);
