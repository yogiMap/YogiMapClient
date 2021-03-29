import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get, isEmpty } from 'lodash';
import { Col, Row } from 'antd';
import UserRoles from '@/pages/user/profile/UserRoles';

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
                Styles of Yoga and Lineages
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
            <div className="profile-main">
              Picture
              <button className="button-primary float-end">Save</button>
            </div>

            <div className="profile-main">
              Styles of Yoga and Lineages
              <button className="button-primary float-end">Save</button>
            </div>

            <div className="profile-main">
              Description
              <button className="button-primary float-end">Save</button>
            </div>

            <div className="profile-main">
              Location
              <button className="button-primary float-end">Save</button>
            </div>

            <div className="profile-main">
              Contacts
              <button className="button-primary float-end">Save</button>
            </div>

            <div className="profile-main">
              YouTube
              <button className="button-primary float-end">Save</button>
            </div>

            <div className="profile-main">
              Instagram
              <button className="button-primary float-end">Save</button>
            </div>

            <div className="profile-main">
              Facebook
              <button className="button-primary float-end">Save</button>
            </div>

            <div className="profile-main">
              Reset Password
              <button className="button-primary float-end">Save</button>
            </div>

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
