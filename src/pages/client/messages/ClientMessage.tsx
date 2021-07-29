import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { get } from 'lodash';
import { connect } from 'umi';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
}

const ClientMessage = (props: any) => {
  const { messageBody, direction, createdAt } = props.item;
  const author = direction === 'inbound-api' ? get(props, 'item.client.name') : get(props, 'item.owner.name');

  const backgroundColor = direction === 'inbound-api' ? { backgroundColor: '#87d068' } : { backgroundColor: '#cfe2ff' };

  const nameArray = author.split(' ');

  const initials = `${nameArray[0][0]}${nameArray[1][0]}`.toUpperCase();

  const authUser = get(props, 'Account', '');
  const isAvatar = get(authUser, 'avatar', false);
  const avatarImg = isAvatar[1];

  return (
    <div className="mb-4 d-flex">
      <div className="me-2">
        {direction === 'outbound-api' ? (
          <Avatar src={avatarImg} />
        ) : (
          <Avatar style={backgroundColor}>{initials}</Avatar>
        )}
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

const mapStateToProps = (state: any) => ({
  Account: state.Account,
  LoadingEffects: state.loading.effects,
});

export default connect(mapStateToProps)(ClientMessage);
