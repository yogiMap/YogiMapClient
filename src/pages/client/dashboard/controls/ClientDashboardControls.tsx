import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  open: (arg: ISidepanel) => void;
  User: IUser;
}

const ClientDashboardControls = (props: IProps) => {
  const clientCreate = () => {
    props.open({
      title: 'Create new Client',
      component: 'ClientFormCreate',
      place: 'ClientDashboard',
      width: '80%',
    });
  };

  const isUserHasTeacherAccount = get(props, 'User.teacherAccount', '');
  const roles = get(props, 'User.roles', []);

  const isAdmin = roles.includes('admin');

  return (
    <>
      {(isUserHasTeacherAccount || isAdmin) && (
        <Button type="primary" shape="round" onClick={clientCreate}>
          Create Client
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientDashboardControls);
