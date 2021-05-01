import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { IClasses, IClassesQueryParams } from '@/pages/classes/types';
import ClassesForm from '@/pages/classes/form/ClassesForm';
import { ILoadingEffects } from '@/types';

export interface IClassesUpdate {
  values: IClasses;
  classesId: string;
  queryParams: IClassesQueryParams;
}

interface IProps {
  getById: (teacherId: string) => void;
  updateById: (arg: any) => void;
  classesGetById: (classesId: string) => void;
  classesInfo: IClasses;
  loadingEffects: ILoadingEffects;
  styleSearch: () => void;
  teacherSearch: () => void;
  teacherTypeSearch: () => void;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ClassesFormSettingsEditWrapper = (props: IProps) => {
  const classesId = get(props, 'ClassesId');
  const queryParams = get(props, 'location.query', {});
  const isLoadingGet = get(props, 'loadingEffects.ClassesForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.ClassesForm/updateById', false);
  const styleList = get(props, 'styleList', []);
  const teacherList = get(props, 'teacherList', []);
  const teacherTypeList = get(props, 'teacherTypeList', []);

  useEffect(() => {
    props.classesGetById(classesId);
    props.getById(classesId);
    props.styleSearch();
    props.teacherSearch();
    props.teacherTypeSearch();
  }, []);

  const onFinish = (values: IClasses) => {
    props.updateById({ values, classesId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <ClassesForm
      onFinish={onFinish}
      initialValues={props.classesInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
      styleList={styleList}
      teacherList={teacherList}
      teacherTypeList={teacherTypeList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  ClassesView: state.ClassesView,
  ClassesId: state.Account.classes,
  classesInfo: state.ClassesForm.classesInfo,
  loadingEffects: state.loading.effects,
  styleList: state.ClassesForm.styleList,
  teacherList: state.ClassesForm.teacherList,
  teacherTypeList: state.ClassesForm.teacherTypeList,
});

const mapDispatchToProps = (dispatch: any) => ({
  classesGetById: (classesId: string) => dispatch({ type: 'ClassesView/classesGetById', payload: classesId }),
  getById: (classesId: string) => dispatch({ type: 'ClassesForm/getById', payload: classesId }),
  updateById: (payload: IClassesUpdate) => dispatch({ type: 'ClassesForm/updateById', payload }),
  styleSearch: () => dispatch({ type: 'ClassesForm/styleSearch' }),
  teacherSearch: () => dispatch({ type: 'ClassesForm/teacherSearch' }),
  teacherTypeSearch: () => dispatch({ type: 'ClassesForm/teacherTypeSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesFormSettingsEditWrapper);
