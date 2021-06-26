import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IClient } from '@/pages/client/types';
import ActionMenu from '@/pages/client/dashboard/search/ActionMenu';
import RenderPhoneNumber from '@/pages/utils/phone/phoneNumberRendering/PhoneNumbersRendering';

interface IProps extends RouteComponentProps {
  items: IClient[];
}

const ClientSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IClient>[] = [
    {
      title: 'Code',
      key: 'code',
      sorter: {
        compare: (a: any, b: any) => (a.code > b.code ? 1 : -1),
      },
      render: (row) => <Link to={`/client/${row._id}`}>{row.code}</Link>,
    },
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/client/${row._id}`}>{row.name}</Link>,
      sorter: {
        compare: (a: any, b: any) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1),
      },
      // render: (row) => <ClientHoverCard id={get(row, '_id')} name={get(row, 'name')} />,
    },
    {
      title: 'Teacher',
      key: 'teacherAccount',
      render: (row) => {
        return <Link to={`/teacherAccount/${get(row, 'teacherAccount._id')}`}>{get(row, 'teacherAccount.name')}</Link>;
      },
    },
    {
      title: 'Phone',
      render: (row) => <RenderPhoneNumber phoneNumberAll={get(row, 'phoneNumber', {})} />,
      key: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => <a href={'mailto:' + email}>{email}</a>,
    },
    {
      title: '',
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

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientSearchList));
