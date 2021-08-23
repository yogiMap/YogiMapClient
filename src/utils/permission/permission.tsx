import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  perm: string;
  children: any;
  deniedMessage?: boolean;
  User: IUser;
}

const message = <strong>Permission denied</strong>;

const Permission = (props: IProps): JSX.Element | null => {
  const { perm, children, deniedMessage = false } = props;

  const acl = get(props, 'User.acl', []);

  if (acl.includes(perm) || perm === '') return children;
  if (deniedMessage) return message;
  return null;
};

const mapStateToProps = (state: any) => ({
  User: state.User,
});

export default connect(mapStateToProps)(Permission);
