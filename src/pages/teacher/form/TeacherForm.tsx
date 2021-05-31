import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { get } from 'lodash';
import { ITeacher } from '@/pages/teacher/types';
import { IClassType } from '@/pages/classType/types';
import { IClasses } from '@/pages/classes/types';
import { IEvent } from '@/pages/event/types';
import { IStyle } from '@/pages/style/types';
import JsApiLoaderOpts from '@/pages/utils/googleUt/GoogleMap/JsApiLoaderOpts';
import { useJsApiLoader } from '@react-google-maps/api';
import { useForm } from 'antd/es/form/Form';
import Autocomplete from '@/pages/utils/googleUt/GoogleMap/Autocomplete';
import { connect, withRouter } from 'umi';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: ITeacher;
  classTypeList: IClassType[];
  classesList: IClasses[];
  eventList: IEvent[];
  styleList: IStyle[];
}

const TeacherForm = (props: IProps) => {
  const { Option } = Select;

  const [form] = useForm();

  const opts = JsApiLoaderOpts();
  // @ts-ignore
  const { isLoaded, loadError } = useJsApiLoader(opts);

  const [addressFields, setAddressFields] = useState();

  const isLoading = get(props, 'isLoading', false);
  const accountCode = get(props, 'initialValues.code', 'n/a');
  const name = get(props, 'Account.name', '');

  const onChange = (center: any) => {
    center ? setAddressFields(center[1]) : null;
  };

  useEffect(() => form.setFieldsValue(addressFields));

  return (
    <div className="container mt-5">
      <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">
        <div className="row mb-5">
          <div className="col-md-8">
            <h1>{name}</h1>
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
              rules={[{ required: true, message: 'Please input your Name' }]}
            >
              <Input placeholder="Teacher`s Name" className="rounded-pill" />
            </Form.Item>
          </div>

          <div className="col">
            <Form.Item name="description" label="Description">
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} className="rounded-pill" />
            </Form.Item>
          </div>
        </div>

        <div className="row">
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
            <Form.Item name="classType" label="Type of Classes" rules={[validator.require]}>
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
        <div>
          <h6 className="my-3">Address</h6>
          <div className="row">
            <div className="col">
              <Form.Item name="addressLine1">
                <Input placeholder="Address Line 1" className="rounded-pill" />
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item name="addressLine2">
                <Input placeholder="Apartment/Unit/Suite #" className="rounded-pill" />
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item name="city">
                <Input placeholder="City" className="rounded-pill" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Form.Item name="state">
                <Input placeholder="State" className="rounded-pill" />
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item name="zipCode">
                <Input placeholder="Zip" className="rounded-pill" />
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item name="countryName">
                <Input placeholder="Country" className="rounded-pill" />
              </Form.Item>
            </div>
          </div>
        </div>

        {isLoaded ? (
          <Form.Item label="Address Search">
            <Autocomplete onChange={onChange} />
          </Form.Item>
        ) : (
          loadError
        )}
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
export default withRouter(connect(mapStateToProps)(TeacherForm));
