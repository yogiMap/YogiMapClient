import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Select, TimePicker } from 'antd';
import validator from '@/utils/validators';
import { IEvent } from '@/pages/event/types';
import { get } from 'lodash';
import moment from 'moment';
import { IStyle } from '@/pages/style/types';
import { IClassType } from '@/pages/classType/types';
import { IUserAccount } from '@/pages/user/userSearch/types';
import FocusSearchInput from '@/pages/utils/searchInput/FocusSearchInput';
import { connect, withRouter } from 'umi';
import { ITeacherAccount } from '@/pages/teacherAccount/types';

interface IProps {
  Account: IUserAccount;
  TeacherAccountDashboard: ITeacherAccount;
  isLoading: boolean;
  create: (arg: IEvent) => void;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IEvent;
  styleList: IStyle[];
  classTypeList: IClassType[];
  teacherAccountList: ITeacherAccount[];
}

const EventForm = (props: IProps) => {
  const { Option } = Select;

  const name = get(props, 'teacherAccountList.name', '');
  const email = get(props, 'teacherAccountList.email', '');
  const teacherAccountId = get(props, 'teacherAccountList._id', '');
  // const name = get(props, 'Account.name', '');
  // const email = get(props, 'Account.email', '');

  const [form] = Form.useForm();

  const initialValues: any = get(props, 'initialValues', {});
  // initialValues.dueDate = moment(initialValues.dueDate);
  initialValues.date = moment(initialValues.date);

  const [date, setDate] = useState(initialValues.date);
  const onDateChange = (selectedDate: any) => setDate(selectedDate);

  const isLoading = get(props, 'isLoading', false);

  // const onValueChange = (a: any) => {
  //   console.log('onValueChange', a);
  //   if (a.date) {
  //     console.log(a.date.format('MMMM Do YYYY'));
  //   }
  // };

  useEffect(() => {
    form.setFieldsValue({ date: date });
  }, [date]);

  return (
    <div className="container mt-5">
      <Form onFinish={props.onFinish} initialValues={initialValues} layout="vertical" name="event">
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
          <div className="col">
            <Form.Item name="name" label="Event Name" rules={[validator.require]}>
              <Input placeholder="Event Name" className="rounded-pill" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Yoga Focus" name="focus">
              <FocusSearchInput />
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
            <Form.Item label="Date" name="eventDate" initialValue={date}>
              <DatePicker value={date} onChange={onDateChange} className="rounded-pill" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Time" name="date" initialValue={date}>
              <TimePicker value={date} onChange={onDateChange} className="rounded-pill" />
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} shape="round">
            {props.submitButtonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

// @ts-ignore
export default withRouter(connect(mapStateToProps)(EventForm));
