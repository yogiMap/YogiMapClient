import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import validator from '@/utils/validators';
import { connect, Link } from 'umi';

export interface IRegisterForm {
  userName: string;
  email: string;
  password: string;
}

interface IProps {
  userRegister: (values: IRegisterForm) => void;
}

const UserRegister = (props: IProps) => {
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

  return (
    <Form size="large" name="register" className="sign-up-form" onFinish={onFinish} onFieldsChange={onFieldsChange}>
      <h1 className="py-5">Create User`s Account</h1>

      <Form.Item name="name" rules={[validator.requireUsername, validator.name, validator.maxlength20]} hasFeedback>
        <Input prefix={<UserOutlined type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nickname" />
      </Form.Item>

      <Form.Item name="email" rules={[{ type: 'email' }, validator.require]} hasFeedback>
        <Input prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" rules={[validator.require, validator.minlength5]} hasFeedback>
        <Input.Password
          type="password"
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item name="agreement" valuePropName="checked" rules={[validator.require]}>
        <Checkbox>
          I have read <a onClick={showTerms}>Terms and Conditions</a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" shape="round" htmlType="submit" disabled={disableSubmit}>
          Register
        </Button>
      </Form.Item>

      <Form.Item>
        <p>
          Already have an account? Just click{' '}
          <Link to="/user/login" className="login-link ms-2">
            Log in
          </Link>
          .
        </p>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  userRegister: (payload: IRegisterForm) => dispatch({ type: 'Account/register', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
