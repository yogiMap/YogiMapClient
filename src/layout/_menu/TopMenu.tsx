import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
import classNames from 'classnames';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
  close: () => void;
}

const TopMenu = (props: IProps) => {
  const location = get(props, 'location.pathname', '');
  const acl = get(props, 'Account.acl', []);
  const teacherAccountId = get(props, 'Account.teacherAccount', '');
  const isUserConfirmedEmail = get(props, 'Account.emailConfirmation.confirmed', false);

  const mainMenu = [
    // { path: '/base', name: 'Base', perm: 'base.get.own' },
    { path: '/', name: 'HOME' },
    { path: '/style', name: 'STYLE', perm: 'style.get.own' },
    { path: '/teacherAccount', name: 'TEACHERS', perm: 'teacherAccount.get.own' },
    { path: '/classes', name: 'CLASSES', perm: 'classes.get.own' },
    { path: '/event', name: 'EVENTS', perm: 'event.get.own' },
    { path: '/classType', name: 'TYPE', perm: 'classType.get.own' },
    { path: '/list/focus', name: 'FOCUS', perm: 'focus.get.own' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
  }));

  const teacherMenu = [
    { path: `/teacherAccount/${teacherAccountId}`, name: 'HOME', perm: 'teacherAccount.get.own' },
    { path: '/client', name: 'CLIENTS', perm: 'client.get.own' },
    { path: '/teacherAccount', name: 'TEACHERS', perm: 'teacherAccount.get.own' },
    { path: '/classes', name: 'CLASSES', perm: 'classes.get.own' },
    { path: '/event', name: 'EVENTS', perm: 'event.get.own' },
    { path: '/style', name: 'STYLE', perm: 'style.get.own' },
    { path: '/classType', name: 'TYPE', perm: 'classType.get.own' },
    { path: '/list/focus', name: 'FOCUS', perm: 'focus.get.own' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
    isVisible: acl.includes(el.perm),
  }));

  return (
    <div id="top-menu" role="menu">
      {teacherAccountId && isUserConfirmedEmail ? (
        <>
          {teacherMenu.map(
            (el) =>
              el.isVisible && (
                <div className={classNames('item', { active: el.isActive })} key={el.path}>
                  <Link to={el.path}>{el.name}</Link>
                </div>
              ),
          )}
        </>
      ) : (
        mainMenu.map((el) => (
          <div className="item" key={el.path}>
            <Link to={el.path}>{el.name}</Link>
          </div>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
  mobileMenu: state.mobileMenu,
});

const mapDispatchToProps = (dispatch: any) => ({
  close: () => dispatch({ type: 'MobileMenu/close' }),
});

// @ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopMenu));
