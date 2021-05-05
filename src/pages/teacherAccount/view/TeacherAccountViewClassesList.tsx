import React from 'react';
import { get } from 'lodash';
import { Button, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import ActionMenu from '@/pages/teacher/dashboard/search/ActionMenu';
import { IClasses } from '@/pages/classes/types';
import ClassesDashboardControls from '@/pages/classes/dashboard/controls/ClassesDashboardControls';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps extends RouteComponentProps {
  classes: IClasses[];
  // open: (arg: ISidepanel) => void;
  // Account: IUserAccount;
}

const TeacherAccountViewClassesList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const classes: any  = get(props, 'classes', []);
  const isUserAuth = get(props, 'Account._id');

  const columns: ColumnProps<IClasses>[] = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      // render: (row) => {
      //   return <Link to={`/classes/${get(row, 'classes._id')}`}>{get(row, 'classes.name')}</Link>;
      // },
      // render: (row) => <Link to={`/classes/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'YogaStyle',
      key: 'yogaStyle',
      dataIndex: 'yogaStyle',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      className: 'actions',
      width: 80,
      render: (row) => <ActionMenu row={row} queryParams={queryParams} />,
    },
  ];

  return (
    <div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={classes}
        size="middle"
        className="table-middle"
        pagination={false}
      />
      {/*{isUserAuth && (*/}
      <div className="d-flex justify-content-end my-5">
        <ClassesDashboardControls />
      </div>
      {/*)}*/}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  // Account: state.Account,
  // sidepanel: state.Sidepanel,
});

const mapDispatchToProps = (dispatch: any) => ({
  // open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),

});

export default withRouter(TeacherAccountViewClassesList);
