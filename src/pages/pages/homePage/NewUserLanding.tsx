import React from 'react';
import emailIcon from '@/icons/email.svg';

export default function NewUserLanding() {
  return (
    <div className="m-5">
      <h1>Welcome to the coolest coding school. We are excited you are here!</h1>
      <div className="row align-items-center">
        <h3 className="mt-5 col-md-6">To gain access to our awesome learning content, please confirm your email.</h3>
        <img className="mt-5 col-md-6" src={emailIcon} alt="email" />
      </div>
    </div>
  );
}
