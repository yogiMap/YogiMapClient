import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { IUser } from '@/pages/user/userSearch/types';

interface IProps {
  teacherAccountId: string;
  teacherAccountGetById: (teacherAccountId: string) => void;
  Account: IUserAccount;
  userInfo: IUser;
}

const UserProfileTeacher = (props: IProps) => {
  const teacherAccountId: string = get(props, 'Account.teacherAccount', '');
  //const userId = get(props, 'match.params.userId', '');
  const userInfo = get(props, 'userInfo', '');
  const userName = get(userInfo, 'name', '');
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

  useEffect(() => {
    props.teacherAccountGetById(teacherAccountId);
  }, []);

  if (!teacherAccountId) return null;
  return (
    <>
      {teacherAccountId && (
        <div className=" bd-highlight">
          <div>
            Teacher`s name: <Link to={`/teacherAccount/${teacherAccountId}`}> {teacherName}</Link>
          </div>
        </div>
      )}

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
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  // Profile: state.Profile,
  Account: state.Account,
  // userInfo: state.Profile.userInfo,
  teacherAccountInfo: state.Profile.teacherAccountInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'Profile/teacherAccountGetById', payload: teacherAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileTeacher);
