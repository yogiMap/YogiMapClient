import React from 'react';
import { Button, Form, Input } from 'antd';
import validator from '@/utils/validators';
import { get } from 'lodash';
import { ISipPhone } from '@/pages/sipPhone/types';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: ISipPhone;
}

const SipPhoneForm = (props: IProps) => {
  const isLoading = get(props, 'isLoading', false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues}>
      <Form.Item name="phoneNumber" rules={[validator.require]}>
        <Input placeholder="Sip Phone number" />
      </Form.Item>

      <Form.Item name="description">
        <Input.TextArea placeholder="SipPhone Description" autoSize={{ minRows: 2, maxRows: 2 }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SipPhoneForm;
