import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
import classNames from 'classnames';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
}

const TopMenu = (props: IProps) => {
  const location = get(props, 'location.pathname', '');
  const acl = get(props, 'Account.acl', []);

  const mainMenu = [
    // { path: '/base', name: 'Base', perm: 'base.get.own' },
    { path: '/', name: 'HOME' },
    { path: '/teacherAccount', name: 'TEACHER', perm: 'teacherAccount.get.own' },
    { path: '/classes', name: 'CLASSES', perm: 'classes.get.own' },
    { path: '/event', name: 'EVENTS', perm: 'event.get.own' },
    { path: '/list/focus', name: 'YOGA FOCUS', perm: 'focus.get.own' },
    { path: '/style', name: 'YOGA STYLE', perm: 'style.get.own' },
    { path: '/classType', name: 'CLASS TYPE', perm: 'classType.get.own' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
  }));

  return (
    <div id="top-menu" role="menu">
        {mainMenu.map((el) => (
          <div className="item" key={el.path}>
            <Link to={el.path}>{el.name}</Link>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default withRouter(connect(mapStateToProps)(TopMenu));
