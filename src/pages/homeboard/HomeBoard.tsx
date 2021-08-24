import React from 'react';
import OnboardingTasks from '@/pages/homeboard/OnboardingTasks';

const HomeBoard = () => {
  return (
    <div className="row">
      <div className="col-md-4">
        <OnboardingTasks />
      </div>

      <div className="col-md-8">
        <h4>Reports</h4>
      </div>
    </div>
  );
};

export default HomeBoard;
