import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { IClient } from '@/pages/client/types';
import { get } from 'lodash';
import PhoneInput from '@/pages/utils/phoneInput/PhoneInput';
import { useForm } from 'antd/es/form/Form';
import AddressForm from '@/pages/utils/addressForm/AddressForm';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IClient;
}

const ClientInfoForm = (props: IProps) => {
  const [form] = useForm();
  const isLoading = get(props, 'isLoading', false);
  const initialValues = get(props, 'initialValues');
  const [addAdditionalPhoneMode, setAddAdditionalPhoneMode] = useState(true);
  const address = get(props, 'initialValues.address', {});
  const phone1 = get(props, 'initialValues.phoneNumber1', {});
  const phone2 = get(props, 'initialValues.phoneNumber2', {});

  if (initialValues === undefined) return null;

  return (
    <Form form={form} onFinish={props.onFinish} layout="vertical" initialValues={initialValues}>
      <div className="row">
        <div className="col-md-6">
          <h5>Client Details</h5>

          <div className="row">
            <div className="col">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please input your First Name' }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </div>

            <div className="col">
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your Last Name' }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>
          </div>

          <Form.Item label="Company" name="company">
            <Input placeholder="Company" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: false, message: 'Please input email address', type: 'email' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="phoneNumber1">
            <PhoneInput label="Phone 1" name="phoneNumber1" required={true} value={phone1} />

            {!addAdditionalPhoneMode && (
              <Button type="link" size="small" onClick={() => setAddAdditionalPhoneMode(!addAdditionalPhoneMode)}>
                + Add Additional Phone Number
              </Button>
            )}

            {addAdditionalPhoneMode && (
              <PhoneInput label="Phone 2" name="phoneNumber2" required={false} value={phone2} />
            )}
          </Form.Item>
        </div>

        <div className="col-md-6">
          <h5>Service Address</h5>
          <AddressForm address={address} />
        </div>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClientInfoForm;
