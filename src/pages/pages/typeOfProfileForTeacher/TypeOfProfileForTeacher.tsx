import React from 'react';
import { connect } from 'umi';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { get } from 'lodash';

interface IProps {
  Account: IUserAccount;
}

function TypeOfProfileForTeacher(props: IProps) {
  return (
    <>
      <div className="bg-profile">
        <h1>Choose the Type of Profile to Create</h1>

        <div className="row d-flex justify-content-center my-5">
          <div className="col-lg-3 d-flex justify-content-center my-lg-5">
            <a href="" className="home-button m-2">
              TEACHER
            </a>
          </div>

          <div className="col-lg-3 d-flex justify-content-center my-lg-5">
            <a href="" className="home-button m-2 ">
              STUDIO
            </a>
          </div>

          <div className="col-lg-3 d-flex justify-content-center my-lg-5">
            <a href="" className="home-button m-2 ">
              RETREAT
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default connect(mapStateToProps)(TypeOfProfileForTeacher);
