import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import { IFocus, IFocusQueryParams } from '@/pages/focus/types';
import ProfileHoverCard from '@/pages/utils/hoverCard/ProfileHoverCard';

interface IProps extends RouteComponentProps {
  items: IFocus[];
  // teacherAccountId: string;
  // queryParams: IFocusQueryParams;
  focus: string;
}

const FocusSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);
  const focus = get(props, 'focus', '');

  const columns: ColumnProps<IFocus>[] = [
    {
      title: 'focus',
      dataIndex: 'focus',
      key: 'focus',
      // render: (row) => <Link to={`/focus/${row._id}`}>{row.name}</Link>,
      // <FocusSearchInput/>
    },
    {
      title: 'Teacher',
      key: 'teacher',
      render: (row) => <Link to={`/focus/${row._id}`}>{row.teacher}</Link>,
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

const mapStateToProps = (state: any) => ({});
//dispatch: any
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FocusSearchList));
