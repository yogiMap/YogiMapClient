import React, { useEffect, useState } from 'react';
import { Avatar, Button, Form, Input, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IUser } from '@/pages/user/userSearch/types';
import PhoneInput from '@/pages/utils/phoneInput/PhoneInput';
import validator from '@/utils/validators';
import Autocomplete from '@/pages/utils/googleUt/GoogleMap/Autocomplete';
import { useForm } from 'antd/es/form/Form';
import JsApiLoaderOpts from '@/pages/utils/googleUt/GoogleMap/JsApiLoaderOpts';
import { useJsApiLoader } from '@react-google-maps/api';
import { get } from 'lodash';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 14 },
};

interface IProps {
  initialValues?: IUser;
  onFinish: (args: IUser) => void;
}

const UserSettingsEditProfileForm = (props: IProps) => {
  const { Option } = Select;
  const [form] = useForm();

  const opts = JsApiLoaderOpts();
  // @ts-ignore
  const { isLoaded, loadError } = useJsApiLoader(opts);

  const [addressFields, setAddressFields] = useState();

  const isLoading = get(props, 'isLoading', false);

  const onChange = (center: any) => {
    center ? setAddressFields(center[1]) : null;
  };

  useEffect(() => form.setFieldsValue(addressFields));


  return (
    <div className="container mt-5">
    <Form onFinish={props.onFinish} initialValues={props.initialValues}
          layout='vertical' name='editProfile'>
      <h2>Profile</h2>
      <div className='row'>
        <div className='col'>
          <Form.Item label='First Name' name='firstName'>
            <Input />
          </Form.Item>
        </div>

        <div className='col'>
          <Form.Item label='Last Name' name='lastName'>
            <Input />
          </Form.Item>
        </div>

        <div className='col'>
          <Avatar shape='square' size={100} icon={<UserOutlined />}
                  style={{ marginLeft: '100px' }} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Form.Item name="phoneNumber">
            <PhoneInput label="Phone" name="phoneNumber" required={true} form={form} />
          </Form.Item>
        </div>

        <div className="col-md-6">
          <Form.Item label="E-mail" name="email" rules={[validator.require]}>
            <Input />
          </Form.Item>
        </div>
      </div>

      <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type='primary' shape="round" htmlType='submit'>
          Save
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default UserSettingsEditProfileForm;
