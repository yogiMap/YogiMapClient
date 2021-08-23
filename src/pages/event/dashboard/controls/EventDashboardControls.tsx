import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { get } from 'lodash';

interface IProps {
  open: (arg: ISidepanel) => void;
  User: IUser;
}

const EventDashboardControls = (props: IProps) => {
  const eventCreate = () => {
    props.open({
      title: 'Create New Event',
      component: 'EventFormCreate',
      place: 'EventDashboard',
      width: '80%',
    });
  };

  //const isUserAuth = get(props, 'Account._id');
  const isUserHasTeacherAccount = get(props, 'Account.teacherAccount', '');
  const roles = get(props, 'Account.roles', []);

  const isAdmin = roles.includes('admin');

  return (
    <>
      {(isUserHasTeacherAccount || isAdmin) && (
        <Button type="primary" shape="round" onClick={eventCreate}>
          Create Event
        </Button>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  User: state.User,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboardControls);
