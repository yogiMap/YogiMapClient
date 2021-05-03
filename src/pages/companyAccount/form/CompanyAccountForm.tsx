import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import validator from '@/utils/validators';
import { ICompanyAccount } from '@/pages/companyAccount/types';
import { get } from 'lodash';
import TimeZoneSearchInput from '@/pages/utils/searchInput/TimeZoneSearchInput';
import CountryStateSearchInput from '@/pages/utils/searchInput/CountryStatesSearchInput';
import CountrySearchInput from '@/pages/utils/searchInput/CountrySearchInput';
import PhoneInput from '@/pages/utils/phoneInput/PhoneInput';
import { IUser } from '@/pages/user/userSearch/types';
import FocusSearchInput from '@/pages/utils/searchInput/FocusSearchInput';
import dva from 'dva';

interface IProps {
  isLoading: boolean;
  onFinish: (values: ICompanyAccount) => void;
  submitButtonText: string;
  initialValues?:  ICompanyAccount;
}

const CompanyAccountForm = (props: IProps) => {
  const isLoading = get(props, 'isLoading', false);
  const accountCode = get(props, 'initialValues.code', 'n/a');
  const name = get(props, 'Account.name', '');
  const [addAdditionalPhoneMode, setAddAdditionalPhoneMode] = useState(false);
  // const firstName =

  return (
    <div className='container mt-5'>
    <Form onFinish={props.onFinish} initialValues={props.initialValues}
          layout='vertical' name='companyAccount'>

      <div className="row">
        <div className="col-md-10">
          <h6>Teacher Information</h6>
        </div>

        <div className="col-md-2">
          name: {name}
          <br/>
          Account ID: {accountCode}
        </div>
      </div>


      {/*<div className="row">*/}
      {/*  <div className="col">*/}
      {/*    <Form.Item label='First Name' name='firstName'>*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}
      {/* </div>*/}

      {/*  <div className="col">*/}
      {/*    <Form.Item label='Last Name' name='lastName'>*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}
      {/* </div>*/}
      {/*</div>*/}

      {/*<div className="row">*/}
      {/*  <div className="col">*/}
      {/*    <Form.Item label='Name' name='name'>*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}
      {/* </div>*/}
      {/* </div>*/}



      <div className="row">
        <div className="col-md-6">
          <Form.Item label="Yoga Focus" name="focus">
            <FocusSearchInput/>
          </Form.Item>
        </div>
      </div>


      <div className="row">
        <div className="col">
          <Form.Item name="phone" label="Phone">
            <PhoneInput  name="phoneNumber" required={false} />
          </Form.Item>
        </div>

        <div className="col-md-6">
        <Form.Item label="E-mail" name="email" rules={[validator.require]}>
          <Input />
        </Form.Item>
      </div>
      </div>

      <div className="row">
        <div className="col-md-12 mt-3">
          <h6>Teacher Location</h6>
        </div>
      </div>

      <div className="row">
        <div className="col-md-9">
          <Form.Item label="Teacher Address" name="address">
            <Input />
          </Form.Item>
        </div>

        <div className="col-md-1 pt-4">
          <Button type="primary" shape="round" className="mt-2">
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
          <Form.Item label="Time Zone" name="timeZone">
            <TimeZoneSearchInput />
          </Form.Item>
        </div>
      </div>

      <div className="row">
        <Form.Item className="mx-3">
          <Button type="primary" htmlType="submit" shape="round" loading={isLoading}>
            {props.submitButtonText}
          </Button>
        </Form.Item>
      </div>
    </Form>
    </div>
  );
};

export default CompanyAccountForm;
