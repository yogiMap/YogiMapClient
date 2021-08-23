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

const TeacherDashboardControls = (props: IProps) => {
  const teacherCreate = () => {
    props.open({
      title: 'Create Teacher',
      component: 'TeacherFormCreate',
      place: 'TeacherDashboard',
      width: 800,
    });
  };

  const isUserAuth = get(props, 'Account._id');

  return (
    <>
      {isUserAuth && (
        <Button type="primary" shape="round" onClick={teacherCreate}>
          Create Teacher
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDashboardControls);
