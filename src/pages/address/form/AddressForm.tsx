import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import validator from '@/utils/validators';
import { IAddress } from '@/pages/address/types';
import { get } from 'lodash';
import ClientSearchInput from '@/pages/utils/searchInput/ClientSearchInput';
import Autocomplete from '@/pages/utils/googleUt/GoogleMap/Autocomplete';
import Map from '@/pages/utils/googleUt/GoogleMap/Map';
import { useJsApiLoader } from '@react-google-maps/api';
import { useForm } from 'antd/es/form/Form';
import JsApiLoaderOpts from '@/pages/utils/';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IAddress;
  clientId?: string;
}

const AddressForm = (props: IProps) => {
  const isLoading = get(props, 'isLoading', false);
  const [form] = useForm();

  const opts = JsApiLoaderOpts();
  const { isLoaded, loadError } = useJsApiLoader(opts);

  const [center, setCenter] = useState();
  const [addressFields, setAddressFields] = useState();

  const onChange = (center: any) => {
    center ? setCenter(center[0]) : null;
    center ? setAddressFields(center[1]) : null;
  };

  useEffect(() => form.setFieldsValue(addressFields));

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical" form={form}>
      {!props.clientId && (
        <Form.Item name="client" label="Client" rules={[validator.require]}>
          <ClientSearchInput />
        </Form.Item>
      )}

      {isLoaded ? (
        <Form.Item label="Address Search">
          <Autocomplete onChange={onChange} />
        </Form.Item>
      ) : (
        loadError
      )}

      <div className="row">
        <div className="col-8">
          <Form.Item name="addressLine1" label="Address Line 1">
            <Input placeholder="Address Line 2" />
          </Form.Item>
        </div>
        <div className="col-4">
          <Form.Item name="addressLine2" label="Address Line 2">
            <Input placeholder="Address Line 2" />
          </Form.Item>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Form.Item name="city" label="City">
            <Input placeholder="City" />
          </Form.Item>
        </div>
        <div className="col-4">
          <Form.Item name="state" label="State">
            <Input placeholder="State" />
          </Form.Item>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Form.Item name="zipCode" label="Zip">
            <Input placeholder="Zip" />
          </Form.Item>
        </div>
        <div className="col-4">
          <Form.Item name="countryName" label="Country">
            <Input placeholder="Country" />
          </Form.Item>
        </div>
      </div>

      {isLoaded ? (
        <Form.Item>
          <Map center={center} />
        </Form.Item>
      ) : (
        loadError
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddressForm;
