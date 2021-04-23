import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { ITeacher } from '@/pages/teacher/types';
import ActionMenu from '@/pages/teacher/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: ITeacher[];
}

const TeacherViewClassesList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<ITeacher>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/group/${row._id}`}>{row.name}</Link>,
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

export default withRouter(TeacherViewClassesList);
