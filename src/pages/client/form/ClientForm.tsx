import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { IClient } from '@/pages/client/types';
import { get } from 'lodash';
import PhoneInput from '@/pages/utils/phone/phoneInput/PhoneInput';
import { useForm } from 'antd/es/form/Form';
import { connect, withRouter } from 'umi';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IClient;
}

const ClientForm = (props: IProps) => {
  const isLoading = get(props, 'isLoading', false);
  const [form] = useForm();
  const address = get(props, 'initialValues.address', {});
  const phone = get(props, 'initialValues.phoneNumber', {});
  const name = get(props, 'Account.name', '');
  const email = get(props, 'Account.email', '');

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical" form={form}>
      <div className="row mb-5">
        <div className="col-md-6">
          <h1>Client Details</h1>
        </div>
        <div className="col-md-6">
          <h4 className="text-colored-second d-flex justify-content-start">{name}</h4>
          <p className="mt-3">email: {email}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input client`s First Name' }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </div>

        <div className="col">
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input client`s Last Name' }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: false, message: 'Please input email address', type: 'email' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </div>

        <div className="col">
          <Form.Item>
            <PhoneInput label="Phone" name="phoneNumber" required={true} value={phone} />
          </Form.Item>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} shape="round">
              {props.submitButtonText}
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

// @ts-ignore
export default withRouter(connect(mapStateToProps)(ClientForm));
