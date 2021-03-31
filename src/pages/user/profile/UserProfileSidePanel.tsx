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

      <h5> {name} </h5>
      <h6 > Teacher of your </h6 >
      <hr />
      <p className="profile-name"> Edit Profile </p>
      <hr />

      <div>
        <a href={'profile/image/upload'}>Picture</a>
        <a href={''}>Yoga Style</a>
        <a href={''}>Description</a>
        <a href={''}>Location</a>
        <a href={''}>Contacts</a>
        <a href={''}>YouTube</a>
        <a href={''}>Instagram</a>
        <a href={''}>Facebook</a>
        <a href={''}>Reset Password</a>
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
