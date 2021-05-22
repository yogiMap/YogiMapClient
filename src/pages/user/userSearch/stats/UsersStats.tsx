import React from 'react';
import { get } from 'lodash';
import { IUsersStats } from '@/pages/user/userSearch/types';

interface IProps {
  usersStats: IUsersStats;
}

const UsersStats = (props: IProps) => {
  const usersStats = get(props, 'usersStats', {});
  const total = get(usersStats, 'total', 0);
  const registeredLast10Days = get(usersStats, 'registeredLast10Days', 0);

  return (
    <div className="row mb-3">
      <div className="col-md-2">
        <strong>Total</strong>
        <div>{total}</div>
      </div>

      <div className="col-md-2">
        <strong>Last 10 days</strong>
        <div>{registeredLast10Days}</div>
      </div>
    </div>
  );
};

export default UsersStats;
