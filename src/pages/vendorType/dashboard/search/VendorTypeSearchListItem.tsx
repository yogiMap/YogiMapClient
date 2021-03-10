import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IVendorType } from '@/pages/vendorType/types';

interface IProps extends IVendorType {
  vendorTypeDelete: (id: String) => void;
}

const VendorTypeSearchListItem = (props: IProps) => {
  const { vendorTypeDelete } = props;

  const owner = get(props, 'item.owner', '');
  const vendorTypeId = get(props, 'item._id', '');
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
        <Button danger onClick={() => vendorTypeDelete(vendorTypeId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  vendorTypeDelete: (payload: any) => dispatch({ type: 'VendorTypeDashboard/vendorTypeDelete', payload }),
});

export default connect(null, mapDispatchToProps)(VendorTypeSearchListItem);
