import React, { useState } from 'react';
import { connect, Link } from 'umi';
import { Button, Form } from 'antd';
import validator from '@/utils/validators';
import { get } from 'lodash';
import FloatInput from '@/pages/utils/FloatInput';

interface ILoginForm {
  email: string;
  password: string;
}

interface IProps {
  userLogin: (arg: ILoginForm) => void;
  loadingEffects: { [key: string]: boolean };
}

const UserLogin = (props: IProps) => {
  const isLoading = get(props, 'loadingEffects.User/login', false);

  const [disableSubmit, setDisableSubmit] = useState(true);

  const onFinish = (formValues: any) => {
    props.userLogin(formValues);
  };

  const onFieldsChange = (_: any, allFields: any) => {
    const hasErrors = allFields.some((el: any) => el.errors.length);
    const hasEmptyFields = allFields.some((el: any) => !el.value);
    setDisableSubmit(hasErrors || hasEmptyFields);
  };

  return (
    <Form size="large" name="normal_login" className="login-form" onFieldsChange={onFieldsChange} onFinish={onFinish}>
      <h1>Welcome back!</h1>

      <Form.Item name="email" data-qa="normalEmail" rules={[{ type: 'email' }, validator.require]}>
        <FloatInput name="email" type="email" label="Email" />
      </Form.Item>

      <Form.Item name="password" rules={[validator.require]}>
        <FloatInput name="password" type="password" label="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" block htmlType="submit" disabled={disableSubmit} loading={isLoading}>
          Log in
        </Button>
      </Form.Item>

      <Form.Item>
        <p>
          Don’t have an account?
          <Link to="/user/register" className="login-link ms-2">
            Create one
          </Link>
          .
        </p>

        <p>
          Forgot your password?
          <Link to="/user/password/reset/request" className="login-link ms-2">
            Reset it
          </Link>
          .
        </p>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  userLogin: (payload: ILoginForm) => dispatch({ type: 'User/login', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
