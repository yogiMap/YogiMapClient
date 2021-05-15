import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import UsersStats from '@/pages/user/userSearch/stats/UsersStats';
import UsersList from '@/pages/user/userSearch/search/UsersList';
import UsersPagination from '@/pages/user/userSearch/search/UsersPagination';
import UsersFilterForm from '@/pages/user/userSearch/search/UsersFilterForm';
import { IUsersSearchTerms, IUser, IUsersStats, IPagination, IUserGetStats } from '@/pages/user/userSearch/types';
import { get } from 'lodash';
import StatisticsList from '@/pages/utils/statistics/StatisticsList';
import UsersChart from '@/pages/user/userSearch/UsersChart';

const defaultSearchParams = { name: '', email: '', phone: '', group: '', role: '', limit: 10, page: 1 };

interface IProps {
  usersStats: IUsersStats;
  usersGetStats: (p: { loadId: string }) => void;
  usersList: IUser[];
  usersRolesList: string[];
  usersPagination: IPagination;
  usersSearch: (arg: IUsersSearchTerms) => void;
  usersGetRolesList: () => void;
  reset: () => void;
}

const UsersDashboard = (props: IProps) => {
  const { usersSearch, usersGetStats, usersGetRolesList, reset } = props;

  const usersStats = get(props, 'UsersDashboard.usersStats', {});
  const usersList = get(props, 'UsersDashboard.usersList', []);
  const usersRolesList = get(props, 'UsersDashboard.usersRolesList', []);
  const usersPagination = get(props, 'UsersDashboard.usersPagination', {});

  const [searchForm, setSearchForm] = useState(defaultSearchParams);

  const search = (params: IUsersSearchTerms) => {
    usersSearch(params);
  };

  useEffect(() => {
    search(defaultSearchParams);
    usersGetStats({ loadId: loadId.stats });
    usersGetRolesList();

    return () => {
      reset();
    };
  }, []);

  const onFiltersChange = (values: IUsersSearchTerms) => {
    setSearchForm(values);
    search(values);
  };

  const loadId = { stats: 'userList' };

  const onPageChange = (page: number) => {
    search({
      ...searchForm,
      page,
    });
  };

  return (
    <div className="container">
      <h1>Users</h1>
      <UsersChart />
      <StatisticsList items={usersStats} />
      <UsersFilterForm filters={searchForm} onChange={onFiltersChange} selectOptions={{ usersRolesList }} />
      <UsersList items={usersList} />
      {usersPagination.itemsCount > usersPagination.limit && (
        <UsersPagination pagination={usersPagination} onChange={onPageChange} />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  UsersDashboard: state.UsersDashboard,
  usersStats: state.UsersDashboard.usersStats,
  usersList: state.UsersDashboard.usersList,
  usersRolesList: state.UsersDashboard.usersRolesList,
  usersPagination: state.UsersDashboard.usersPagination,
});

const mapDispatchToProps = (dispatch: any) => ({
  usersSearch: (payload: IUsersSearchTerms) => dispatch({ type: 'UsersDashboard/usersSearch', payload }),
  usersGetStats: (payload: IUserGetStats) => dispatch({ type: 'UsersDashboard/usersGetStats', payload }),
  usersGetRolesList: () => dispatch({ type: 'UsersDashboard/usersGetRolesList' }),
  reset: () => dispatch({ type: 'UsersDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersDashboard);
