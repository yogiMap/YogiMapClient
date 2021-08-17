import React from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { ISidepanel, ISidepanelOpen } from '@/pages/utils/sidepanel/types';
import ActionMenu from '@/pages/teacherAccount/telephony/ActionMenu';
import { ISipPhone } from '@/pages/telephony/types';
import { ColumnProps } from 'antd/es/table';
import { Table, Tag } from 'antd';
import { formatterDateFull } from '@/utils/dateTime';

interface IProps {
  items: ISipPhone[];
  open: ISidepanelOpen;
  teacherAccountId: string;
}

const SipPhoneListItem = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<ISipPhone>[] = [
    {
      title: 'createdAt',
      key: 'createdAt',
      render: (row) => formatterDateFull(row.date),
    },
    {
      title: 'SIP Phone Number',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'description',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Owner',
      key: 'owner[name]',
      render: (row) => {
        return <Link to={`/profile/${get(row, 'owner._id')}`}>{get(row, 'owner.name')}</Link>;
      },
    },
    {
      title: 'Capabilities',
      dataIndex: 'capabilities',
      key: 'capabilities',
      render: () => (
        <>
          <Tag color={'geekblue'}>voice</Tag>
          <Tag color={'geekblue'}>sms</Tag>
          <Tag color={'geekblue'}>mms</Tag>
        </>
      ),
      width: '20%',
    },

    {
      title: 'Action',
      key: 'action',
      width: '5%',
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

const mapStateToProps = (state: any) => ({
  loader: state.Loader,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneListItem);
