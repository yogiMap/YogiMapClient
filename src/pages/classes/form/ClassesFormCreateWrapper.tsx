import React, { useEffect } from 'react';
import { connect } from 'umi';
import ClassesForm from '@/pages/classes/form/ClassesForm';
import { IClasses } from '@/pages/classes/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IClasses) => void;
  loadingEffects: ILoadingEffects;
  styleSearch: () => void;
  classTypeSearch: () => void;
  teacherAccountInfo: () => void;
  teacherAccountGetById: (teacherAccountId: string) => void;
}

const ClassesFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IClasses) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.ClassesForm/create', false);
  const styleList = get(props, 'styleList', []);
  const classTypeList = get(props, 'classTypeList', []);
  const teacherAccountInfo = get(props, 'teacherAccountInfo', []);
  const teacherAccountId = get(props, 'TeacherAccountId', '');

  if (!teacherAccountId) return null;

  useEffect(() => {
    props.teacherAccountGetById(teacherAccountId);
    props.styleSearch();
    props.classTypeSearch();
  }, []);

  return (
    <ClassesForm
      onFinish={onFinish}
      submitButtonText="Create"
      isLoading={isLoading}
      styleList={styleList}
      classTypeList={classTypeList}
      teacherAccountInfo={teacherAccountInfo}
    />
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  styleList: state.ClassesForm.styleList,
  classTypeList: state.ClassesForm.classTypeList,
  teacherAccountInfo: state.ClassesForm.teacherAccountInfo,
  TeacherAccountId: state.User.teacherAccount,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IClasses) => dispatch({ type: 'ClassesForm/create', payload }),
  styleSearch: () => dispatch({ type: 'ClassesForm/styleSearch' }),
  classTypeSearch: () => dispatch({ type: 'ClassesForm/classTypeSearch' }),
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'ClassesForm/teacherAccountGetById', payload: teacherAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesFormCreateWrapper);
