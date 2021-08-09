import React, { useRef } from 'react';
import { Avatar, Button, Form, Input } from 'antd';
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
  userInfo: IUser;
  onFinish: (args: IUser) => void;
  Account: IUserAccount;
  uploadAvatar: (payload: object) => void;
  userGetById: (id: string) => void;
}

const UserSettingsEditProfileForm = (props: IProps) => {
  const userId = get(props, 'initialValues.userId', '');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const uploadAvatarHandler = (file: any) => {
    const data = new FormData();
    data.append('avatar', file);
    props.uploadAvatar({ userId, data });
  };

  return (
    <div className="container mt-5">
      <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical" name="editProfile">
        <h2>Profile</h2>
        <div className="row">
          <div className="col-md-6">
            <div>
              <Form.Item
                label="userName"
                name="name"
                rules={[validator.name, validator.require, validator.maxlength20]}
              >
                <Input />
              </Form.Item>
            </div>

            <div>
              <Form.Item label="E-mail" name="email" rules={[validator.require]}>
                <Input />
              </Form.Item>
            </div>

            <div>
              <Form.Item label="Phone Number" name="phoneNumber" rules={[validator.usaPhone]}>
                <Input />
              </Form.Item>
            </div>
          </div>

          <div className="col-md-6">
            <div className="text-md-end mx-5">
              <Avatar src={props.initialValues?.avatar} size={200} icon={<UserOutlined />} />
              <div className="mx-5">
                <Button className="ps-0 pe-0" type="link" size="small" onClick={handleClick}>
                  Upload avatar
                </Button>
              </div>
            </div>
            <input
              type="file"
              className={'d-none'}
              ref={inputRef}
              onChange={(e) => uploadAvatarHandler(e.target.files![0])}
            />
          </div>
        </div>

        <Form.Item wrapperCol={{ ...layout.wrapperCol }} className="my-5">
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
  userInfo: state.Profile.userInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  userGetById: (payload: string) => dispatch({ type: 'Profile/userGetById', payload }),
  uploadAvatar: (payload: object) => dispatch({ type: 'Profile/userUploadAvatar', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsEditProfileForm);
