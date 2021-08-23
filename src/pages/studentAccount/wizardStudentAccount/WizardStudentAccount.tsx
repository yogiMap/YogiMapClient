import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { connect } from 'umi';
import { get } from 'lodash';
import classNames from 'classnames';

import validator from '@/utils/validators';
import PhoneInput from '@/pages/utils/phone/phoneInput/PhoneInput';
import Check from '@/pages/utils/Check';
import { history } from '@@/core/history';
import { IPhone } from '@/pages/user/types';
import { useForm } from 'antd/es/form/Form';

export interface IStudentAccount {
  teacherName: string;
  phoneNumber: IPhone;
  email: string;
}

export interface IVerifyEmailArg {
  userId: string;
}

interface IProps {
  isLoading: boolean;
  submitButtonText: string;
  goToUserProfile: (userId: string) => void;
  studentAccountCreate: (values: IStudentAccount) => void;
  userVerifyEmailSend: (arg: { userId: object; email: string }) => void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const WizardStudentAccountStudentAccount = (props: IProps) => {
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [form] = useForm();

  const isLoadingAuth = get(props, 'loadingEffects.Account/auth', true);

  const email = get(props, 'Account.email', '');
  const emailConfirmed = get(props, 'Account.emailConfirmation.confirmed', false);
  const studentAccount = get(props, 'Account.studentAccount', false);
  const userId = get(props, 'Account._id', '');

  const [openResend, setOpenResend] = useState(false);

  const onSubmit = (values: any) => {
    props.studentAccountCreate({ ...values, email });
  };

  const onFinish = () => {
    history.push(`/profile/${userId}`);
  };

  const onConfirm = () => {
    history.push(`/profile/${userId}`);
  };

  const resetHandler = () => {
    setOpenResend(true);
  };

  const onFieldsChange = (_: any, allFields: any) => {
    const hasErrors = allFields.some((el: any) => el.errors.length);
    const hasEmptyFields = allFields.some((el: any) => !el.value);
    setDisableSubmit(hasErrors || hasEmptyFields);
  };

  const steps = ['Create StudentAccount`s Account', 'Email confirmation', 'Finish'];

  const [newEmail, setNewEmail] = useState('');

  const onChangeEmail = (e: any) => {
    setNewEmail(e.target.value);
  };

  const currentStep = () => {
    let step = steps[0];
    if (emailConfirmed) step = steps[1];
    if (emailConfirmed && studentAccount) step = steps[2];
    return step;
  };

  if (isLoadingAuth || !userId) return null;

  return (
    <div className="container mt-6rem">
      <div className="row">
        <div className="col-md-4">
          <div className="mb-4">
            <Check checked={emailConfirmed} />
            <span className={classNames('ms-2', currentStep() === steps[0] && 'fw-bold')}>Confirm Email</span>
          </div>

          <div className="mb-4">
            <Check checked={studentAccount} />
            <span className={classNames('ms-2', currentStep() === steps[1] && 'fw-bold')}>
              Create StudentAccount`s Account
            </span>
          </div>

          <div className="mb-4">
            <Check checked={emailConfirmed && studentAccount} />
            <span className={classNames('ms-2', currentStep() === steps[2] && 'fw-bold')}>All set</span>
          </div>
        </div>

        <div className="col-md-8">
          {currentStep() === steps[0] && (
            <Form name="confirm_email" onFieldsChange={onFieldsChange} onFinish={onConfirm}>
              {!openResend ? (
                <>
                  <h5>We sent you confirmation email to {email}.</h5>
                  <p>Please check your inbox (and spam folder) and verify.</p>
                  <p>
                    Have not received email?
                    <Button type="link" onClick={resetHandler}>
                      Resend confirmation email
                    </Button>
                  </p>
                </>
              ) : (
                <Form name="email">
                  <p>Resend confirmation email {newEmail} </p>

                  <Form.Item name="email" rules={[{ type: 'email' }, validator.require]}>
                    <Input placeholder="Email" defaultValue={email} onChange={onChangeEmail} value={newEmail} />
                  </Form.Item>

                  <Button type="primary" onClick={() => props.userVerifyEmailSend({ userId: userId, email: newEmail })}>
                    Resend
                  </Button>
                </Form>
              )}
            </Form>
          )}

          {currentStep() === steps[1] && (
            <Form
              name="normal_login"
              className="login-form"
              onFieldsChange={onFieldsChange}
              onFinish={onSubmit}
              layout="vertical"
              {...layout}
            >
              <h3 className="mb-5">Fill out your name and phone</h3>
              <Form.Item name="name" label="Name" rules={[validator.require]}>
                <Input placeholder="Name" />
              </Form.Item>

              <Form.Item name="phoneNumber">
                <PhoneInput label="Phone" name="phoneNumber" required={true} form={form} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" shape="round" htmlType="submit" disabled={disableSubmit}>
                  Next →
                </Button>
              </Form.Item>
            </Form>
          )}

          {currentStep() === steps[2] && (
            <>
              <div className=" mt-5 row">
                <div className="col">
                  <h5>Welcome to YogiMap!</h5>
                </div>
                <div className="col">
                  <Button type="primary" shape="round" htmlType="submit" onClick={onFinish}>
                    Let's get started
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  User: state.User,
});

const mapDispatchToProps = (dispatch: any) => ({
  studentAccountCreate: (payload: IStudentAccount) =>
    dispatch({ type: 'WizardStudentAccountForm/studentAccountCreate', payload }),
  userVerifyEmailSend: (payload: IVerifyEmailArg) =>
    dispatch({ type: 'WizardStudentAccountForm/userVerifyEmailSend', payload }),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(WizardStudentAccountStudentAccount);
