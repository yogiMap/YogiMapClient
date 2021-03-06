import React, { useEffect } from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import { formatterDateFull, formatterTimeFull } from '@/utils/dateTime';

import { IClasses } from '@/pages/classes/types';
import ActionMenu from '@/pages/classes/dashboard/search/ActionMenu';
import moment from 'moment/moment';

interface IProps extends RouteComponentProps {
  items: IClasses[];
}

const ClassesSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IClasses>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/classes/${row._id}`}>{row.name}</Link>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend'],
    },

    {
      title: 'Date',
      key: 'date',
      render: (row) => {
        return formatterDateFull(row.date);
      },
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: 'Time',
      key: 'date',
      render: (row) => {
        return formatterTimeFull(row.date);
      },
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: 'Duration',
      key: 'duration',
      dataIndex: 'duration',
    },
    {
      title: 'Yoga Focus',
      key: 'focus',
      dataIndex: 'focus',
    },
    {
      title: 'Yoga Style',
      key: 'style',
      render: (row) => {
        return <Link to={`/style/${get(row, 'style._id')}`}>{get(row, 'style.name')}</Link>;
      },
    },
    {
      title: 'Class Type',
      key: 'classType',
      render: (row) => {
        return <Link to={`/classType/${get(row, 'classType._id')}`}>{get(row, 'classType.name')}</Link>;
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClassesSearchList));
