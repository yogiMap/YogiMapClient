import React, { useEffect } from 'react';
import { connect } from 'umi';
import TeacherForm from '@/pages/teacher/form/TeacherForm';
import { ITeacher } from '@/pages/teacher/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: ITeacher) => void;
  teacherTypeSearch: () => void;
  loadingEffects: ILoadingEffects;
}

const TeacherCreateWrapper = (props: IProps) => {
  const onFinish = (values: ITeacher) => {
    props.create(values);
  };

  useEffect(() => {
    props.teacherTypeSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.TeacherTypeForm/create', false);
  const teacherTypeList = get(props, 'teacherTypeList', []);

  return <TeacherForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} teacherTypeList={teacherTypeList} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  teacherTypeList: state.TeacherForm.teacherTypeList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: ITeacher) => dispatch({ type: 'TeacherTypeForm/create', payload }),
  teacherTypeSearch: () => dispatch({type: 'TeacherForm/teacherTypeSearch'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCreateWrapper);
