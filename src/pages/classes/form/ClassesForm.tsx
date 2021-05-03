import React, { useEffect, useState } from 'react';
import { Button, DatePicker, TimePicker, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { IClasses } from '@/pages/classes/types';
import { get } from 'lodash';
import moment from 'moment';
import { ITeacher } from '@/pages/teacher/types';
import { IStyle } from '@/pages/style/types';
import { IClassType } from '@/pages/classType/types';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IClasses;
  teacherList: ITeacher[];
  styleList: IStyle[];
  classTypeList: IClassType[];
}

const ClassesForm = (props: IProps) => {
  const { Option } = Select;

  const [form] = Form.useForm();
  const initialValues: any = get(props, 'initialValues', {});
  initialValues.dueDate = moment(initialValues.dueDate);
  initialValues.date = moment(initialValues.date);

  const [[date, dueDate], setDates] = useState([initialValues.date, initialValues.dueDate]);
  const [time, setTime] = useState(null);
  const onDateChange = (selectedDate: any) => setDates([selectedDate, dueDate < selectedDate ? selectedDate : dueDate]);
  const onTimeChange = (selectedTime: any) => setTime(selectedTime);

  const name = get(props, 'Account.name', '');
  const isLoading = get(props, 'isLoading', false);

  useEffect(() => {
    form.setFieldsValue({ date: date, dueDate: dueDate });
  }, [date, dueDate]);

  return (
    <div className="container mt-5">
      <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical" name="classes">
        <div className="row my-3">
          <div className="col">
            <Form.Item name="name" label="Class Name" rules={[validator.require]}>
              <Input placeholder="Class Name" className="rounded-pill" />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item name="classType" label="Class Type">
              <Select className="rounded-circle">
                {props.classTypeList.map((el) => (
                  <Option key={el._id} value={el._id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="row my-3">
          <div className="col">
            <Form.Item name="style" label="Yoga Style">
              <Select className="rounded-circle">
                {props.styleList.map((el) => (
                  <Option key={el._id} value={el._id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="col">
            <Form.Item name="teacher" label="Teacher" rules={[validator.require]}>
              <Select className="rounded-circle">
                {props.teacherList.map((el) => (
                  <Option key={el._id} value={el._id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Form.Item name="description" label="Description">
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} className="rounded-pill" />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Item label="Date" name="date" initialValue={date}>
              <DatePicker value={date} onChange={onDateChange} className="rounded-pill" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Time" name="time" initialValue={time}>
              <TimePicker value={time} onChange={onTimeChange} className="rounded-pill" />
            </Form.Item>
          </div>
        </div>

          <div className="col">
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading} shape="round">
                {props.submitButtonText}
              </Button>
            </Form.Item>
          </div>

      </Form>
    </div>
  );
};

export default ClassesForm;
