import React, { useRef } from 'react';
import { Avatar, Button, Form, Input, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IUser, IUserAccount } from '@/pages/user/userSearch/types';
import validator from '@/utils/validators';
import { get } from 'lodash';
import { connect } from 'umi';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 14 },
};

interface IProps {
  initialValues?: IUser;
  onFinish: (args: IUser) => void;
  Account: IUserAccount;
  uploadProfileImage: (payload: object) => void;
}

const UserSettingsEditProfileForm = (props: IProps) => {
  const userId = get(props, 'Account._id', '');
  console.log(userId, '+++++++++++++++++_________________');

  // @ts-ignore
  const inputFile = useRef<HTMLInputElement>('');

  const onClickHandler = (file: any) => {
    const data = new FormData();
    data.append('image', file);
    props.uploadProfileImage({ userId, data });
  };

  return (
    <div className="container mt-5">
      <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical" name="editProfile">
        <h2>Profile</h2>
        <div className="row">
          <div className="col">
            <Form.Item label="userName" name="name">
              <Input />
            </Form.Item>
          </div>

          <div className="col">
            <Avatar shape="square" size={100} icon={<UserOutlined />} style={{ marginLeft: '100px' }} />
            <input type="file" ref={inputFile} onChange={(e) => onClickHandler(e.target.files![0])} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Item label="E-mail" name="email" rules={[validator.require]}>
              <Input />
            </Form.Item>
          </div>
        </div>

        <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
          <Button type="primary" shape="round" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Profile: state.Profile,
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  uploadProfileImage: (payload: object) => dispatch({ type: 'Profile/userUploadImage', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsEditProfileForm);
