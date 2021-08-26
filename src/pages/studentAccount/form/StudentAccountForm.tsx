import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { IStudentAccount } from '@/pages/studentAccount/types';
import { get } from 'lodash';
import TimeZoneSearchInput from '@/pages/utils/searchInput/TimeZoneSearchInput';
import CountryStateSearchInput from '@/pages/utils/searchInput/CountryStatesSearchInput';
import CountrySearchInput from '@/pages/utils/searchInput/CountrySearchInput';
import PhoneInput from '@/pages/utils/phone/phoneInput/PhoneInput';
import FocusSearchInput from '@/pages/utils/searchInput/FocusSearchInput';
import { useForm } from 'antd/es/form/Form';
import { connect, withRouter } from 'umi';
import { IUser } from '@/pages/user/userSearch/types';
import { IClassType } from '@/pages/classType/types';
import { IClasses } from '@/pages/classes/types';
import { IEvent } from '@/pages/event/types';
import { IStyle } from '@/pages/style/types';
import StudentAccountDashboardControlsDelete from '@/pages/user/settings/studentAccount/controls/StudentAccountDashboardControlsDelete';

interface IProps {
  isLoading: boolean;
  onFinish: (values: IStudentAccount) => void;
  submitButtonText: string;
  initialValues?: IStudentAccount;
  User: IUser;
  classTypeList: IClassType[];
  classesList: IClasses[];
  eventList: IEvent[];
  styleList: IStyle[];
}

const StudentAccountForm = (props: IProps) => {
  const isLoading = get(props, 'isLoading', false);
  const accountCode = get(props, 'initialValues.code', 'n/a');
  const name = get(props, 'User.name', '');
  const email = get(props, 'User.email', '');

  const [form] = useForm();
  const { Option } = Select;

  return (
    <div className="container mt-2">
      <h1 className="my-5 text-center">Student`s Account</h1>
      <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical" name="studentAccount">
        <div className="row my-5 border-bottom">
          <div className="col-md-8">
            <h5 className="text-colored-second text-start">{name}</h5>
            <h6 className="mt-3">email: {email} </h6>
          </div>

          <div className="col-md-4 text-end">
            <h6>Student`s Information</h6>
            Account ID: {accountCode}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please input your First Name' }]}
            >
              <Input placeholder="First Name" className="rounded-pill" />
            </Form.Item>
          </div>

          <div className="col">
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please input your Last Name' }]}
            >
              <Input placeholder="Last Name" className="rounded-pill" />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Item label="Yoga Focus" name="focus">
              <FocusSearchInput />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item name="description" label="About Your Yoga History">
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} className="rounded-pill" />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Item name="phoneNumber">
              <PhoneInput label="Phone" name="phoneNumber" required={true} form={form} />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mt-3">
            <h6>Your Address</h6>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Item label="Address Line 1" name="addressLine1">
              <Input />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item label="Address Line 2" name="addressLine2">
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Item label="Country" name="country">
              <CountrySearchInput />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Item label="State" name="state">
              <CountryStateSearchInput />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item label="Zip Code" name="zipCode">
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Item label="Time Zone" name="timeZone">
              <TimeZoneSearchInput />
            </Form.Item>
          </div>
        </div>

        <div className="row my-5">
          <div className="col">
            <Form.Item className="mx-3">
              <Button type="primary" htmlType="submit" shape="round" loading={isLoading}>
                {props.submitButtonText}
              </Button>
            </Form.Item>
          </div>

          <div className="col">
            <Form.Item className="mx-3">
              <StudentAccountDashboardControlsDelete />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  User: state.User,
});

// @ts-ignore
export default withRouter(connect(mapStateToProps)(StudentAccountForm));
