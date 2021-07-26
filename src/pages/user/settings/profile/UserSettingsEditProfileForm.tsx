import React, { useRef, useCallback } from 'react';
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
  onFinish: (args: IUser) => void;
  Account: IUserAccount;
  uploadProfileImage: (payload: object) => void;
  removeProfileImage: (userId: string) => void;
}

const UserSettingsEditProfileForm = (props: IProps) => {
  // const userId = get(props, 'Account._id', '');
  const userId = get(props, 'initialValues.userId', '');
  console.log(userId, '+++++++++++++++++_________________');
  // @ts-ignore
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const uploadImageHandler = (file: any) => {
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
            <div className={'ms-5 d-flex flex-column'}>
              <Avatar src={props.initialValues?.image} shape="square" size={100} icon={<UserOutlined />} />
              <div>
                <Button className="ps-0 pe-0" type="link" size="small" onClick={handleClick}>
                  Upload an image
                </Button>
              </div>
              <div>
                <Button
                  className="ps-0 pe-0"
                  type="link"
                  size="small"
                  onClick={() => props.uploadProfileImage({ userId, data: {} })}
                >
                  Remove Photo
                </Button>
              </div>
            </div>
            <input
              type="file"
              className={'d-none'}
              ref={inputRef}
              onChange={(e) => uploadImageHandler(e.target.files![0])}
            />
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
