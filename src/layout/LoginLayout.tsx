import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import Sidepanel from '@/pages/utils/sidepanel/Sidepanel';

interface IProps {
  children: any;
  auth: () => void;
  User: any;
}

const LoginLayout = ({ children, auth }: IProps) => {
  useEffect(() => {
    auth();
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
  User: state.User,
});

const mapDispatchToProps = (dispatch: any) => ({
  auth: () => dispatch({ type: 'User/auth' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginLayout);
