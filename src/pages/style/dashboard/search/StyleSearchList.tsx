import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IStyle } from '@/pages/style/types';
import ActionMenu from '@/pages/style/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IStyle[];
}

const StyleSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IStyle>[] = [
    {
      title: 'Name',
      key: 'name',
      width: 250,
      render: (row) => <Link to={`/style/${row._id}`}>{row.name}</Link>,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StyleSearchList));
