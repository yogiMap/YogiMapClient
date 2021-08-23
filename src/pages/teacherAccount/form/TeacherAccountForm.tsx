import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { ITeacherAccount } from '@/pages/teacherAccount/types';
import { get } from 'lodash';
import TimeZoneSearchInput from '@/pages/utils/searchInput/TimeZoneSearchInput';
import CountryStateSearchInput from '@/pages/utils/searchInput/CountryStatesSearchInput';
import CountrySearchInput from '@/pages/utils/searchInput/CountrySearchInput';
import PhoneInput from '@/pages/utils/phone/phoneInput/PhoneInput';
import FocusSearchInput from '@/pages/utils/searchInput/FocusSearchInput';
import { connect, withRouter } from 'umi';
import { IUser, IUserAccount } from '@/pages/user/userSearch/types';
import { IClassType } from '@/pages/classType/types';
import { IClasses } from '@/pages/classes/types';
import { IEvent } from '@/pages/event/types';
import { IStyle } from '@/pages/style/types';
import validator from '@/utils/validators';
import TeacherAccountDashboardControlsDelete from '@/pages/user/settings/teacherAccount/controls/TeacherAccountDashboardControlsDelete';

interface IProps {
  isLoading: boolean;
  onFinish: (values: ITeacherAccount) => void;
  submitButtonText: string;
  initialValues?: ITeacherAccount;
  User: IUser;
  classTypeList: IClassType[];
  classesList: IClasses[];
  eventList: IEvent[];
  styleList: IStyle[];
  country?: string;
}

const TeacherAccountForm = (props: IProps) => {
  const { Option } = Select;
  const isLoading = get(props, 'isLoading', false);
  const accountCode = get(props, 'initialValues.code', 'n/a');
  const name = get(props, 'Account.name', '');
  const email = get(props, 'Account.email', '');
  const country = get(props, 'initialValues.country', 'United States');
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [form] = Form.useForm();

  const onValuesChange = ({ country }: { country: string }) => {
    if (country) {
      setSelectedCountry(country);
      form.setFieldsValue({ state: '' });
    }
  };

  return (
    <div className="container mt-2">
      <h1 className="my-5 text-center">Teacher`s Account</h1>
      <Form
        form={form}
        onFinish={props.onFinish}
        initialValues={props.initialValues}
        layout="vertical"
        name="teacherAccount"
        onValuesChange={onValuesChange}
      >
        <div className="row my-5 border-bottom">
          <div className="col-md-8">
            <h5 className="text-colored-second text-start">{name}</h5>
            <h6 className="mt-3">email: {email} </h6>
          </div>

          <div className="col-md-4 text-end">
            <h6>Teacher Information</h6>
            Account ID: {accountCode}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Form.Item
              name="name"
              label="Teacher's Name"
              rules={[
                { required: true, message: 'Please input your Name' },
                validator.minletters3,
                validator.maxlength30,
              ]}
            >
              <Input placeholder="Teacher`s Name" className="rounded-pill" />
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
            <Form.Item name="styleList" label="Yoga Style" rules={[validator.require]}>
              <Select>
                {props.styleList.map((el) => (
                  <Option key={el._id} value={el._id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item name="classTypeList" label="Type of Classes">
              <Select>
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
          <div className="col-md-6">
            <Form.Item name="phoneNumber">
              <PhoneInput label="Phone" name="phoneNumber" required={true} />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item name="email" label="Teacher`s Email (optional)">
              <Input placeholder="email" className="rounded-pill" />
            </Form.Item>
          </div>
        </div>

        <div className="row mb-5 border-bottom">
          <div className="col-md-12">
            <Form.Item name="description" label="Description">
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} className="rounded-pill" />
            </Form.Item>
          </div>
        </div>

        <div className="row mt-5">
          <h6 className="text-colored-first text-start my-2">Teacher`s Location</h6>
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

        <div className="row my-4">
          <div className="col-md-6">
            <Form.Item label="State" name="state">
              <CountryStateSearchInput country={selectedCountry} />
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
              <TeacherAccountDashboardControlsDelete />
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
export default withRouter(connect(mapStateToProps)(TeacherAccountForm));
