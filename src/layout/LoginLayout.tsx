import React from 'react';
import { Link } from 'umi';
import Sidepanel from '@/pages/utils/sidepanel/Sidepanel';

interface IProps {
  children: any;
}

export default ({ children }: IProps) => {
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
