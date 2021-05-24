import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { IEvent } from '@/pages/event/types';
import ActionMenu from '@/pages/event/dashboard/search/ActionMenu';
import { formatterDateFull, formatterTimeFull } from '@/utils/dateTime';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  items: IEvent[];
}

const EventSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);
  console.log(items);

  const columns: ColumnProps<IEvent>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/event/${row._id}`}>{row.name}</Link>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend'],
    },
    {
      title: 'Date',
      key: 'eventDate',
      render: (row) => {
        return formatterDateFull(row.date);
      },
    },
    {
      title: 'Time',
      key: 'eventDate',
      render: (row) => {
        return formatterTimeFull(row.date);
      },
    },
    {
      title: 'Teacher',
      key: 'teacherAccount',
      render: (row) => {
        return <Link to={`/teacherAccount/${get(row, 'teacherAccount._id')}`}>{get(row, 'teacherAccount.name')}</Link>;
      },
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
