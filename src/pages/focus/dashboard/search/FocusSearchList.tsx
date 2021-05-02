import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IFocus } from '@/pages/focus/types';
import ActionMenu from '@/pages/focus/dashboard/search/ActionMenu';
import ProfileHoverCard from '@/pages/utils/hoverCard/ProfileHoverCard';

interface IProps extends RouteComponentProps {
  items: IFocus[];
}

const FocusSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IFocus>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/focus/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'Teacher',
      key: 'teacher',
      render: (row) => <Link to={`/focus/${row._id}`}>{row.teacher}</Link>,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FocusSearchList));
