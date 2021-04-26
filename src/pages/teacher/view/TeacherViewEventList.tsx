import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import ActionMenu from '@/pages/teacher/dashboard/search/ActionMenu';
import { IClasses } from '@/pages/classes/types';

interface IProps extends RouteComponentProps {
  classes: IClasses[];
}

const TeacherViewClassesList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const classes = get(props, 'classes', []);

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
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={classes}
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
