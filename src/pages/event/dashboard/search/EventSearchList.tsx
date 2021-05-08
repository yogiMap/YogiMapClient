import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { IEvent } from '@/pages/event/types';
import ActionMenu from '@/pages/event/dashboard/search/ActionMenu';
import { formatterDateFull } from '@/utils/dateTime';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  items: IEvent[];
}

const EventSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IEvent>[] = [
    {
      title: '#',
      key: 'code',
      render: (row) => <Link to={`/classes/${row._id}`}>{row.code}</Link>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (row) => {
        return formatterDateFull(row.date);
      },
    },
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/event/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'Teacher',
      dataIndex: 'teacherAccount',
      key: 'teacherAccount',
      // render: (row) => <Link to={`/teacherAccount/${row.teacherAccountId}`}>{row.name}</Link>,
      // render: (row) => {
      //   return <Link to={`/teacher/${get(row, 'teacherAccount._id')}`}>{get(row, 'teacherAccount.name')}</Link>;
      // },
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

// state: any
const mapStateToProps = () => ({});

//dispatch: any
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventSearchList));
