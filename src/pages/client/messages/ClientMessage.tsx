import React from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import moment from 'moment';

interface Props {}

const ClientMessage = (props: any) => {
  const { body, direction } = props.item;
  const author = direction === 'inbound-api' ? props.item.client.name : 'You';
  const justifyContent = direction === 'inbound-api' ? 'flex-end' : 'flex-start';
  return (
    <div style={{ display: 'flex', justifyContent }}>
      <Comment
        author={author}
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
        content={<p>{body}</p>}
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
