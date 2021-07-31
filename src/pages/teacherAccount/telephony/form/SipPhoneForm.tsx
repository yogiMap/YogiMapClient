import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { get } from 'lodash';
import { ISipPhone } from '@/pages/telephony/types';
import { IUser } from '@/pages/user/userSearch/types';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: ISipPhone;
  teacherEmployees: IUser[];
}

const SipPhoneForm = (props: IProps) => {
  const isLoading = get(props, 'isLoading', false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">
      <Form.Item name="phoneNumber" label="Phone Number" rules={[validator.require]}>
        <Input placeholder="Sip Phone number" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea placeholder="SipPhone Description" autoSize={{ minRows: 2, maxRows: 2 }} />
      </Form.Item>

      {/*      <Form.Item label="Employee" name="owner">
        <Select placeholder="Please select">
          {props.teacherEmployees.map((el) => (
            <Select.Option key={el._id} value={el._id}>
              {el.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>*/}

      <Form.Item>
        <Button type="primary" shape="round" htmlType="submit" loading={isLoading}>
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SipPhoneForm;
