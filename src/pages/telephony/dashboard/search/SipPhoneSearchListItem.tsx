import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { ISipPhone } from '@/pages/telephony/types';

interface IProps extends ISipPhone {
  sipPhoneDelete: (id: String) => void;
}

const SipPhoneSearchListItem = (props: IProps) => {
  const { sipPhoneDelete } = props;

  const owner = get(props, 'item.owner', '');
  const sipPhoneId = get(props, 'item._id', '');
  const createdAt = get(props, 'item.createdAt', '');
  const description = get(props, 'item.description', '');

  const ownerName = get(owner, 'name', '');
  const ownerId = get(owner, '_id', '');

  return (
    <div>
      <Row>
        {moment(createdAt).format('LL HH:mm')}

        <Link to={`/profile/${ownerId}`}>{ownerName}</Link>
      </Row>

      <Row>{description}</Row>

      <Row>
        <Button danger onClick={() => sipPhoneDelete(sipPhoneId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  sipPhoneDelete: (payload: any) => dispatch({ type: 'SipPhoneDashboard/sipPhoneDelete', payload }),
});

export default connect(null, mapDispatchToProps)(SipPhoneSearchListItem);
