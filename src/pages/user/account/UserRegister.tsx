import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import validator from '@/utils/validators';
import { connect, Link } from 'umi';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import FloatInput from '@/pages/utils/FloatInput';

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  teacherAccountId?: string;
  inviteHash?: string;
}

interface IProps {
  userRegister: (values: IRegisterForm) => void;
  open: (arg: ISidepanel) => void;
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
    props.open({
      title: 'Terms and conditions',
      component: 'TermsOfService',
      place: 'UserRegister',
      width: '50%',
    });
  };

  return (
    <Form
      size="large"
      name="register"
      className="sign-up-form"
      layout="vertical"
      onFinish={onFinish}
      onFieldsChange={onFieldsChange}
    >
      <h1 className="py-5">Create User`s Account</h1>

      <Form.Item name="email" rules={[validator.require, validator.email]} hasFeedback>
        <FloatInput type="email" name="email" label="Email" />
      </Form.Item>

      <Form.Item name="password" rules={[validator.require, validator.password]} hasFeedback>
        <FloatInput type="password" name="password" label="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" block htmlType="submit" disabled={disableSubmit}>
          Create your account
        </Button>
      </Form.Item>

      <Form.Item name="agreement" valuePropName="checked" rules={[validator.require]}>
        <Checkbox>
          By submitting this form you agree to{' '}
          <Button className="pl-1" size="small" type="link" onClick={showTerms} data-qa="termsBtn">
            Terms and Conditions
          </Button>
        </Checkbox>
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
  userRegister: (payload: IRegisterForm) => dispatch({ type: 'User/register', payload }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
