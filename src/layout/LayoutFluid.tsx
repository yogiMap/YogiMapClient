import React from 'react';
import PhoneWidget from '@/pages/telephony/widget/PhoneWidget';
import Navbar from '@/layout/Navbar';

interface IProps {
  children: any;
}

export default (props: IProps) => {
  return (
    <div className="container-fluid">
      <Navbar />
      {props.children}
      <PhoneWidget />
    </div>
  );
};
