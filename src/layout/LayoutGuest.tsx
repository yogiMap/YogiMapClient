import React from 'react';
import Navbar from '@/layout/Navbar';
import Footer from '@/layout/Footer';

interface IProps {
  children: any;
}

export default (props: IProps) => {
  return (
    <div>
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};
