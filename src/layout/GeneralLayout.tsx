import React from 'react';
import Sidepanel from '@/pages/utils/sidepanel/Sidepanel';
import Footer from '@/layout/Footer';
import Navbar from '@/layout/Navbar';

interface IProps {
  children: any;
  location: {
    pathname: string;
  };
}

const isFooterVisible = (location: string) => {
  const allowedPaths = ['/'];
  return allowedPaths.includes(location);
};

export default (props: IProps) => {
  return (
    <div>
      <Navbar />

      <div>{props.children}</div>

      <Sidepanel />

      {isFooterVisible(props.location.pathname) && <Footer />}
    </div>
  );
};
