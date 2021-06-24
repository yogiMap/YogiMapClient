import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { get } from 'lodash';
import { IAddress } from '@/pages/address/types';
import validator from '@/utils/validators';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  initialValues?: IAddress;
}

const ClientDefaultAddressForm = (props: IProps) => {
  const [form] = Form.useForm();
  const isLoading = get(props, 'isLoading', false);
  const initialValues = get(props, 'initialValues');

  if (initialValues === undefined) return null;

  return (
    <Form
      form={form}
      onFinish={props.onFinish}
      layout="horizontal"
      labelCol={{ span: 4 }}
      colon={false}
      initialValues={initialValues}
    >
      <div className="row">
        <div className="col-md-12">
          <h5>Service Address</h5>

          <Form.Item name="addressLine1" label="Address Line 1">
            <Input placeholder="Address Line 1" />
          </Form.Item>

          <Form.Item name="addressLine2" label="Address Line 2">
            <Input placeholder="Address Line 2" />
          </Form.Item>

          <Form.Item name="city" label="City">
            <Input placeholder="City" />
          </Form.Item>

          <Form.Item name="state" label="State">
            <Input placeholder="State" />
          </Form.Item>

          <Form.Item name="zipCode" label="Zip Code">
            <Input placeholder="Zip" />
          </Form.Item>

          <Form.Item name="countryName" label="Country">
            <Input placeholder="Country" />
          </Form.Item>

          <Form.Item name="additionalInfo" label="Additional Info">
            <Input placeholder="Additional Info" />
          </Form.Item>
        </div>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Save address
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClientDefaultAddressForm;
