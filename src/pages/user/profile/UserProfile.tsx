import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get, isEmpty } from 'lodash';
import { Col, Row } from 'antd';
import UserRoles from '@/pages/user/profile/UserRoles';
import TeacherImageUpload from '@/pages/user/profile/profileList/teacherImageUpload/TeacherImageUpload';
import TeacherYogaStyle from '@/pages/user/profile/profileList/TeacherYogaStyle';
import TeacherDescription from './profileList/TeacherDescription';
import TeacherLocation from '@/pages/user/profile/profileList/TeacherLocation';
import TeacherContact from '@/pages/user/profile/profileList/TeacherContact';
import TeacherYouTube from '@/pages/user/profile/profileList/TeacherYouTube';
import TeacherInstagram from '@/pages/user/profile/profileList/TeacherInstagram';
import TeacherFacebook from '@/pages/user/profile/profileList/TeacherFacebook';
import TeacherResetPassword from '@/pages/user/profile/profileList/TeacherResetPassword';

const UserProfile = (props: any) => {
  const userId = get(props, 'match.params.userId', '');

  const userInfo = get(props, 'userInfo.payload', '');
  const userName = get(userInfo, 'firstName', '');
  const name = get(userInfo, 'name', '');
  const roles = get(userInfo, 'roles', []);
  const about = get(userInfo, 'about', '');
  const email = get(userInfo, 'email', '');

  useEffect(() => {
    props.userGetById(userId);
  }, []);

  // @ts-ignore
  return (
    <div className="profile-bg">
      <h1>Profile {userName}</h1>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-9">
            <p className="profile-greetings text-center">
              Welcome {userName}! Yogimap empowers yoga teachers to manage & grow their business - let`s get you set up:
            </p>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-lg-3">
            <div className="profile-side-panel">
              <h5> {name} </h5>
              <h6> Teacher of your </h6>
              <h6> Edit Profile </h6>
              <hr />
              <p>
                Picture <br />
                Styles of Yoga
                <br />
                Description
                <br />
                Location
                <br />
                Contacts
                <br />
                YouTube
                <br />
                Instagram
                <br />
                Facebook
                <br />
                Reset Password
                <br />
              </p>
            </div>
          </div>

          <div className="col-lg-6">
              <TeacherImageUpload/>
              <TeacherYogaStyle/>
              <TeacherDescription/>
              <TeacherLocation/>
              <TeacherContact/>
              <TeacherYouTube/>
              <TeacherInstagram/>
              <TeacherFacebook/>
              <TeacherResetPassword/>

          </div>
        </div>
      </div>

      {/*<Row>{!isEmpty(roles) ? <UserRoles roles={roles} /> : null}</Row>*/}

      {/*<Row>*/}
      {/*  {about ? (*/}
      {/*    <Col span={12}>*/}
      {/*      <h3>About</h3>*/}
      {/*      <div>{about}</div>*/}
      {/*    </Col>*/}
      {/*  ) : null}*/}
      {/*</Row>*/}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userInfo: state.Profile.userInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  userGetById: (payload: any) => dispatch({ type: 'Profile/userGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
