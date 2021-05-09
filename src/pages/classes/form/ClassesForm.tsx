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
import { ITeacherAccount } from '@/pages/teacherAccount/types';

interface IProps {
  Account: IUserAccount;
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IClasses;
  styleList: IStyle[];
  classTypeList: IClassType[];
  teacherAccountList: ITeacherAccount[];
}

const ClassesForm = (props: IProps) => {
  const { Option } = Select;

  const [form] = Form.useForm();
  // const initialValuesDate: any = get(props, 'initialValues', {});
  // initialValuesDate.date = moment(initialValuesDate.date);
  // const initialValuesTime: any = get(props, 'initialValues', {});
  // initialValuesTime.time = moment(initialValuesTime.time);
  const name = get(props, 'Account.name', '');
  const email = get(props, 'Account.email', '');

  // const [date, setDates] = useState(initialValuesDate.date);
  // const [time, setTime] = useState(initialValuesTime.time);
  // const onDateChange = (selectedDate: any) => setDates(selectedDate);
  // const onTimeChange = (selectedTime: any) => setTime(selectedTime);

  const isLoading = get(props, 'isLoading', false);

  // useEffect(() => {
  //   form.setFieldsValue({ date: date });
  // }, [date]);

  // useEffect(() => {
  //   form.setFieldsValue({ time: time });
  // }, [time]);

  return (
    <div className="container mt-5">
      <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical" name="classes">
        <div className="row mb-5">
          <div className="col-md-6">
            <h1>{name}</h1>
            <h6 className="mt-3">email: {email} </h6>
          </div>
          <div className="col-md-6">
            <Form.Item name="teacherAccount" label="teacherAccount">
              <Select className="rounded-circle">
                {props.teacherAccountList.map((el) => (
                  <Option key={el._id} value={el._id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
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

        {/*<div className="row">*/}
        {/*  <h5>Date And Time of the Class</h5>*/}
        {/*  <div className="col-md-6">*/}
        {/*    <Form.Item label="Date" name="date" initialValue={date}>*/}
        {/*      <DatePicker value={date} onChange={onDateChange} size="large" />*/}
        {/*    </Form.Item>*/}
        {/*  </div>*/}
        {/*  <div className="col-md-6">*/}
        {/*    <Form.Item label="Time" name="time" initialValue={initialValuesTime}>*/}
        {/*      <DatePicker value={time} onChange={onTimeChange} size="large" />*/}
        {/*    </Form.Item>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="row">
          <h5>Date And Time of the Class</h5>
          <div className="col-md-6">
            <Form.Item name="Date" label="Date">
              <DatePicker format="MM.DD.YYYY" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item name="time" label="Time">
              <TimePicker use12Hours format="h:mm A" />
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
