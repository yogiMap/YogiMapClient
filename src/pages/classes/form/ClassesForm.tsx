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
  teacherAccountInfo: ITeacherAccount[];
}

const ClassesForm = (props: IProps) => {
  const name = get(props, 'Account.name', '');
  const email = get(props, 'Account.email', '');

  const { Option } = Select;
  const [form] = Form.useForm();
  const isLoading = get(props, 'isLoading', false);

  const initialValues: any = get(props, 'initialValues', {});
  initialValues.date = moment(initialValues.date);
  const [date, setDate] = useState(initialValues.date);
  const onDateChange = (selectedDate: any) => setDate(selectedDate);
  const teacherName = get(props, 'teacherAccountInfo.name', '');

  useEffect(() => {
    form.setFieldsValue({ date: date });
  }, [date]);

  console.log(teacherName);

  return (
    <div className="container mt-3">
      <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical" name="classes">
        <div className="row mb-5">
          <div className="col-md-6">
            <h1>Create Your Classes</h1>
            <h4 className="text-colored-second d-flex justify-content-start">{name}</h4>
            <p className="mt-3">email: {email} </p>
          </div>

          <div className="col-md-6 d-flex justify-content-end mt-4">
            <Form.Item name="teacherAccount" label="Teacher`s Name">
              <h5 className="text-colored-first">{teacherName}</h5>
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

        <div className="row">
          <div className="col-md-4">
            <Form.Item label="Date" name="date" initialValue={date}>
              <DatePicker value={date} onChange={onDateChange} className="rounded-pill" />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item label="Time" name="date" initialValue={date}>
              <TimePicker value={date} onChange={onDateChange} className="rounded-pill" />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item label="Duration" name="duration">
              <Input placeholder="Duration" className="rounded-pill" />
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
