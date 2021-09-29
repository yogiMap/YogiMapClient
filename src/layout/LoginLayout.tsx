import React from 'react';

interface IProps {
  children: any;
}

const LoginLayout = ({ children }: IProps) => {
  return (
    <>
      <div className="container">
        <span className="site-name">Yogi Map</span>

        <div className="row d-flex justify-content-center">
          <div className="col-md-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default LoginLayout;
