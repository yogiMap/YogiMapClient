import React from 'react';
import { connect } from 'umi';
import ClassTypeForm from '@/pages/classType/form/ClassTypeForm';
import { IClassType } from '@/pages/classType/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IClassType) => void;
  loadingEffects: ILoadingEffects;
}

const ClassTypeFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IClassType) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.ClassTypeForm/create', false);

  return <ClassTypeForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IClassType) => dispatch({ type: 'ClassTypeForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassTypeFormCreateWrapper);
