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
        <div className="row">
          <div className="col-md-10">
            <Form.Item name="name" label="Class Type" rules={[validator.require]}>
              <Input placeholder="Class Type" className="rounded-pill" />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10">
            <Form.Item name="description" label="Description">
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} className="rounded-pill" />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10">
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading} shape="round">
                {props.submitButtonText}
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};
1;

export default ClassTypeForm;
