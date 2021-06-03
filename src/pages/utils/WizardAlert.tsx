import React from 'react';
import { Link } from 'umi';

const WizardAlert = () => {
  return (
    <div className="container-fluid">
      <div className="alert alert-warning text-center" role="alert">
        Please complete the{' '}
        <Link to={'/welcome'} className="primary-link">
          checklist
        </Link>{' '}
        to get full access
      </div>
    </div>
  );
};

export default WizardAlert;
