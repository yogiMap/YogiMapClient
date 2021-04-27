import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { ITeacherType } from '@/pages/teacherType/types';
import ActionMenu from '@/pages/teacherType/dashboard/search/ActionMenu';
import ProfileHoverCard from '@/pages/utils/hoverCard/ProfileHoverCard';

interface IProps extends RouteComponentProps {
  items: ITeacherType[];
}

const TeacherTypeSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<ITeacherType>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/teacherType/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'Teacher',
      key: 'teacher',
      render: (row) => <Link to={`/teacherType/${row._id}`}>{row.teacher}</Link>,
    },
    {
      title: 'owner',
      key: 'owner',
      render: (row) => {
        return <ProfileHoverCard id={get(row, 'owner._id')} name={get(row, 'owner.name')} />;
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherTypeSearchList));
