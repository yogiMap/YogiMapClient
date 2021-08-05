import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { ISipPhone } from '@/pages/telephony/types';
import ActionMenu from '@/pages/teacherAccount/telephony/ActionMenu';
import PhoneNumberCall from '@/pages/telephony/PhoneNumberCall';

interface IProps extends RouteComponentProps {
  items: ISipPhone[];
}

const SipPhoneSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<ISipPhone>[] = [
    {
      title: 'Phone',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Call',
      key: 'phoneNumber',
      render: (row) => <PhoneNumberCall phoneNumber={get(row, 'phoneNumber', {})} />,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SipPhoneSearchList));
