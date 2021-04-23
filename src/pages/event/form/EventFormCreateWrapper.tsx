import React from 'react';
import { connect } from 'umi';
import eventForm from '@/pages/event/form/eventForm';
import { Ievent } from '@/pages/event/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: Ievent) => void;
  loadingEffects: ILoadingEffects;
}

const eventFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: Ievent) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.eventForm/create', false);

  return <eventForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: Ievent) => dispatch({ type: 'eventForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(eventFormCreateWrapper);
