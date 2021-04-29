import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import validator from '@/utils/validators';
import { ITeacherAccount } from '@/pages/teacherAccount/types';
import { get } from 'lodash';
import TimeZoneSearchInput from '@/pages/utils/searchInput/TimeZoneSearchInput';
import CountryStateSearchInput from '@/pages/utils/searchInput/CountryStatesSearchInput';
import CountrySearchInput from '@/pages/utils/searchInput/CountrySearchInput';
import PhoneInput from '@/pages/utils/phoneInput/PhoneInput';

interface IProps {
  isLoading: boolean;
  onFinish: (values: ITeacherAccount) => void;
  submitButtonText: string;
  initialValues?: ITeacherAccount;
}

const TeacherAccountForm = (props: IProps) => {
  const isLoading = get(props, 'isLoading', false);
  const teacherCode = get(props, 'initialValues.code', 'n/a');
  const [addAdditionalPhoneMode, setAddAdditionalPhoneMode] = useState(false);

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">
      <div className="row">
        <div className="col-md-10">
          <h6>Teacher Information</h6>
        </div>
        <div className="col-md-2">Account ID: {teacherCode}</div>
      </div>
      <Form.Item label="Teacher Name" name="teacherName" rules={[validator.require]}>
        <Input placeholder="Please enter Teacher Name" />
      </Form.Item>

      <div className="row">
        <div className="col-md-6">
          <Form.Item name="phoneNumber1" label="Phone 1">
            <PhoneInput />
          </Form.Item>
        </div>
        <div className="col-md-6">
          {!addAdditionalPhoneMode && (
            <Button
              className="pt-5"
              type="link"
              size="small"
              onClick={() => setAddAdditionalPhoneMode(!addAdditionalPhoneMode)}
            >
              + Phone
            </Button>
          )}
          {addAdditionalPhoneMode && (
            <Form.Item name="phoneNumber2" label="Phone 2">
              <PhoneInput />
            </Form.Item>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Form.Item label="E-mail" name="email" rules={[validator.require]}>
            <Input />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="Fax" name="fax">
            <Input type="number" />
          </Form.Item>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mt-3">
          <h6>Teacher Location</h6>
        </div>
      </div>

      <div className="row">
        <div className="col-md-11">
          <Form.Item label="Teacher Address" name="address">
            <Input />
          </Form.Item>
        </div>
        <div className="col-md-1 pt-4">
          <Button type="primary" className="mt-2">
            Search
          </Button>
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
          <Form.Item label="Currency" name="currency">
            <Input disabled={true} defaultValue="USA" />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="Time Zone" name="timeZone">
            <TimeZoneSearchInput />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <Form.Item className="mx-3">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {props.submitButtonText}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default TeacherAccountForm;
