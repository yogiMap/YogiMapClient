import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IFocus } from '@/pages/focus/types';

interface IProps extends IFocus {
  focusDelete: (id: String) => void;
}

const FocusSearchListItem = (props: IProps) => {
  const { focusDelete } = props;

  const owner = get(props, 'item.owner', '');
  const focusId = get(props, 'item._id', '');
  const createdAt = get(props, 'item.createdAt', '');
  const description = get(props, 'item.description', '');

  const ownerName = get(owner, 'name', '');
  const ownerId = get(owner, '_id', '');

  return (
    <div>
      <div className="row">
        {moment(createdAt).format('LL HH:mm')}

        <Link to={`/profile/${ownerId}`}>{ownerName}</Link>
      </div>

      <div className="row">{description}</div>

      <div className="row">
        <Button danger onClick={() => focusDelete(focusId)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default FocusSearchListItem ;
