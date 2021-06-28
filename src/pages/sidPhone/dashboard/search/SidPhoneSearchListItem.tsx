import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { ISidPhone } from '@/pages/sidPhone/types';

interface IProps extends ISidPhone {
  sidPhoneDelete: (id: String) => void;
}

const SidPhoneSearchListItem = (props: IProps) => {
  const { sidPhoneDelete } = props;

  const owner = get(props, 'item.owner', '');
  const sidPhoneId = get(props, 'item._id', '');
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
        <Button danger onClick={() => sidPhoneDelete(sidPhoneId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  sidPhoneDelete: (payload: any) => dispatch({ type: 'SidPhoneDashboard/sidPhoneDelete', payload }),
});

export default connect(null, mapDispatchToProps)(SidPhoneSearchListItem);
