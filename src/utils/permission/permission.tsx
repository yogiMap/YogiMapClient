import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  perm: string;
  children: any;
  deniedMessage?: boolean;
  Account: IUserAccount;
}

const message = <strong>Permission denied</strong>;

const Permission = (props: IProps): JSX.Element | null => {
  const { perm, children, deniedMessage = false } = props;

  const acl = get(props, 'Account.acl', []);

  if (acl.includes(perm) || perm === '') return children;
  if (deniedMessage) return message;
  return null;
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default connect(mapStateToProps)(Permission);
