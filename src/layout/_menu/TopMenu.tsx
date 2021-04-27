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
    { path: '/teacher', name: 'TEACHER', perm: 'teacher.get.own' },
    { path: '/classes', name: 'CLASSES', perm: 'classes.get.own' },
    { path: '/event', name: 'EVENTS', perm: 'event.get.own' },
    { path: '/teacherType', name: 'TYPE OF YOGA', perm: 'teacherType.get.own' },
    { path: '/style', name: 'YOGA STYLE', perm: 'style.get.own' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
  }));


  return (
    <div id="top-menu" role="menu" className="d-flex d-print-none">

      {mainMenu.map((el) => (
        <div className={classNames('item', { active: el.isActive })} key={el.path}>
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
