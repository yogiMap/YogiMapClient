import React, { useEffect } from 'react';
import { get } from 'lodash';
import { Button, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import { IStudentAccount, IStudentAccountQueryParams } from '@/pages/studentAccount/types';

interface IStudentAccountDeleteById {
  studentAccountId: string;
  queryParams: IStudentAccountQueryParams;
}

interface IProps extends RouteComponentProps {
  items: IStudentAccount[];
  open: (arg: ISidepanel) => void;
  studentAccountDeleteById: (arg: IStudentAccountDeleteById) => void;
}

const StudentAccountSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IStudentAccount>[] = [
    {
      title: 'Name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend'],
    },

    {
      title: 'Yoga Focus',
      key: 'focus',
      dataIndex: 'focus',
    },

    {
      title: 'Country',
      key: 'country',
      dataIndex: 'country',
    },

    {
      title: 'City',
      key: 'city',
      dataIndex: 'city',
    },

    // {
    //   title: 'Owner',
    //   key: 'owner',
    //   render: (row) => {
    //     return <ProfileHoverCard id={get(row, 'owner._id')} name={get(row, 'owner.name')} />;
    //     // <Link to={`/profile/${get(row, 'owner._id')}`}>{get(row, 'owner.name')}</Link>;
    //   },
    // },

    // {
    //   title: 'Action',
    //   key: 'action',
    //   className: 'actions',
    //   width: 80,
    //   render: (row) => <ActionMenu row={row} queryParams={queryParams} />,
    // },
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={items}
      size="middle"
      className="table-middle"
      pagination={false}
    />
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  studentAccountDeleteById: (payload: IStudentAccountDeleteById) =>
    dispatch({ type: 'StudentAccountDashboard/studentAccountDeleteById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentAccountSearchList));
