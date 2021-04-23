import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IEvent } from '@/pages/event/types';

interface IProps extends IEvent {
  eventDelete: (id: String) => void;
}

const EventSearchListItem = (props: IProps) => {
  const { eventDelete } = props;

  const owner = get(props, 'item.owner', '');
  const eventId = get(props, 'item._id', '');
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
        <Button danger onClick={() => eventDelete(eventId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  eventDelete: (payload: any) => dispatch({ type: 'EventDashboard/eventDelete', payload }),
});

export default connect(null, mapDispatchToProps)(EventSearchListItem);
