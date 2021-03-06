import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { ITeacher } from '@/pages/teacher/types';
import ActionMenu from '@/pages/teacher/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  teacherId: string;
  items: ITeacher[];
}

const TeacherSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<ITeacher>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/teacher/${row._id}`}>{row.name}</Link>,
    },
    // {
    //   title: 'TeacherType',
    //   dataIndex: 'classType',
    //   key: 'classType',
    // },
    // {
    //   title: 'YogaStyle',
    //   dataIndex: 'style',
    //   key: 'style',
    //   render: (row) => <Link to={`/teacher/${row._id}`}>{row.name}</Link>,
    // },

    {
      title: 'Class Type',
      key: 'classType',
      render: (row) => {
        return <Link to={`/classType/${get(row, 'classType._id')}`}>{get(row, 'classType.name')}</Link>;
      },
    //   render: (row) => <Link to={`/classType/${row._id}`}>{row.name}</Link>,
    },

    {
      title: 'YogaStyle',
      key: 'style',
      render: (row) => {
        return <Link to={`/style/${get(row, 'style._id')}`}>{get(row, 'style.name')}</Link>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherSearchList));
