import React from 'react';
import { Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';
import { get } from 'lodash';

interface Props {}

const ClientMessage = (props: any) => {
  const { messageBody, direction, createdAt } = props.item;
  const author = direction === 'inbound-api' ? get(props, 'item.client.name') : get(props, 'item.owner.name');

  const backgroundColor = direction === 'inbound-api' ? { backgroundColor: '#87d068' } : { backgroundColor: '#cfe2ff' };

  const nameArray = author.split(' ');
  const initials = `${nameArray[0][0]}${nameArray[1][0]}`.toUpperCase();

  return (
    <div className="mb-4 d-flex">
      <div className="me-2">
        <Avatar style={backgroundColor}>{initials}</Avatar>
      </div>

      <div className="d-flex align-items-start flex-column">
        <div className="lh-1 mb-1">
          <span className="small me-3 text-colored-first">{author}</span>
          <span className="small text-secondary">
            <Tooltip title={moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(createdAt).fromNow()}</span>
            </Tooltip>
          </span>
        </div>

        <div>{messageBody}</div>
      </div>
    </div>
  );
};

export default ClientMessage;
