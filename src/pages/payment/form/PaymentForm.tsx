import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { get } from 'lodash';
import { IPayment } from '@/pages/payment/types';
import ClientSearchInput from '@/pages/utils/searchInput/ClientSearchInput';
//import OrderSearchInput from '@/pages/utils/searchInput/OrderSearchInput';
import { IClient } from '@/pages/client/types';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IPayment | IClient;
}

const PaymentForm = (props: IProps) => {
  const { Option } = Select;
  const isLoading = get(props, 'isLoading', false);

  const [fu, forceUpdate] = useState(false); // trick
  const [showCardFields, setShowCardFields] = useState(false);
  const [showCheckFields, setShowCheckFields] = useState(false);
  const initPaymentType = get(props, 'initialValues.paymentType', '');

  const paymentType = ['cash', 'check', 'credit card'];

  useEffect(() => {
    handleChange(initPaymentType);
    forceUpdate(!fu);
  }, []);

  const onValuesChange = (a: any) => {
    forceUpdate(!fu);
  };

  const handleChange = (value: string) => {
    if (value === 'credit card') {
      setShowCardFields(true);
      setShowCheckFields(false);
    } else if (value === 'check') {
      setShowCheckFields(true);
      setShowCardFields(false);
    } else {
      setShowCardFields(false);
      setShowCheckFields(false);
    }
  };

  const [form] = Form.useForm();
  const clientId = form.getFieldValue('client');

  const onFinish = (formValues: IPayment) => {
    props.onFinish({
      ...formValues,
      client: get(formValues, 'client._id', formValues.client),
      order: get(formValues, 'order._id', formValues.order),
    });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      initialValues={props.initialValues}
      layout="vertical"
    >
      <Form.Item label="Code" name="code">
        <Input />
      </Form.Item>

      <Form.Item name="client" label="ClientBBB" rules={[validator.require]}>
        <ClientSearchInput />
      </Form.Item>

      {/*<Form.Item name="order" label="Order">*/}
      {/*  <OrderSearchInput clientId={clientId} disabled={!clientId} />*/}
      {/*</Form.Item>*/}

      <Form.Item
        label="Payment amount"
        name="amount"
        rules={[{ required: true, message: 'Please input payment amount' }, validator.currency]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Payment type"
        name="paymentType"
        rules={[{ required: true, message: 'Please select payment type' }]}
      >
        <Select onChange={handleChange} disabled={initPaymentType === 'credit card'}>
          {paymentType.map((el) => (
            <Option key={el} value={el}>
              {el}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {showCheckFields && (
        <Form.Item
          label="Check Number"
          name="checkNumber"
          rules={[
            { required: true, message: 'Please input check number' },
            validator.minlength3,
            validator.maxlength15,
          ]}
        >
          <Input placeholder="Check number" />
        </Form.Item>
      )}

      {showCardFields && (
        <div>
          <Form.Item
            label="CC last4"
            name="creditCardLast4"
            rules={[{ required: true, message: 'Please input CC last4' }, validator.length4]}
          >
            <Input placeholder="CC last4" disabled={initPaymentType === 'credit card'} />
          </Form.Item>
          <Form.Item
            label="CC email"
            name="creditCardEmail"
            rules={[{ required: true, message: 'Please input email address', type: 'email' }]}
          >
            <Input placeholder="CC Email" disabled={initPaymentType === 'credit card'} />
          </Form.Item>
        </div>
      )}

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {props.submitButtonText}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;
