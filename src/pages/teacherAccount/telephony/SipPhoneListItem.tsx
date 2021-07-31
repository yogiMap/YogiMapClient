import React from 'react';
import moment from 'moment';
import { connect } from 'umi';
import { get } from 'lodash';
import { ISidepanel, ISidepanelOpen } from '@/pages/utils/sidepanel/types';
import ActionMenu from '@/pages/teacherAccount/telephony/ActionMenu';
import { ISipPhone } from '@/pages/telephony/types';

interface IProps {
  item: ISipPhone;
  open: ISidepanelOpen;
  teacherAccountId: string;
}

const SipPhoneListItem = (props: IProps) => {
  const createdAt = get(props, 'item.createdAt', '');
  const phoneNumber = get(props, 'item.phoneNumber', '');
  const description = get(props, 'item.description', '');
  const owner = get(props, 'item.owner.name', '');

  return (
    <table>
      <tr>
        <th>CreatedAt</th>
        <th>Phone Number</th>
        <th>Description</th>
        <th>Owner</th>
        <th>Action</th>
      </tr>
      <tr>
        <td>{moment(createdAt).format('LL HH:mm')}</td>
        <td>{phoneNumber}</td>
        <td>{description}</td>
        <td> {owner}</td>
        <td>
          <ActionMenu row={props.item} teacherAccountId={props.teacherAccountId} />
        </td>
      </tr>
    </table>
  );
};

const mapStateToProps = (state: any) => ({
  loader: state.Loader,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneListItem);
