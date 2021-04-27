import React, { useEffect } from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import { formatterDateFull, formatterDateTimeFull } from '@/utils/dateTime';

import { IClasses } from '@/pages/classes/types';
import ActionMenu from '@/pages/classes/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IClasses[];
}

const ClassesSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IClasses>[] = [
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
      render: (row) => <Link to={`/classes/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'YogaStyle',
      key: 'yogaStyle',
      dataIndex: 'yogaStyle',
    },
    {
      title: 'ClassesType',
      key: 'classesType',
      dataIndex: 'classesType',
    },
    {
      title: 'Teacher',
      key: 'teacher',
      render: (row) => <Link to={`/teacher/${row.teacher._id}`}>{row.name}</Link>,
      // render: (row) => {
      //   return <Link to={`/teacher/${get(row, 'teacher._id')}`}>{get(row, 'teacher.name')}</Link>;
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
      width: 100,
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
