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
              <div className="col-md-3">
                <h2 className="m-2">education</h2>
              </div>
              <div className="col-md-3">
                <h2 className="m-2">information</h2>
              </div>
              <div className="col-md-3">
                <h2 className="m-2">community</h2>
              </div>
            </div>
          </div>

          {!isUserAuth && (
            <div className="mt-3 mb-3 text-center">
              <a href="/user/register" className="button-home">
                <h3>I‘M A TEACHER</h3>
              </a>
              <a href="/user/register" className="btn btn-outline-primary fs-3 fw-bold text-white px-5 m-2">
                <h3>I’M A STUDENT</h3>
              </a>
            </div>
          )}
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
