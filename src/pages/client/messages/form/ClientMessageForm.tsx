import React from 'react';
import { Button, Form, Input } from 'antd';
import { get } from 'lodash';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  phoneNumber: string;
}

function ClientMessageForm(props: IProps) {
  const isLoading = get(props, 'isLoading', false);
  const phoneNumber = get(props, 'phoneNumber', '');
  const phone = Object.values(phoneNumber).join('');

  return (
    <div className="mb-5 mt-2">
      <Form onFinish={props.onFinish} layout="inline">
        <Form.Item name="messageBody" label={`+${phone}`} style={{ width: '80%' }}>
          <Input placeholder="Enter an sms message" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" shape="round" htmlType="submit" loading={isLoading}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ClientMessageForm;
