import React from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { get } from 'lodash';
import { ITeacher } from '@/pages/teacher/types';
import { ITeacherType } from '@/pages/teacherType/types';
import { IClasses } from '@/pages/classes/types';
import { IEvent } from '@/pages/event/types';
import { IStyle } from '@/pages/style/types';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: ITeacher;
  teacherTypeList: ITeacherType[];
  classesList: IClasses[];
  eventList: IEvent[];
  styleList: IStyle[];
}

const TeacherForm = (props: IProps) => {
  const { Option } = Select;

  const isLoading = get(props, 'isLoading', false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">

      <Form.Item name="name" label="Class Name" rules={[validator.require]}>
        <Input placeholder="Class Name" className="rounded-pill"/>
      </Form.Item>

      <Form.Item name="yogaStyle" label="Yoga Style" >
        <Input placeholder="yogaStyle" className="rounded-pill" />
      </Form.Item>

      <Form.Item name="style" label="Yoga Style" >
        <Select className="rounded-circle">
          {props.styleList.map((el) => (
            <Option key={el._id} value={el._id} >
              {el.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="location" label="Location">
        <Input placeholder="Location" className="rounded-pill"/>
      </Form.Item>

      <Form.Item name="phone" label="Phone">
        <Input placeholder="Phone" className="rounded-pill"/>
      </Form.Item>

      <Form.Item name="teacherType" label="type of yoga" rules={[validator.require]} >
        <Select className="rounded-circle">
          {props.teacherTypeList.map((el) => (
            <Option key={el._id} value={el._id} >
              {el.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="classes" label="classes" rules={[validator.require]}>
        <Select>
          {props.classesList.map((el) => (
            <Option key={el._id} value={el._id}>
              {el.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="event" label="event" >
        <Select>
          {props.eventList.map((el) => (
            <Option key={el._id} value={el._id}>
              {el.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} className="rounded-pill"/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} shape="round">
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeacherForm;
