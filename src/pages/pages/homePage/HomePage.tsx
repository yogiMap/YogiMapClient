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
      <section id="product-overview">
        <div className="main-header">
          <h1>
            DISCOVER YOGA <br />
            THE JOURNEY STARTS HERE{' '}
          </h1>
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-md-4">
                <h2 className="m-3">education</h2>
              </div>
              <div className="col-md-4">
                <h2 className="m-3">information</h2>
              </div>
              <div className="col-md-4">
                <h2 className="m-3">community</h2>
              </div>
            </div>

            {!isUserAuth && (
              <div className="row d-flex justify-content-center mt-5">
                <div className="col-md-6 m-5">
                  <a href="/user/register" className="button-home">
                    I‘M A TEACHER
                  </a>
                </div>
                <div className="col-md-6 m-5">
                  <a href="/user/register" className="button-home">
                    I’M A STUDENT
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="product-description" className="container mt-5 mb-5 mx-auto">
        <div className="row">
          <div className="col-md-4 p-2"> </div>
          <div className="col-md-4 p-2"> </div>
          <div className="col-md-4 p-2"> </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default connect(mapStateToProps)(HomePage);
