import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get, isEmpty } from 'lodash';
import { Col, Row } from 'antd';
import UserRoles from '@/pages/user/profile/UserRoles';
import TeacherImageUpload from '@/pages/user/profile/profileList/teacherImageUpload/TeacherImageUpload';
import TeacherDescription from './profileList/TeacherDescription';
import TeacherLocation from '@/pages/user/profile/profileList/TeacherLocation';
import TeacherContact from '@/pages/user/profile/profileList/TeacherContact';
import TeacherYouTube from '@/pages/user/profile/profileList/TeacherYouTube';
import TeacherInstagram from '@/pages/user/profile/profileList/TeacherInstagram';
import TeacherFacebook from '@/pages/user/profile/profileList/TeacherFacebook';
import TeacherResetPassword from '@/pages/user/profile/profileList/TeacherResetPassword';
import TeacherYogaStyle from '@/pages/user/profile/profileList/teacherYogaStyle/TeacherYogaStyle';
import UserProfileSidePanel from '@/pages/user/profile/UserProfileSidePanel';

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

  return (
    <div className="profile-bg">
      <h5>Profile {userName}</h5>

      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-9">
            <p className="profile-greetings text-center">
              Welcome {userName}! YogiMap empowers yoga teachers to manage & grow their business - let`s get you set up:
            </p>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-lg-3">
            <UserProfileSidePanel />
          </div>

          <div className="col-lg-6">
            <TeacherYogaStyle />
            <TeacherDescription />
            <TeacherLocation />
            <TeacherContact />
            <TeacherResetPassword />
            <TeacherImageUpload />
            <TeacherYouTube />
            <TeacherInstagram />
            <TeacherFacebook />
          </div>
        </div>
      </div>
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
