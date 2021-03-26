import React from 'react';
import { Link } from 'umi';
import { Col, Row } from 'antd';

interface IProps {
  children: any;
}

export default ({ children }: IProps) => {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <Link to="/vendor" className="site-name">
          YogiMap
        </Link>
      </div>

      <div className="row d-flex justify-content-center mt-3 ">
        <div className="col-lg-6">
          {children}
        </div>
      </div>
    </div>
  );
};
