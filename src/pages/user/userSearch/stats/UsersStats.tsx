import React from 'react';
import { get } from 'lodash';
import { IUsersStats } from '@/pages/user/userSearch/types';

interface IProps {
  usersStats: IUsersStats;
}

const UsersStats = (props: IProps) => {
  const usersStats = get(props, 'usersStats', {});
  const total = get(usersStats, 'total', 0);
  const teachers = get(usersStats, 'teachers', 0);
  const students = get(usersStats, 'students', 0);
  const registeredLast10Days = get(usersStats, 'registeredLast10Days', 0);

  return (
    <div className="row my-5">
      <div className="col-md-2">
        <h5 className="text-colored-first">Total</h5>
        <div className="text-colored-second">{total}</div>
      </div>

      <div className="col-md-3">
        <h5 className="text-colored-first">Last 10 days</h5>
        <div className="text-colored-second">{registeredLast10Days}</div>
      </div>

      <div className="col-md-3">
        <h5 className="text-colored-first">Teachers</h5>
        <div className="text-colored-second">{teachers}</div>
      </div>

      <div className="col-md-3">
        <h5 className="text-colored-first">Students</h5>
        <div className="text-colored-second">{students}</div>
      </div>
    </div>
  );
};

export default UsersStats;
