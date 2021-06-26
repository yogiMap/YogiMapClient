import React from 'react';
import { Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';
import { get } from 'lodash';

interface Props {}

const ClientMessage = (props: any) => {
  const { messageBody, direction } = props.item;
  const author = direction === 'inbound-api' ? get(props, 'item.client.name') : 'You';
  const justifyContent = direction === 'inbound-api' ? 'flex-end' : 'flex-start';
  return (
    <div>
      <Comment
        author={author}
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
        content={<p>{messageBody}</p>}
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );
};

export default ClientMessage;
