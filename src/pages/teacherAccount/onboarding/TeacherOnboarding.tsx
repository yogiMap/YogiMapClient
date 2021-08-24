import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { connect } from 'umi';
import { get } from 'lodash';

import validator from '@/utils/validators';
import PhoneInput from '@/pages/utils/phone/phoneInput/PhoneInput';
import { history } from '@@/core/history';
import { IUser } from '@/pages/user/userSearch/types';
import FloatInput from '@/pages/utils/FloatInput';
import FloatSelect from '@/pages/utils/FloatSelect';
import FocusSearchInput from '@/pages/utils/searchInput/FocusSearchInput';

export interface ITeacherAccount {
  teacherName: string;
  phoneNumber: string;
  email: string;
}

export interface IVerifyEmailArg {
  userId: string;
}

interface IProps {
  isLoading: boolean;
  submitButtonText: string;
  goToUserProfile: (userId: string) => void;
  teacherAccountCreate: (values: ITeacherAccount) => void;
  userStepSubmit: (values: IUser) => void;
  userVerifyEmailSend: (arg: { userId: object; email: string }) => void;
}

const TeacherOnboarding = (props: IProps) => {
  const [disableSubmit, setDisableSubmit] = useState(true);

  const isLoadingAuth = get(props, 'loadingEffects.User/auth', true);

  // const firstName = get(props, 'User.firstName', '');
  // const lastName = get(props, 'User.lastName', '');
  // const emailHashConfirmation = get(props, 'User.emailConfirmation.hash', '');
  const name = get(props, 'User.name', '');
  const email = get(props, 'User.email', '');
  //  const emailConfirmed = get(props, 'User.emailConfirmation.confirmed', false);
  const teacherAccount = get(props, 'User.teacherAccount', false);
  const userId = get(props, 'User._id', '');

  // const [openResend, setOpenResend] = useState(false);

  const onSubmitUserStep = (values: any) => {
    props.userStepSubmit(values);
  };

  const onSubmitTeacherStep = (values: any) => {
    props.teacherAccountCreate(values);
  };

  const onFinish = () => {
    history.push(`/profile/${userId}`);
  };

  // const onConfirm = () => {
  //   history.push(`/profile/${userId}`);
  // };
  //
  // const resetHandler = () => {
  //   setOpenResend(true);
  // };

  const onFieldsChange = (_: any, allFields: any) => {
    const hasErrors = allFields.some((el: any) => el.errors.length);
    setDisableSubmit(hasErrors);
  };

  const steps = ['User', 'Teacher'];

  // const [newEmail, setNewEmail] = useState('');
  //
  // const onChangeEmail = (e: any) => {
  //   setNewEmail(e.target.value);
  // };

  const currentStep = () => {
    let step = steps[0];

    if (name && teacherAccount) history.push('/');
    else if (name) step = steps[1];

    return step;
  };

  if (isLoadingAuth || !userId) return null;

  return (
    <div>
      {/*<div className="col-md-4">*/}
      {/*  <div className="mb-4">*/}
      {/*    <Check checked={emailConfirmed} />*/}
      {/*    <span className={classNames('ms-2', currentStep() === steps[0] && 'fw-bold')}>Confirm Email</span>*/}
      {/*  </div>*/}

      {/*  <div className="mb-4">*/}
      {/*    <Check checked={teacherAccount} />*/}
      {/*    <span className={classNames('ms-2', currentStep() === steps[1] && 'fw-bold')}>Create Teacher</span>*/}
      {/*  </div>*/}
      {/*  */}
      {/*  <div className="mb-4">*/}
      {/*    <Check checked={emailConfirmed && teacherAccount} />*/}
      {/*    <span className={classNames('ms-2', currentStep() === steps[2] && 'fw-bold')}>All set</span>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*{currentStep() === steps[0] && (*/}
      {/*  <Form name="confirm_email" onFieldsChange={onFieldsChange} onFinish={onConfirm}>*/}
      {/*    {!openResend ? (*/}
      {/*      <>*/}
      {/*        <h5>We sent you confirmation email to {email}.</h5>*/}
      {/*        <p>Please check your inbox (and spam folder) and verify.</p>*/}
      {/*        <p>*/}
      {/*          Have not received email?*/}
      {/*          <Button type="link" onClick={resetHandler}>*/}
      {/*            Resend confirmation email*/}
      {/*          </Button>*/}
      {/*        </p>*/}
      {/*      </>*/}
      {/*    ) : (*/}
      {/*      <Form name="email">*/}
      {/*        <p>Resend confirmation email {newEmail} </p>*/}

      {/*        <Form.Item name="email" rules={[{ type: 'email' }, validator.require]}>*/}
      {/*          <Input placeholder="Email" defaultValue={email} onChange={onChangeEmail} value={newEmail} />*/}
      {/*        </Form.Item>*/}

      {/*        <Button type="primary" onClick={() => props.userVerifyEmailSend({ userId: userId, email: newEmail })}>*/}
      {/*          Resend*/}
      {/*        </Button>*/}
      {/*      </Form>*/}
      {/*    )}*/}
      {/*  </Form>*/}
      {/*)}*/}

      {currentStep() === steps[0] && (
        <Form size="large" name="user" onFieldsChange={onFieldsChange} onFinish={onSubmitUserStep} layout="vertical">
          <h3 className="mb-4">Who are you?</h3>

          <Form.Item name="fullName" rules={[validator.require, validator.minletters3, validator.maxlength30]}>
            <FloatInput label="Full Name" />
          </Form.Item>

          <PhoneInput name="phone" required={true} />

          <Form.Item>
            <Button type="primary" block htmlType="submit" disabled={disableSubmit}>
              Next
            </Button>
          </Form.Item>
        </Form>
      )}

      {currentStep() === steps[1] && (
        <Form size="large" name="user" onFieldsChange={onFieldsChange} onFinish={onSubmitTeacherStep} layout="vertical">
          <h3 className="mb-4">Set up your Teacher Account</h3>

          <Form.Item name="teacherName" rules={[validator.require, validator.minletters3, validator.maxlength30]}>
            <FloatInput label="Teacher name" />
          </Form.Item>

          <Form.Item label="Yoga Focus" name="focus">
            <FocusSearchInput />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit" disabled={disableSubmit}>
              Next
            </Button>
          </Form.Item>
        </Form>
      )}

      {currentStep() === steps[2] && (
        <>
          <h6>Welcome to YogiMap!</h6>

          <Button type="primary" htmlType="submit" onClick={onFinish}>
            Let's get started
          </Button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  User: state.User,
});

const mapDispatchToProps = (dispatch: any) => ({
  userStepSubmit: (payload: ITeacherAccount) => dispatch({ type: 'OnboardingForm/userStepSubmit', payload }),
  teacherAccountCreate: (payload: ITeacherAccount) =>
    dispatch({ type: 'OnboardingForm/teacherAccountCreate', payload }),
  userVerifyEmailSend: (payload: IVerifyEmailArg) => dispatch({ type: 'OnboardingForm/userVerifyEmailSend', payload }),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(TeacherOnboarding);
