import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { get } from 'lodash';

interface IProps {
  open: (arg: ISidepanel) => void;
  Account: IUserAccount;
}

const TeacherDashboardControls = (props: IProps) => {
  const teacherCreate = () => {
    props.open({
      title: 'Choose the Type of Profile to Create',
      component: 'TeacherFormCreate',
      place: 'TeacherDashboard',
      width: 800,
    });
  };

  const isUserAuth = get(props, 'Account._id');

  return (
    <>
      {isUserAuth && (
        <Button type="primary"
                shape="round"
                onClick={teacherCreate}>
          Choose the Type of Profile to Create
        </Button>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDashboardControls);
