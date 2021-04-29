import React from 'react';
import { connect } from 'umi';
import TeacherAccountForm from '@/pages/teacherAccount/form/TeacherAccountForm';
import { ITeacherAccount } from '@/pages/teacherAccount/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: ITeacherAccount) => void;
  loadingEffects: ILoadingEffects;
}

const TeacherAccountFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: ITeacherAccount) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.TeacherAccountForm/create', false);

  return <TeacherAccountForm onFinish={onFinish} submitButtonText="Create Teacher Account" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: ITeacherAccount) => dispatch({ type: 'TeacherAccountForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountFormCreateWrapper);
