import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { IClass } from '@/pages/class/types';
import { get } from 'lodash';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IClass;
}

const ClassForm = (props: IProps) => {
  //  const { Option } = Select;

  const isLoading = get(props, 'isLoading', false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues}>
      <Form.Item name="name" rules={[validator.require]}>
        <Input placeholder="Class Name" />
      </Form.Item>

      <Form.Item name="description">
        <Input.TextArea placeholder="Class Description" autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>

      {/*<TeacherForm.Item name="accessType" rules={[validator.require]}>*/}
      {/*  <Select placeholder="Access type">*/}
      {/*    <Option value="members">Members</Option>*/}
      {/*    <Option value="all">All</Option>*/}
      {/*  </Select>*/}
      {/*</TeacherForm.Item>*/}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClassForm;
