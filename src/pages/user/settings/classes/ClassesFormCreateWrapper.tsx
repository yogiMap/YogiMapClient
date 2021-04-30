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
  teacherSearch: () => void;
  teacherTypeSearch: () => void;
  // yogaType: () => void;
}

const ClassesFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IClasses) => {
    props.create(values);
  };

  useEffect(() => {
    props.styleSearch();
    props.teacherSearch();
    props.teacherTypeSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.ClassesForm/create', false);
  const styleList = get(props, 'styleList', []);
  const teacherList = get(props, 'teacherList', []);
  const teacherTypeList = get(props, 'teacherTypeList', []);
  // const yogaType = get(props, 'yogaType', '');

  // @ts-ignore
  return <ClassesForm
    onFinish={onFinish}
    submitButtonText="Create"
    isLoading={isLoading}
    styleList={styleList}
    teacherList={teacherList}
    teacherTypeList={teacherTypeList}
    // yogaType={yogaType}
  />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  styleList: state.ClassesForm.styleList,
  teacherList: state.ClassesForm.teacherList,
  teacherTypeList: state.ClassesForm.teacherTypeList,
  // yogaType: state.Account.yogaType
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IClasses) => dispatch({ type: 'ClassesForm/create', payload }),
  styleSearch: () => dispatch({ type: 'ClassesForm/styleSearch' }),
  teacherSearch: () => dispatch({ type: 'ClassesForm/teacherSearch' }),
  teacherTypeSearch: () => dispatch({ type: 'ClassesForm/teacherTypeSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesFormCreateWrapper);