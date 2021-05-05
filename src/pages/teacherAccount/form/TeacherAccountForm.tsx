import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { ITeacherAccount } from '@/pages/teacherAccount/types';
import { get } from 'lodash';
import TimeZoneSearchInput from '@/pages/utils/searchInput/TimeZoneSearchInput';
import CountryStateSearchInput from '@/pages/utils/searchInput/CountryStatesSearchInput';
import CountrySearchInput from '@/pages/utils/searchInput/CountrySearchInput';
import PhoneInput from '@/pages/utils/phoneInput/PhoneInput';
import FocusSearchInput from '@/pages/utils/searchInput/FocusSearchInput';
import { useForm } from 'antd/es/form/Form';
import { connect, withRouter } from 'umi';
import { IUserAccount } from '@/pages/user/userSearch/types';
import JsApiLoaderOpts from '@/pages/utils/googleUt/GoogleMap/JsApiLoaderOpts';
import { useJsApiLoader } from '@react-google-maps/api';
import { IClassType } from '@/pages/classType/types';
import { IClasses } from '@/pages/classes/types';
import { IEvent } from '@/pages/event/types';
import { IStyle } from '@/pages/style/types';
import Autocomplete from '@/pages/utils/googleUt/GoogleMap/Autocomplete';
import TeacherAccountDashboardControlsDelete
  from '@/pages/user/settings/teacherAccount/controls/TeacherAccountDashboardControlsDelete';

interface IProps {
  isLoading: boolean;
  onFinish: (values: ITeacherAccount) => void;
  submitButtonText: string;
  initialValues?: ITeacherAccount;
  Account: IUserAccount;
  classTypeList: IClassType[];
  classesList: IClasses[];
  eventList: IEvent[];
  styleList: IStyle[];
}

const TeacherAccountForm = (props: IProps) => {
  const { Option } = Select;
  const isLoading = get(props, 'isLoading', false);
  const accountCode = get(props, 'initialValues.code', 'n/a');
  const name = get(props, 'Account.name', '');
  const email = get(props, 'Account.email', '');

  const [addAdditionalPhoneMode, setAddAdditionalPhoneMode] = useState(false);
  const [form] = useForm();
  const opts = JsApiLoaderOpts();
  // @ts-ignore
  const { isLoaded, loadError } = useJsApiLoader(opts);

  const [addressFields, setAddressFields] = useState();

  const onChange = (center: any) => {
    center ? setAddressFields(center[1]) : null;
  };
  useEffect(() => form.setFieldsValue(addressFields));

  // @ts-ignore
  return (
    <div className="container mt-5">
      <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical" name="teacherAccount">
        <div className="row mb-5">
          <div className="col-md-8">
            <h1>{name}</h1>
            <h6 className="mt-3">email: {email} </h6>
          </div>

          <div className="col-md-4 text-end">
            <h6>Teacher Information</h6>
            Account ID: {accountCode}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Form.Item name="name" label="Teacher's Name" rules={[{ required: true, message: 'Please input your Name' }]}>
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
          <div className="col">
            <Form.Item name="description" label="Description">
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
            <h6>Teacher Location</h6>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10">
            {isLoaded ? (
              <Form.Item label="Address Search">
                <Autocomplete onChange={onChange} />
              </Form.Item>
            ) : (
              loadError
            )}
          </div>

          <div className="col-md-2 pt-4">
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
        {/*<TeacherAccountDashboardControlsDelete/>*/}
      </Form>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

// @ts-ignore
export default withRouter(connect(mapStateToProps)(TeacherAccountForm));
