import React, { useEffect, useRef } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { Avatar, Button, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IUser } from '@/pages/user/userSearch/types';

interface IProps {
  teacherAccountId: string;
  studentAccountId: string;
  name: string;
  teacherAccountGetById: (teacherAccountId: string) => void;
  studentAccountGetById: (studentAccountId: string) => void;
  Account: IUserAccount;
  userGetById: (id: string) => void;
  uploadAvatar: (payload: object) => void;
  userInfo: IUser;
}

const UserProfile = (props: IProps) => {
  const teacherAccountId: string = get(props, 'Account.teacherAccount', '');
  const studentAccountId: string = get(props, 'Account.studentAccount', '');
  const userId = get(props, 'match.params.userId', '');

  const userInfo = get(props, 'userInfo', '');
  const userName = get(userInfo, 'name', '');
  const email = get(userInfo, 'email', '');
  const roles = get(userInfo, 'roles', []);
  const avatar = get(userInfo, 'avatar[1]', '');
  const inputRef = useRef<HTMLInputElement>(null);

  //teacher account info
  const teacherAccountInfo = get(props, 'teacherAccountInfo', '');
  const teacherName = get(teacherAccountInfo, 'name', '');
  const teacherPhone = get(teacherAccountInfo, 'phoneNumber.number', '');
  const teacherFocus = get(teacherAccountInfo, 'focus', '');
  const teacherClassType = get(teacherAccountInfo, 'classType', '');
  const teacherClasses = get(teacherAccountInfo, 'classes', '');
  const teacherEvent = get(teacherAccountInfo, 'event', '');
  const teacherDescription = get(teacherAccountInfo, 'description', '');
  const teacherAddressLine1 = get(teacherAccountInfo, 'addressLine1', '');
  const teacherAddressLine2 = get(teacherAccountInfo, 'addressLine2');
  const teacherCity = get(teacherAccountInfo, 'city', '');
  const teacherCountry = get(teacherAccountInfo, 'country', '');
  const teacherState = get(teacherAccountInfo, 'state', '');
  const teacherTimeZone = get(teacherAccountInfo, 'timeZone', '');
  const teacherZipCode = get(teacherAccountInfo, 'zipCode', '');

  //studentAccount account info
  const studentAccountInfo = get(props, 'studentAccountInfo', '');
  const firstName = get(studentAccountInfo, 'firstName', '');
  const lastName = get(studentAccountInfo, 'lastName', '');
  const studentAccountPhone = get(studentAccountInfo, 'phoneNumber.number', '');
  const studentAccountFocus = get(studentAccountInfo, 'focus', '');
  const studentAccountClassType = get(studentAccountInfo, 'classType', '');
  const studentAccountDescription = get(studentAccountInfo, 'description', '');
  const studentAccountAddressLine1 = get(studentAccountInfo, 'addressLine1', '');
  const studentAccountAddressLine2 = get(studentAccountInfo, 'addressLine2', '');
  const studentAccountCity = get(studentAccountInfo, 'city', '');
  const studentAccountCountry = get(studentAccountInfo, 'country', '');
  const studentAccountState = get(studentAccountInfo, 'state', '');
  const studentAccountTimeZone = get(studentAccountInfo, 'timeZone', '');
  const studentAccountZipCode = get(studentAccountInfo, 'zipCode', '');

  useEffect(() => {
    props.userGetById(userId);
    props.teacherAccountGetById(teacherAccountId);
    //какая то проблема с загрузкой студента
    // props.studentAccountGetById(studentAccountId);
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
      <div className="profile-header">
        <h1 className="text-center">Profile Page</h1>

        <div className="row">
          <div className="col">
            <h3 className="text-start text-colored-second my-3">{userName}</h3>
            <p className="text-start text-colored-third">Email: {email}</p>

            {teacherAccountId && (
              <div className=" bd-highlight">
                <Row>
                  Teacher`s name: <Link to={`/teacherAccount/${teacherAccountId}`}> {teacherName}</Link>
                </Row>
              </div>
            )}

            <div className="mt-3">
              User's roles:
              {roles.map((el: string) => (
                <span className="ms-2 text-colored-first">{el}</span>
              ))}
            </div>
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

      <div className="container my-5">
        {teacherAccountId && (
          <div className="teacher-description">
            <div className="border-bottom">
              <h5 className="text-colored-second my-5">{userName} Has a Teacher Account</h5>

              <div className="row my-3 border-bottom">
                <div className="col-md-4 text-colored-third">Teacher's Name</div>
                <div className="col-md-4 text-colored-first">{teacherName}</div>
              </div>

              <div className="row my-3 border-bottom">
                <div className="col-md-4 text-colored-third">Phone</div>
                <div className="col-md-4 text-colored-first">{teacherPhone}</div>
              </div>

              <div className="row my-3 border-bottom">
                <div className="col-md-4 text-colored-third">About</div>
                <div className="col-md-4 text-colored-first">{teacherDescription}</div>
              </div>

              <div className="row my-3 border-bottom">
                <div className="col-md-4 text-colored-third">Yoga focus</div>
                <div className="col-md-4 text-colored-first">{teacherFocus}</div>
              </div>

              <div className="row my-3 border-bottom text-colored-second">
                <div className="col-md-4 text-colored-third">TimeZone</div>
                <div className="col-md-4 text-colored-first">{teacherTimeZone}</div>
              </div>

              <div className="row my-3 border-bottom">
                <div className="col-md-4 text-colored-third">Preferred classType</div>
                <div className="col-md-4 text-colored-first">{teacherClassType}</div>
              </div>

              <div className="row my-3 border-bottom">
                <div className="col-md-4 text-colored-third">Classes</div>
                <div className="col-md-4 text-colored-first">{teacherClasses}</div>
              </div>

              <div className="row my-3 border-bottom text-colored-second">
                <div className="col-md-4 text-colored-third">Events</div>
                <div className="col-md-4 text-colored-first">{teacherEvent}</div>
              </div>

              <p>
                Teacher's Address:
                <span className="ms-3 text-colored-first">{`${teacherAddressLine1} ${teacherAddressLine2} ${teacherCity}, ${teacherState}, ${teacherZipCode}, ${teacherCountry}`}</span>
              </p>
            </div>
          </div>
        )}

        {studentAccountId && (
          <div className="student-description">
            <div className="my-5 border-bottom">
              <h5 className="text-colored-second my-5">{userName} Has a Student Account</h5>

              <div className="row my-3 border-bottom">
                <div className="col-md-4 text-colored-third">Student's Name</div>
                <div className="col-md-4 text-colored-first">
                  {firstName} {lastName}
                </div>
              </div>

              <div className="row my-3 border-bottom">
                <div className="col-md-4 text-colored-third">Phone</div>
                <div className="col-md-4 text-colored-first">{studentAccountPhone}</div>
              </div>

              <div className="row my-3 border-bottom">
                <div className="col-md-4 text-colored-third">About</div>
                <div className="col-md-4 text-colored-first">{studentAccountDescription}</div>
              </div>

              <div className="row my-3 border-bottom">
                <div className="col-md-4 text-colored-third">Yoga focus</div>
                <div className="col-md-4 text-colored-first">{studentAccountFocus}</div>
              </div>

              <div className="row my-3 border-bottom text-colored-second">
                <div className="col-md-4 text-colored-third">TimeZone</div>
                <div className="col-md-4 text-colored-first">{studentAccountTimeZone}</div>
              </div>

              <div className="row my-3 border-bottom">
                <div className="col-md-4 text-colored-third">Preferred classType</div>
                <div className="col-md-4 text-colored-first">{studentAccountClassType}</div>
              </div>

              <p>
                Student's Address:
                <span className="ms-3 text-colored-first">{`${studentAccountAddressLine1} ${studentAccountAddressLine2} ${studentAccountCity}, ${studentAccountState}, ${studentAccountZipCode}, ${studentAccountCountry}`}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Profile: state.Profile,
  Account: state.Account,
  userInfo: state.Profile.userInfo,
  teacherAccountInfo: state.Profile.teacherAccountInfo,
  studentAccountInfo: state.Profile.studentAccountInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  userGetById: (payload: string) => dispatch({ type: 'Profile/userGetById', payload }),
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'Profile/teacherAccountGetById', payload: teacherAccountId }),
  studentAccountGetById: (studentAccountId: string) =>
    dispatch({ type: 'Profile/studentAccountGetById', payload: studentAccountId }),
  uploadAvatar: (payload: object) => dispatch({ type: 'Profile/userUploadAvatar', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
