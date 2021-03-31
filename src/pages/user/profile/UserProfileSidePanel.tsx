import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';

import { Avatar, Image } from 'antd';
import lotus from '@/pages/user/profile/profileList/teacherImageUpload/images/lotus_yellow.png';

const UserProfileSidePanel = (props: any) => {
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
    <div className="profile-side-panel">

      <div className="profile-avatar-bg d-flex justify-content-center">
      <Avatar size="small" src={<Image src={lotus}/>} />
      </div>

      <h5 className="text-center mt-4"> {name} </h5>
      <p className="profile-name text-center"> Teacher of your </p >
      <hr />
      <p className="profile-name"> Edit Profile </p>
      <hr />

      <div>
        <a href={'/teacherImageUpload'}>Picture</a>
        <a href={'/teacherYogaStyle'}>Yoga Style</a>
        <a href={'/teacherDescription'}>Description</a>
        <a href={'/teacherLocation'}>Location</a>
        <a href={'/teacherContact'}>Contacts</a>
        <a href={'/teacherYouTube'}>YouTube</a>
        <a href={'/teacherInstagram'}>Instagram</a>
        <a href={'/teacherFacebook'}>Facebook</a>
        <a href={'/teacherResetPassword'}>Reset Password</a>
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


export default connect(mapStateToProps, mapDispatchToProps)(UserProfileSidePanel);
