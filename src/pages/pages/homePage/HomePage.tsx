import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
}

function HomePage(props: IProps) {
  const isUserAuth = get(props, 'Account._id');

  return (
    <>
      <div className="home-bg">
        <h1 className="pt-5">DISCOVER YOGA</h1>
        <h1 className="my-3">THE JOURNEY STARTS HERE</h1>

        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-3">
              <h2 className="m-2">education</h2>
            </div>

            <div className="col-lg-3">
              <h2 className="m-2">information</h2>
            </div>

            <div className="col-lg-3">
              <h2 className="m-2">community</h2>
            </div>
          </div>

          {!isUserAuth && (
            <div className="row d-flex justify-content-center">
              <div className="col-lg-4 my-lg-4 my-2 d-flex justify-content-lg-start justify-content-center">
                <a href="/user/register/teacher" className="home-button m-2">
                  I‘M A TEACHER
                </a>
              </div>

              <div className="col-lg-4 my-lg-4 d-flex justify-content-lg-end justify-content-center">
                <a href="/user/register" className="home-button m-2">
                  I’M A STUDENT
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="home-description">

        <h4 className="pt-5 pb-3 px-5">directory for independent yoga teacher`s</h4>

        <div className="container mb-5 mx-auto">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-3 d-flex justify-content-center">
              <a href="" className="home-button m-2">
                MIND
              </a>
            </div>

            <div className="col-lg-3 d-flex justify-content-center">
              <a href="" className="home-button m-2">
                BODY
              </a>
            </div>

            <div className="col-lg-3 d-flex justify-content-center">
              <a href="" className="home-button m-2 ">
                SOUL
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default connect(mapStateToProps)(HomePage);
