import React from 'react';
import { connect } from 'umi';
import ClassesForm from '@/pages/classes/form/ClassesForm';
import { IClasses } from '@/pages/classes/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IClasses) => void;
  loadingEffects: ILoadingEffects;
}

const ClassesFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IClasses) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.ClassesForm/create', false);

  return <ClassesForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IClasses) => dispatch({ type: 'ClassesForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesFormCreateWrapper);
