import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { connect, Link } from 'umi';
import validator from '@/utils/validators';
import { Button, Form, Input } from 'antd';

export interface IVerifyEmail {
  userId: string;
  hash: string;
  // email: string;
}

interface IProps {
  userPasswordReset: (values: any) => void;
  emailVerify: (arg: IVerifyEmail) => void;
}

const UserEmailVerify = (props: IProps) => {
  const userId = get(props, 'match.params.userId');
  const hash = get(props, 'match.params.hash');
  const emailConfirmed = get(props, 'Account.emailConfirmation.confirmed', false);
  const email = get(props, 'Account.email', '');

  useEffect(() => {
    props.emailVerify({ userId, hash });
  }, []);

  const [newEmail, setNewEmail] = useState('');

  const onChangeEmail = (e: any) => {
    setNewEmail(e.target.value);
  };

  // @ts-ignore
  return (
    <div>
      {emailConfirmed && (
        <>
          <h5 className="text-center my-5"> Thank You! Email was Verified </h5>
          <div className="d-flex justify-content-center">
            <Link to={`/profile/${userId}`} className="button-link-primary">
              Have Fun
            </Link>
          </div>
        </>
      )}{' '}
      :{' '}
      {
        <Form name="email">
          <p>Resend confirmation email {newEmail} </p>

          <Form.Item name="email" rules={[{ type: 'email' }, validator.require]}>
            <Input placeholder="Email" defaultValue={email} onChange={onChangeEmail} value={newEmail} />
          </Form.Item>

          <Button type="primary" shape="round" onClick={() => props.emailVerify({ userId: userId, email: newEmail })}>
            Resend
          </Button>
        </Form>
      }
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  emailVerify: (payload: IVerifyEmail) => dispatch({ type: 'Account/emailVerify', payload }),
});

export default connect(null, mapDispatchToProps)(UserEmailVerify);
