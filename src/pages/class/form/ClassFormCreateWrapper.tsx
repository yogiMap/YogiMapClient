import React from 'react';
import { connect } from 'umi';
import ClassForm from '@/pages/class/form/ClassForm';
import { IClass } from '@/pages/class/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IClass) => void;
  loadingEffects: ILoadingEffects;
}

const ClassFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IClass) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.ClassForm/create', false);

  return <ClassForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IClass) => dispatch({ type: 'ClassForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassFormCreateWrapper);
