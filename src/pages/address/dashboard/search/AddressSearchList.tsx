import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import { IAddress } from '@/pages/address/types';
import ActionMenu from '@/pages/address/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IAddress[];
}

const AddressSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IAddress>[] = [
    {
      title: 'Code',
      key: 'code',
      render: (row) => <Link to={`/address/${row._id}`}>{row.code}</Link>,
    },
    {
      title: 'Address',
      key: 'address',
      render: (row) => <Link to={`/address/${row._id}`}>{`${row.addressLine1} ${row.addressLine2}`}</Link>,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Zip',
      dataIndex: 'zipCode',
      key: 'zipCode',
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

export default withRouter(AddressSearchList);
