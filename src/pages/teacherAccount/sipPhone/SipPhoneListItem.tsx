import React from 'react';
import moment from 'moment';
import { connect } from 'umi';
import { get } from 'lodash';
import { ISidepanel, ISidepanelOpen } from '@/pages/utils/sidepanel/types';
import ActionMenu from '@/pages/sipPhone/dashboard/search/ActionMenu';
import { ISipPhone } from '@/pages/sipPhone/types';

interface IProps {
  item: ISipPhone;
  open: ISidepanelOpen;
}

const SipPhoneListItem = (props: IProps) => {
  const createdAt = get(props, 'item.createdAt', '');
  const phoneNumber = get(props, 'item.phoneNumber', '');
  const description = get(props, 'item.description', ' ');

  return (
    <div className="row mb-2 border-bottom">
      <div className="col-md-2">
        <div>{moment(createdAt).format('LL HH:mm')}</div>
      </div>

      <div className="col-md-3">{phoneNumber}</div>
      <div className="col-md-3">{description}</div>

      <div className="col-md-2">
        <ActionMenu row={props.item} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loader: state.Loader,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneListItem);