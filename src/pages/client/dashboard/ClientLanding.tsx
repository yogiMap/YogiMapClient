import React from 'react';
import ClientDashboardControls from '@/pages/client/dashboard/controls/ClientDashboardControls';

const ClientLanding = () => {
  return (
    <div className="container">
      <h1 className="text-center my-5">Client</h1>

      <p className="text-colored-first my-5">Here you can create and manage a database of all your clients.</p>

      <div className="row my-3">
        <div className="col d-flex justify-content-end">
          <ClientDashboardControls />
        </div>
      </div>
    </div>
  );
};

export default ClientLanding;
