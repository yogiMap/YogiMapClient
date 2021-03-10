import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
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
    <Form size="large" name="user_login" className="login-form" onFinish={onFinish} onFieldsChange={onFieldsChange}>
      <h1>Create an account</h1>

      <Row gutter={6}>
        <Col span={12}>
          <Form.Item name="firstName" rules={[validator.require]} hasFeedback>
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="lastName" rules={[validator.require]} hasFeedback>
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="email" rules={[{ type: 'email' }, validator.require]} hasFeedback>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" rules={[validator.require]} hasFeedback>
        <Input.Password type="password" prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item name="agreement" valuePropName="checked" rules={[validator.require]}>
        <Checkbox>
          I have read <a onClick={showTerms}>Terms and agreements</a>
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
  userRegister: (payload: IRegisterForm) => dispatch({ type: 'Account/register', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
