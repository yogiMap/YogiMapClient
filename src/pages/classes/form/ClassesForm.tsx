import React, { useEffect, useState } from 'react';
import { Button, DatePicker, TimePicker, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { IClasses } from '@/pages/classes/types';
import { get } from 'lodash';
import moment from 'moment';
import { IStyle } from '@/pages/style/types';
import { IClassType } from '@/pages/classType/types';
import FocusSearchInput from '@/pages/utils/searchInput/FocusSearchInput';
import { connect, withRouter } from 'umi';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IClasses;
  styleList: IStyle[];
  classTypeList: IClassType[];
}

const ClassesForm = (props: IProps) => {
  const { Option } = Select;

  const [form] = Form.useForm();
  const initialValues: any = get(props, 'initialValues', {});
  initialValues.dueDate = moment(initialValues.dueDate);
  initialValues.date = moment(initialValues.date);
  const name = get(props, 'Account.name', '');
  const email = get(props, 'Account.email', '');

  const [[date, dueDate], setDates] = useState([initialValues.date, initialValues.dueDate]);
  const [time, setTime] = useState(null);
  const onDateChange = (selectedDate: any) => setDates([selectedDate, dueDate < selectedDate ? selectedDate : dueDate]);
  const onTimeChange = (selectedTime: any) => setTime(selectedTime);

  const isLoading = get(props, 'isLoading', false);

  useEffect(() => {
    form.setFieldsValue({ date: date, dueDate: dueDate });
  }, [date, dueDate]);

  useEffect(() => {
    form.setFieldsValue({ date: time });
  }, [time]);

  return (
    <div className="container mt-5">
      <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical" name="classes">
        <div className="row mb-5">
          <div className="col-md-8">
            <h1>{name}</h1>
            <h6 className="mt-3">email: {email} </h6>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-md-6">
            <Form.Item name="name" label="Class Name" rules={[validator.require]}>
              <Input placeholder="Class Name" className="rounded-pill" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Yoga Focus" name="focus">
              <FocusSearchInput />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
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
          <div className="col-md-6">
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

        <div className="row">
          <div className="col">
            <Form.Item name="description" label="Description">
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} className="rounded-pill" />
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

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

// @ts-ignore
export default withRouter(connect(mapStateToProps)(ClassesForm));
