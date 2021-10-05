import React from 'react';
import moment from 'moment';
import { connect } from 'umi';
import { get } from 'lodash';
import { ISidepanel, ISidepanelOpen } from '@/pages/utils/sidepanel/types';
import ActionMenu from '@/pages/teacherAccount/telephony/ActionMenu';
import { ISipPhone } from '@/pages/telephony/types';
import { ColumnProps } from 'antd/es/table';
import { Table, Tag } from 'antd';

interface IProps {
  item: ISipPhone;
  open: ISidepanelOpen;
  teacherAccountId: string;
  sipPhoneOwners: ISipPhone;
}

const SipPhoneListItem = (props: IProps) => {
  const sipPhoneOwners = get(props, 'teacherSipPhones', []);

  const columns: ColumnProps<ISipPhone>[] = [
    {
      title: 'SIP Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '20%',
    },
    {
      title: 'Sip Number Owner',
      dataIndex: 'owner',
      key: 'owner',
      render: (owner) => <div>{owner.name}</div>,
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '30%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: () => <ActionMenu row={props.item} teacherAccountId={props.teacherAccountId} />, // TODO
      width: '5%',
    },
  ];

  return <Table rowKey="_id" columns={columns} dataSource={sipPhoneOwners} size="large" pagination={false} />;
};

const mapStateToProps = (state: any) => ({
  loader: state.Loader,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneListItem);
