import React, { useEffect, useRef } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { Avatar, Button, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IUser } from '@/pages/user/userSearch/types';

interface IProps {
  studentAccountId: string;
  studentAccountGetById: (studentAccountId: string) => void;
  User: IUser;
  userInfo: IUser;
}

const UserProfileStudent = (props: IProps) => {
  const studentAccountId: string = get(props, 'Account.studentAccount', '');
  const userInfo = get(props, 'userInfo', '');
  const userName = get(userInfo, 'name', '');
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
    props.studentAccountGetById(studentAccountId);
  }, [studentAccountId]);

  if (!studentAccountId) return null;
  return (
    <>
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
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userInfo: state.Profile.userInfo,
  User: state.User,
  studentAccountInfo: state.Profile.studentAccountInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  studentAccountGetById: (studentAccountId: string) =>
    dispatch({ type: 'Profile/studentAccountGetById', payload: studentAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileStudent);
