import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import ActionMenu from '@/pages/teacher/dashboard/search/ActionMenu';
import { IEvent } from '@/pages/event/types';
import EventDashboardControls from '@/pages/event/dashboard/controls/EventDashboardControls';
import { formatterDateFull, formatterTimeFull } from '@/utils/dateTime';

interface IProps extends RouteComponentProps {
  event: IEvent[];
}

const TeacherAccountViewEventList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const event = get(props, 'event', []);

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

export default withRouter(TeacherAccountViewEventList);
