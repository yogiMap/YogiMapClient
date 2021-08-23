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
  User: IUser;
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IEvent;
  styleList: IStyle[];
  classTypeList: IClassType[];
  teacherAccountInfo: ITeacherAccount;
}

const EventForm = (props: IProps) => {
  const name = get(props, 'User.name', '');
  const email = get(props, 'User.email', '');

  const { Option } = Select;
  const [form] = Form.useForm();
  const isLoading = get(props, 'isLoading', false);

  const initialValues: any = get(props, 'initialValues', {});
  initialValues.date = moment(initialValues.date);
  const [date, setDate] = useState(initialValues.date);
  const onDateChange = (selectedDate: any) => setDate(selectedDate);

  const minDate = moment().format('YYYY-MM-DD');
  const maxDate = moment().add(3, 'months').format('YYYY-MM-DD');

  useEffect(() => {
    form.setFieldsValue({ date: date });
  }, [date]);

  if (!props.teacherAccountInfo) return null;

  return (
    <div className="container mt-5">
      <Form onFinish={props.onFinish} initialValues={initialValues} layout="vertical" name="event">
        <div className="row mb-5">
          <div className="col-md-6">
            <h1>Create Your Classes</h1>
            <h4 className="text-colored-second d-flex justify-content-start">{name}</h4>
            <p className="mt-3">email: {email}</p>
          </div>

          <div className="col-md-6 d-flex justify-content-end mt-4">
            <Form.Item name="teacherAccountId" label="Teacher`s `Account" rules={[validator.require]}>
              <Select>
                <Option key={props.teacherAccountInfo._id} value={props.teacherAccountInfo._id}>
                  {props.teacherAccountInfo.name}
                </Option>
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
          <div className="col-md-4">
            <Form.Item label="Date" name="date" initialValue={date} rules={[validator.require]}>
              <DatePicker
                value={date}
                onChange={onDateChange}
                className="rounded-pill"
                disabledDate={(d) => !d || d.isBefore(minDate) || d.isAfter(maxDate)}
              />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item label="Time" name="date" initialValue={date} rules={[validator.require]}>
              <TimePicker value={date} onChange={onDateChange} use12Hours format="h:mm A" className="rounded-pill" />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item label="Duration (days)" name="duration" rules={[validator.require]}>
              <Input placeholder="Duration" className="rounded-pill" />
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
  User: state.User,
});

// @ts-ignore
export default withRouter(connect(mapStateToProps)(EventForm));
