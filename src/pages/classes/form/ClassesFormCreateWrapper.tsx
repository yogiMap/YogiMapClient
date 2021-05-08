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
  teacherAccountSearch: () => void;
  classTypeSearch: () => void;
}

const ClassesFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IClasses) => {
    props.create(values);
  };

  useEffect(() => {
    props.styleSearch();
    props.teacherAccountSearch();
    props.classTypeSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.ClassesForm/create', false);
  const styleList = get(props, 'styleList', []);
  const teacherAccountList = get(props, 'teacherAccountList', []);
  const classTypeList = get(props, 'classTypeList', []);

  return <ClassesForm
    onFinish={onFinish}
    submitButtonText="Create"
    isLoading={isLoading}
    styleList={styleList}
    teacherAccountList={teacherAccountList}
    classTypeList={classTypeList}
  />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  styleList: state.ClassesForm.styleList,
  teacherAccountList: state.ClassesForm.teacherAccountList,
  classTypeList: state.ClassesForm.classTypeList,

});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IClasses) => dispatch({ type: 'ClassesForm/create', payload }),
  styleSearch: () => dispatch({ type: 'ClassesForm/styleSearch' }),
  teacherAccountSearch: () => dispatch({ type: 'ClassesForm/teacherAccountSearch' }),
  classTypeSearch: () => dispatch({ type: 'ClassesForm/classTypeSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesFormCreateWrapper);
