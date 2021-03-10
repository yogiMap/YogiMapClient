import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { IVendorType } from '@/pages/vendorType/types';
import { get } from 'lodash';
import { IVendor } from '@/pages/vendor/types';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IVendor;
  vendorTypeList: IVendorType[];
}

const VendorForm = (props: IProps) => {
  const { Option } = Select;

  const isLoading = get(props, 'isLoading', false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">

      <Form.Item name="name" label="Name" rules={[validator.require, { required: true, message: 'Please input your name or name of Studio!' }]}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="vendorType" label="type of yoga" rules={[validator.require]}>
        <Select>
          {props.vendorTypeList.map((el) => (
            <Option key={el._id} value={el._id}>
              {el.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="yogaStyle" label="yogaStyle">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>

      <Form.Item name="location" label="Location">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="phone" label="Phone">
        <Input.TextArea />
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VendorForm;
