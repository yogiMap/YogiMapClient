import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import { IPayment, IPaymentQueryParams } from '@/pages/payment/types';
import ActionMenu from '@/pages/payment/dashboard/search/ActionMenu';
//import OrderHoverCard from '@/pages/utils/hoverCard/OrderHoverCard';
import ClientHoverCard from '@/pages/utils/hoverCard/ClientHoverCard';

interface IPaymentDeleteById {
  paymentId: string;
  queryParams: IPaymentQueryParams;
}

interface IProps extends RouteComponentProps {
  items: IPayment[];
  open: (arg: ISidepanel) => void;
  paymentDeleteById: (arg: IPaymentDeleteById) => void;
}

const PaymentSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IPayment>[] = [
    {
      title: 'Code',
      key: 'code',
      render: (row) => <Link to={`/payment/${row._id}`}>{row.code}</Link>,
    },
    {
      title: 'Payment Amount',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'Invoice Code',
      key: 'code',
      render: (row) => <Link to={`/invoice/${row._id}`}>{row.code}</Link>,
    },
    {
      title: 'Client',
      key: 'client',
      render: (row) => <ClientHoverCard id={get(row, 'client._id')} name={get(row, 'client.name')} />,
    },
    // {
    //   title: 'Order',
    //   key: 'order',
    //   render: (row) => <OrderHoverCard id={get(row, 'order._id')} description={get(row, 'order.description')} />,
    // },
    {
      title: 'Check Number',
      key: 'checkNumber',
      dataIndex: 'checkNumber',
    },
    {
      title: 'Credit Card Last4',
      key: 'creditCardLast4',
      dataIndex: 'creditCardLast4',
    },
    {
      title: 'Credit Card Status',
      key: 'creditCardStatus',
      dataIndex: 'creditCardStatus',
    },
    {
      title: 'Payment Type',
      key: 'paymentType',
      dataIndex: 'paymentType',
    },

    {
      title: 'Credit Card Email',
      dataIndex: 'creditCardEmail',
      key: 'creditCardEmail',
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

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  paymentDeleteById: (payload: IPaymentDeleteById) => dispatch({ type: 'PaymentDashboard/paymentDeleteById', payload }),
});

export default withRouter(connect(null, mapDispatchToProps)(PaymentSearchList));
