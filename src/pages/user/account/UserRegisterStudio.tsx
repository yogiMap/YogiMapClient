import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Select} from 'antd';
import { LockOutlined } from '@ant-design/icons';
import validator from '@/utils/validators';
import { connect, Link } from 'umi';

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IProps {
  userRegister: (values: IRegisterForm) => void;
}

const UserRegisterStudio = (props: IProps) => {
  const [disableSubmit, setDisableSubmit] = useState(true);

  const onFinish = (values: any) => {
    props.userRegister(values);
  };

  const onFieldsChange = (_: any, allFields: any) => {
    const hasErrors = allFields.some((el: any) => el.errors.length);
    const hasEmptyFields = allFields.some((el: any) => !el.value);
    setDisableSubmit(hasErrors || hasEmptyFields);
  };

  const showTerms = () => {
    console.log('showTerms');
  };

  const { Option } = Select;

  return (
    <Form size="large" name="user_login" className="login-form" onFinish={onFinish} onFieldsChange={onFieldsChange}>
      <h2>CREATE A STUDIO`S PROFILE</h2>
      <p>
        A Studio`s Profile must describe a real organisation with regular yoga classes that are open to the public.
        Creation of Studio Profile is only for managers or owners of a Studio.
      </p>

      <Form.Item name="Name of Studio" rules={[validator.require]} hasFeedback>
        <Input placeholder="Name of Studio" />
      </Form.Item>

      <Form.Item name="lastName" rules={[validator.require]} hasFeedback>
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item name="select" label="Select" hasFeedback rules={[{ required: true, message: 'Please select your country!' }]}
      >
        <Select placeholder="Please select a country">
          <Option value="usa">USA</Option>
          <Option value="usa">Canada</Option>
          <Option value="usa">Russia</Option>
          <Option value="china">China</Option>
        </Select>
      </Form.Item>

      <Form.Item name="email" rules={[{ type: 'email' }, validator.require]} hasFeedback>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" rules={[validator.require]} hasFeedback>
        <Input.Password type="password" prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item name="agreement" valuePropName="checked" rules={[validator.require]}>
        <Checkbox>
          I have read <a onClick={showTerms}>terms and conditions</a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={disableSubmit}>
          Register
        </Button>
      </Form.Item>

      <Form.Item>
        <p>
          Already have an account? Just click <Link to="/user/login">Log in</Link>.
        </p>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  userRegister: (payload: IRegisterForm) => dispatch({ type: 'Account/registerStudio', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterStudio);
