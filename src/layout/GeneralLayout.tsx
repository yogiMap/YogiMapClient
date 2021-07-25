import React from 'react';
import Sidepanel from '@/pages/utils/sidepanel/Sidepanel';
import Footer from '@/layout/Footer';
import Navbar from '@/layout/Navbar';
import SipPhoneWidget from '@/pages/sipPhone/widget/SipPhoneWidget';

interface IProps {
  children: any;
  location: {
    pathname: string;
  };
}

const isFooterVisible = (location: string) => {
  const allowedPaths = [
    '/',
    '/teacherAccount',
    '/classes',
    '/event',
    '/classType',
    '/style',
    '/list/focus',
    '/library',
    '/styles',
    '/type',
    '/faq',
    '/contact',
  ];
  return allowedPaths.includes(location);
};

const isNavbarHidden = () => {
  const deniedPaths = ['/user/login', '/user/register', '/user/password/reset/request', 'user/verify/email'];
  return deniedPaths.some((el) => location.pathname.startsWith(el));
};

export default (props: IProps) => {
  return (
    <div>
      {!isNavbarHidden() && <Navbar />}

      <div>{props.children}</div>

      <Sidepanel />
      <SipPhoneWidget />

      {isFooterVisible(props.location.pathname) && <Footer />}
    </div>
  );
};
