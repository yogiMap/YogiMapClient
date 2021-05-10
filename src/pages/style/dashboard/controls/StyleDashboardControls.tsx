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

const StyleDashboardControls = (props: IProps) => {
  const styleCreate = () => {
    props.open({
      title: 'Create New Yoga Style',
      component: 'StyleFormCreate',
      place: 'StyleDashboard',
      width: '80%',
    });
  };
  const isUserAuth = get(props, 'Account._id');

  return (
    <>
      {isUserAuth && (
        <Button type="primary" shape="round" onClick={styleCreate}>
          Create Yoga Style
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

export default connect(mapStateToProps, mapDispatchToProps)(StyleDashboardControls);
