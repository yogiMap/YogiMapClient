import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { ITeacherType } from '@/pages/teacherType/types';
import { get } from 'lodash';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: ITeacherType;
}

const TeacherTypeForm = (props: IProps) => {
  //const { Option } = Select;

  const isLoading = get(props, 'isLoading', false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">

      <Form.Item name="name" label="Name"
        rules={[validator.require, { required: true, message: 'Please input your name or name of Studio!' }]}>
        <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }}/>
      </Form.Item>

      <Form.Item name="yogaStyle" label="yogaStyle">
        <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }} />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="location" label="Location">
        <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }}/>
      </Form.Item>

      <Form.Item name="phone" label="Phone">
        <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }} />
      </Form.Item>

      <Form.Item name="price" label="Price">
        <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }} />
      </Form.Item>

      <Form.Item name="rating" label="Rating">
        <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }}/>
      </Form.Item>

      {/*<TeacherTypeForm.Item name="accessType" rules={[validator.require]}>*/}
      {/*  <Select placeholder="Access type">*/}
      {/*    <Option value="members">Members</Option>*/}
      {/*    <Option value="all">All</Option>*/}
      {/*  </Select>*/}
      {/*</TeacherTypeForm.Item>*/}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeacherTypeForm;
