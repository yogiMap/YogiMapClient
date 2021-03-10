import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IVendor } from '@/pages/vendor/types';
import ActionMenu from '@/pages/vendor/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IVendor[];
}

const VendorSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IVendor>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/vendor/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'Vendor Type',
      key: 'vendorType',
      render: (row) => <Link to={`/vendorType/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'YogaStyle',
      dataIndex: 'yogaStyle',
      key: 'yogaStyle',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VendorSearchList));
