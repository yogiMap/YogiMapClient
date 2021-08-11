import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  paymentId: string;
  name: string;
  paymentGetById: (paymentId: string) => void;
}

const PaymentView = (props: IProps) => {
  const paymentId = get(props, 'match.params.paymentId');
  const paymentNumber = get(props, 'PaymentView.code', '');
  const amount = get(props, 'PaymentView.amount', '');
  const paymentType = get(props, 'PaymentView.paymentType', '');
  const creditCardStatus = get(props, 'PaymentView.creditCardStatus', '');
  const invoiceCode = get(props, 'PaymentView.invoice', '');
  const client = get(props, 'PaymentView.client.name', '');
  const order = get(props, 'PaymentView.order.description', '');
  const checkNumber = get(props, 'PaymentView.checkNumber', ' ');
  const createdDate = get(props, 'PaymentView.createdAt', '');

  useEffect(() => {
    props.paymentGetById(paymentId);
  }, []);

  return (
    <div>
      Payment Number: {paymentNumber} <br />
      Payment Amount: {amount} <br />
      Order: {order} <br />
      Payment Type: {paymentType} <br />
      Credit Card Status: {creditCardStatus} <br />
      Invoice Number: {invoiceCode} <br />
      Client Name: {client} <br />
      Check Number: {checkNumber} <br />
      Created Date: {createdDate} <br />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  PaymentView: state.PaymentView,
});

const mapDispatchToProps = (dispatch: any) => ({
  paymentGetById: (paymentId: string) => dispatch({ type: 'PaymentView/paymentGetById', payload: paymentId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentView);
