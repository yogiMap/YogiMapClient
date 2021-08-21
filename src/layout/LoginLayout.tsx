import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import Sidepanel from '@/pages/utils/sidepanel/Sidepanel';

interface IProps {
  children: any;
  firstAuth: () => void;
  Account: any;
}

const LoginLayout = ({ children, firstAuth }: IProps) => {
  useEffect(() => {
    firstAuth();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <Link to="/" className="site-name">
            YogiMap
          </Link>
        </div>

        <div className="row d-flex justify-content-center mt-3 ">
          <div className="col-lg-6">{children}</div>
        </div>
      </div>

      <Sidepanel />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  firstAuth: () => dispatch({ type: 'Account/firstAuth' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginLayout);
