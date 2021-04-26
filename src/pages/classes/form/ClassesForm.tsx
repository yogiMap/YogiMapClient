import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { IClasses } from '@/pages/classes/types';
import { get } from 'lodash';
import moment from 'moment';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IClasses;
}

const ClassesForm = (props: IProps) => {
   const { Option } = Select;

  const [form] = Form.useForm();
  const initialValues: any = get(props, 'initialValues', {});
  initialValues.dueDate = moment(initialValues.dueDate);
  initialValues.date = moment(initialValues.date);

  const [[date, dueDate], setDates] = useState([initialValues.date, initialValues.dueDate]);
  const onDateChange = (selectedDate: any) => setDates([selectedDate, dueDate < selectedDate ? selectedDate : dueDate]);

  const isLoading = get(props, 'isLoading', false);

  useEffect(() => {
    form.setFieldsValue({ date: date, dueDate: dueDate });
  }, [date, dueDate]);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues}>

      <Form.Item name="name" label="Class Name" rules={[validator.require]}>
        <Input placeholder="Class Name" className="rounded-pill"/>
      </Form.Item>

      <Form.Item name="yogaStyle" label="Yoga Style" >
        <Input placeholder="yogaStyle" className="rounded-pill" />
      </Form.Item>

      <Form.Item name="classesType" label="Classes Type">
        <Input placeholder="Classes Type" className="rounded-pill"/>
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} className="rounded-pill"/>
      </Form.Item>

      <Form.Item label="Date" name="date" initialValue={date}>
        <DatePicker value={date} onChange={onDateChange} className="rounded-pill" />
      </Form.Item>

      {/*<TeacherForm.Item name="accessType" rules={[validator.require]}>*/}
      {/*  <Select placeholder="Access type">*/}
      {/*    <Option value="members">Members</Option>*/}
      {/*    <Option value="all">All</Option>*/}
      {/*  </Select>*/}
      {/*</TeacherForm.Item>*/}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} shape="round">
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClassesForm;
