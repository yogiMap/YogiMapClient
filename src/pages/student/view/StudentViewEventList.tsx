import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import ActionMenu from '@/pages/teacher/dashboard/search/ActionMenu';
import { IEvent } from '@/pages/event/types';
import EventDashboardControls from '@/pages/event/dashboard/controls/EventDashboardControls';

interface IProps extends RouteComponentProps {
  event: IEvent[];
}

const StudentViewEventList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const event = get(props, 'event', []);

  const columns: ColumnProps<IEvent>[] = [
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
        dataSource={event}
        size="middle"
        className="table-middle"
        pagination={false}
      />
      {/*{isUserAuth && (*/}
      <div className="d-flex justify-content-end my-5">
        <EventDashboardControls />
      </div>
      {/*)}*/}
    </div>
  );
};

// state: any
const mapStateToProps = () => ({});

//dispatch: any
const mapDispatchToProps = () => ({});

export default withRouter(StudentViewEventList);
