import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IStyle } from '@/pages/style/types';

interface IProps extends IStyle {
  styleDelete: (id: String) => void;
}

const StyleSearchListItem = (props: IProps) => {
  const { styleDelete } = props;

  const owner = get(props, 'item.owner', '');
  const styleId = get(props, 'item._id', '');
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
        <Button danger onClick={() => styleDelete(styleId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  styleDelete: (payload: any) => dispatch({ type: 'StyleDashboard/styleDelete', payload }),
});

export default connect(null, mapDispatchToProps)(StyleSearchListItem);
