import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { ISidepanel, ISidepanelOpen } from '@/pages/utils/sidepanel/types';
import ActionMenu from '@/pages/teacherAccount/telephony/ActionMenu';
import { ISipPhone } from '@/pages/telephony/types';
import { ColumnProps } from 'antd/es/table';
import { ITeacherAccount } from '@/pages/teacherAccount/types';
import TeacherAccountHoverCard from '@/pages/utils/hoverCard/TeacherAccountHoverCard';
import { Table } from 'antd';
import { formatterDateTimeFull } from '@/utils/dateTime';

interface IProps {
  items: ISipPhone[];
  open: ISidepanelOpen;
  teacherAccountId: string;
}

const SipPhoneListItem = (props: IProps) => {
  // const createdAt = get(props, 'item.createdAt', '');
  // const phoneNumber = get(props, 'item.phoneNumber', '');
  // const description = get(props, 'item.description', '');
  // const owner = get(props, 'item.owner.name', '');

  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<ISipPhone>[] = [
    {
      title: 'createdAt',
      key: 'createdAt',
      render: (row) => formatterDateTimeFull(row.date),
    },
    {
      title: 'description',
      key: 'description',
      dataIndex: 'description',
    },

    {
      title: 'phoneNumber',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
    },

    {
      title: 'Owner',
      key: 'owner[name]',
      render: (row) => {
        return <Link to={`/profile/${get(row, 'owner._id')}`}>{get(row, 'owner.name')}</Link>;
      },
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

    // <table>
    //   <tbody>
    //     <tr>
    //       <th>CreatedAt</th>
    //       <th>Phone Number</th>
    //       <th>Description</th>
    //       <th>Owner</th>
    //       <th>Action</th>
    //     </tr>
    //     <tr>
    //       <td>{moment(createdAt).format('LL HH:mm')}</td>
    //       <td>{phoneNumber}</td>
    //       <td>{description}</td>
    //       <td> {owner}</td>
    //       <td>
    //         <ActionMenu row={props.item} teacherAccountId={props.teacherAccountId} />
    //       </td>
    //     </tr>
    //   </tbody>
    // </table>
  );
};

const mapStateToProps = (state: any) => ({
  loader: state.Loader,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneListItem);
