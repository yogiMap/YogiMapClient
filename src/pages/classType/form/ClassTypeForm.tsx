import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { IClassType } from '@/pages/classType/types';
import { get } from 'lodash';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IClassType;
}

const ClassTypeForm = (props: IProps) => {
  //const { Option } = Select;

  const isLoading = get(props, 'isLoading', false);

  return (
    <div className="container">
      <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">
        <Form.Item name="name" label="Type Of Yoga" rules={[validator.require]}>
          <Input placeholder="Type Of Yoga" className="rounded-pill" />
        </Form.Item>

        {/*<ClassTypeForm.Item name="accessType" rules={[validator.require]}>*/}
        {/*  <Select placeholder="Access type">*/}
        {/*    <Option value="members">Members</Option>*/}
        {/*    <Option value="all">All</Option>*/}
        {/*  </Select>*/}
        {/*</ClassTypeForm.Item>*/}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} shape="round">
            {props.submitButtonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ClassTypeForm;
