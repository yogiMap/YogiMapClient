import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  teacherAccountId: string;
  studentId: string;
  name: string;
  teacherAccountGetById: (teacherAccountId: string) => void;
  studentGetById: (teacherAccountId: string) => void;
  Account: IUserAccount;
}

const UserProfile = (props: any) => {
  const teacherAccountId: string = get(props, 'Account.teacherAccount', '');
  const studentId: string = get(props, 'Account.student', '');
  const userId = get(props, 'match.params.userId', '');

  const userInfo = get(props, 'userInfo', '');
  const userName = get(userInfo, 'name', '');
  const email = get(userInfo, 'email', '');
  const roles = get(userInfo, 'roles', []);

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

  //student account info
  const studentInfo = get(props, 'studentInfo', '');
  const firstName = get(studentInfo, 'firstName', '');
  const lastName = get(studentInfo, 'lastName', '');
  const studentPhone = get(studentInfo, 'phoneNumber.number', '');
  const studentFocus = get(studentInfo, 'focus', '');
  const studentClassType = get(studentInfo, 'classType', '');
  const studentClasses = get(studentInfo, 'classes', '');
  const studentEvent = get(studentInfo, 'event', '');
  const studentDescription = get(studentInfo, 'description', '');
  const studentAddressLine1 = get(studentInfo, 'addressLine1', '');
  const studentAddressLine2 = get(studentInfo, 'addressLine2', '');
  const studentCity = get(studentInfo, 'city', '');
  const studentCountry = get(studentInfo, 'country', '');
  const studentState = get(studentInfo, 'state', '');
  const studentTimeZone = get(studentInfo, 'timeZone', '');
  const studentZipCode = get(studentInfo, 'zipCode', '');

  useEffect(() => {
    props.userGetById(userId);
    props.teacherAccountGetById(teacherAccountId);
    props.studentGetById(studentId);
  }, []);

  return (
    <div>
      <div className="profile-header">
        <h1 className="text-center">Profile Page</h1>
        <h3 className="text-end text-colored-second my-3">{userName}</h3>
        <p className="text-end text-colored-third">Email: {email}</p>
        <p className="text-end">
          User's roles:{' '}
          {roles.map((el: string) => (
            <span className="ms-2 text-colored-first">{el}</span>
          ))}
        </p>
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

        {studentId && (
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
              <div className="col-md-4 text-colored-first">{studentPhone}</div>
            </div>

            <div className="row my-3 border-bottom">
              <div className="col-md-4 text-colored-third">About</div>
              <div className="col-md-4 text-colored-first">{studentDescription}</div>
            </div>

            <div className="row my-3 border-bottom">
              <div className="col-md-4 text-colored-third">Yoga focus</div>
              <div className="col-md-4 text-colored-first">{studentFocus}</div>
            </div>

            <div className="row my-3 border-bottom text-colored-second">
              <div className="col-md-4 text-colored-third">TimeZone</div>
              <div className="col-md-4 text-colored-first">{studentTimeZone}</div>
            </div>

            <div className="row my-3 border-bottom">
              <div className="col-md-4 text-colored-third">Preferred classType</div>
              <div className="col-md-4 text-colored-first">{studentClassType}</div>
            </div>

            <div className="row my-3 border-bottom">
              <div className="col-md-4 text-colored-third">Classes</div>
              <div className="col-md-4 text-colored-first">{studentClasses}</div>
            </div>

            <div className="row my-3 border-bottom text-colored-second">
              <div className="col-md-4 text-colored-third">Events:</div>
              <div className="col-md-4 text-colored-first">{studentEvent}</div>
            </div>
            <p>
              Student's Address:
              <span className="ms-3 text-colored-first">{`${studentAddressLine1} ${studentAddressLine2} ${studentCity}, ${studentState}, ${studentZipCode}, ${studentCountry}`}</span>
            </p>
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
  studentInfo: state.Profile.studentInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  userGetById: (payload: string) => dispatch({ type: 'Profile/userGetById', payload }),
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'Profile/teacherAccountGetById', payload: teacherAccountId }),
  studentGetById: (studentId: string) => dispatch({ type: 'Profile/studentGetById', payload: studentId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
