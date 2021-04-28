import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IAddress } from '@/pages/address/types';

interface IProps extends IAddress {
  addressDelete: (id: String) => void;
}

const AddressSearchListItem = (props: IProps) => {
  const { addressDelete } = props;

  const owner = get(props, 'item.owner', '');
  const addressId = get(props, 'item._id', '');
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
        <Button danger onClick={() => addressDelete(addressId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  addressDelete: (payload: any) => dispatch({ type: 'AddressDashboard/deleteById', payload }),
});

export default connect(null, mapDispatchToProps)(AddressSearchListItem);
