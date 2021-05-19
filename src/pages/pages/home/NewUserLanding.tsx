import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
}

const NewUserLanding = (props: IProps) => {
  const name = get(props, 'Account.name', '');
  // const userId = get(props, 'match.params.userId');
  // const hash = get(props, 'match.params.hash');

  return (
    <div className="m-5">
      <h1 className="text-center">Hi {name}!</h1>
      <h3 className="my-5 text-center"> Welcome to the Our Yoga Space!</h3>

      <div className="row my-5">
        <div className="col-md-8 my-4">
          <p>If you are Yoga Teacher please press the button and create your own Teacher`s Account.</p>
        </div>

        <div className="col-md-4 my-4">
          <Link to="/wizard" className="button-link-primary">
            Create Teacher's Account
          </Link>
        </div>

        {/*  <div className="row my-5">*/}
        {/*    <div className="col-md-4 my-3">*/}
        {/*      <Link to="/wizardStudent" className="button-link-primary">*/}
        {/*        Confirm email*/}
        {/*      </Link>*/}
        {/*    </div>*/}

        {/*    <div className="col-md-8 my-3">*/}
        {/*      <p>*/}
        {/*        If you are a Yoga Student to gain access to our awesome learning content, please check your mail box and*/}
        {/*        confirm your email.*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default withRouter(connect(mapStateToProps)(NewUserLanding));
