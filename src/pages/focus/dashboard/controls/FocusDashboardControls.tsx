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

const FocusDashboardControls = (props: IProps) => {
  const focusCreate = () => {
    props.open({
      title: 'What Type of Yoga do you Teach?',
      component: 'FocusFormCreate',
      place: 'FocusDashboard',
      width: 800,
    });
  };

  const isUserAuth = get(props, 'Account._id');


  return (
    <>
      {isUserAuth && (
    <Button type="primary"  shape="round"  onClick={focusCreate}>
      Teacher Type
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

export default connect(mapStateToProps, mapDispatchToProps)(FocusDashboardControls);
