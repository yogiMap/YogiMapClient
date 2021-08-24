import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import HomeBoard from '@/pages/homeboard/HomeBoard';
import HomePage from '@/pages/infoPages/home/Home';
import LayoutGuest from '@/layout/LayoutGuest';
import LayoutFluid from '@/layout/LayoutFluid';

interface IProps {}

const HomeSwitch = (props: IProps) => {
  const userId = get(props, 'User._id', '');
  const isLoadingAuth = get(props, 'loadingEffects.User/auth', true);

  if (isLoadingAuth) return null;

  if (userId)
    return (
      <LayoutFluid>
        <HomeBoard />
      </LayoutFluid>
    );
  else
    return (
      <LayoutGuest>
        <HomePage />
      </LayoutGuest>
    );
};

const mapStateToProps = (state: any) => ({
  User: state.User,
  loadingEffects: state.loading.effects,
});

export default connect(mapStateToProps)(HomeSwitch);
