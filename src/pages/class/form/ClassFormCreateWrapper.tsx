import React from 'react';
import { connect } from 'umi';
import classForm from '@/pages/class/form/classForm';
import { Iclass } from '@/pages/class/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: Iclass) => void;
  loadingEffects: ILoadingEffects;
}

const classFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: Iclass) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.classForm/create', false);

  return <classForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: Iclass) => dispatch({ type: 'classForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(classFormCreateWrapper);
