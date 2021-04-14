import React from 'react';
import { connect } from 'umi';
import TeacherTypeForm from '@/pages/teacherType/form/TeacherTypeForm';
import { ITeacherType } from '@/pages/teacherType/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: ITeacherType) => void;
  loadingEffects: ILoadingEffects;
}

const TeacherTypeFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: ITeacherType) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.TeacherTypeForm/create', false);

  return <TeacherTypeForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: ITeacherType) => dispatch({ type: 'TeacherTypeForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherTypeFormCreateWrapper);
