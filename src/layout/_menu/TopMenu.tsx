import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
import classNames from 'classnames';
import { IUser } from '@/pages/user/userSearch/types';

interface IProps {
  User: IUser;
  close: () => void;
}

const TopMenu = (props: IProps) => {
  const location = get(props, 'location.pathname', '');
  const isUserAuth = get(props, 'User._id');

  const acl = get(props, 'User.acl', []);
  const teacherAccountId = get(props, 'User.teacherAccount', '');
  const isUserConfirmedEmail = get(props, 'User.emailConfirmation.confirmed', false);

  const guestMenu = [
    { path: '/', name: 'HOME' },
    { path: '/style', name: 'STYLE' },
    { path: '/teacherAccount', name: 'TEACHERS' },
    { path: '/classes', name: 'CLASSES' },
    { path: '/event', name: 'EVENTS' },
    { path: '/classType', name: 'TYPE' },
    { path: '/list/focus', name: 'FOCUS' },
  ].map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
  }));

  const teacherMenu = [
    { path: `/teacherAccount/${teacherAccountId}`, name: 'HOME', perm: 'teacherAccount.get.own' },
    { path: '/client', name: 'CLIENTS', perm: 'client.get.own' },
    { path: '/payment', name: 'PAYMENTS', perm: 'payment.get.own' },
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
      {isUserAuth ? (
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
        guestMenu.map((el) => (
          <div className={classNames('item', { active: el.isActive })} key={el.path}>
            <Link to={el.path}>{el.name}</Link>
          </div>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  User: state.User,
  mobileMenu: state.mobileMenu,
});

const mapDispatchToProps = (dispatch: any) => ({
  close: () => dispatch({ type: 'MobileMenu/close' }),
});

// @ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopMenu));
