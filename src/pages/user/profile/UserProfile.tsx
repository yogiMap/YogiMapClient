import React, { useEffect, useRef } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Avatar, Button, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IUser } from '@/pages/user/userSearch/types';
import UserProfileTeacher from '@/pages/user/profile/UserProfileTeacher';
import UserProfileStudent from '@/pages/user/profile/UserProfileStudent';

interface IProps {
  name: string;
  User: IUser;
  userGetById: (id: string) => void;
  uploadAvatar: (payload: object) => void;
  userInfo: IUser;
  teacherAccountGetById: (teacherAccountId: string) => void;
}

const UserProfile = (props: IProps) => {
  const userId = get(props, 'match.params.userId', '');
  const teacherAccountId: string = get(props, 'User.teacherAccount', '');
  const userInfo = get(props, 'userInfo', '');
  const teacherName = get(userInfo, 'teacherAccount.name', '');
  const userName = get(userInfo, 'name', '');
  const email = get(userInfo, 'email', '');
  const phoneNumber = get(props, 'User.phoneNumber', '');
  const roles = get(userInfo, 'roles', []);
  const avatar = get(userInfo, 'avatar[1]', '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    props.userGetById(userId);
  }, []);

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
    <div>
      <div className="profile__header">
        <h1 className="text-center">Profile Page</h1>

        <div className="row">
          <div className="col">
            <h3 className="text-start text-colored-second my-4">{userName}</h3>
            <p className="text-start text-colored-third">Email: {email}</p>
            {phoneNumber && <p className="text-start text-colored-third">Phone: +1{phoneNumber}</p>}

            <div className="mt-3">
              User's roles:
              {roles.map((el: string) => (
                <span className="ms-2 text-colored-first">{el}</span>
              ))}
            </div>

            {teacherAccountId && (
              <div className="my-3">
                Teacher`s name:{' '}
                <Link to={`/teacherAccount/${teacherAccountId}`} className="primary-link">
                  {' '}
                  {teacherName}
                </Link>
              </div>
            )}
          </div>

          <div className="col">
            <div className="text-end">
              <div className="p-2">
                <Avatar src={avatar} size={200} icon={<UserOutlined />} />
                <div className="text-md-end mx-5">
                  <Button className="ps-0 pe-0" type="link" size="small" onClick={handleClick}>
                    Upload avatar
                  </Button>
                </div>
                <div>
                  <input
                    type="file"
                    className={'d-none'}
                    ref={inputRef}
                    onChange={(e) => uploadAvatarHandler(e.target.files![0])}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserProfileTeacher />
      <UserProfileStudent />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  User: state.User,
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  userGetById: (payload: string) => dispatch({ type: 'User/userGetById', payload }),
  uploadAvatar: (payload: object) => dispatch({ type: 'User/userUploadAvatar', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
