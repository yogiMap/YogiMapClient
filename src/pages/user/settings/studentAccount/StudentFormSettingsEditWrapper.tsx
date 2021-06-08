import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { IStudent, IStudentQueryParams } from '@/pages/student/types';
import StudentForm from '@/pages/student/form/StudentForm';
import { ILoadingEffects } from '@/types';

export interface IStudentUpdate {
  values: IStudent;
  studentId: string;
  queryParams: IStudentQueryParams;
  classTypeSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
  styleSearch: () => void;
}

interface IProps {
  getById: (studentId: string) => void;
  updateById: (arg: any) => void;
  studentGetById: (studentId: string) => void;
  submitButtonText: string;
  initialValues?: IStudent;
  studentInfo: IStudent;
  loadingEffects: ILoadingEffects;
  onFinish: (values: IStudent) => void;
  classTypeSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
  styleSearch: () => void;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const StudentFormSettingsEditWrapper = (props: IProps) => {
  const studentId = get(props, 'StudentId');
  const queryParams = get(props, 'location.query', {});
  const isLoadingGet = get(props, 'loadingEffects.StudentForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.StudentForm/updateById', false);

  useEffect(() => {
    props.studentGetById(studentId);
    props.getById(studentId);
    props.classTypeSearch();
    props.styleSearch();
  }, []);

  const onFinish = (values: IStudent) => {
    props.updateById({ values, studentId, queryParams });
  };
  const classTypeList = get(props, 'classTypeList', []);
  const styleList = get(props, 'styleList', []);

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  // @ts-ignore
  return (
    <StudentForm
      onFinish={onFinish}
      initialValues={props.studentInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
      classTypeList={classTypeList}
      styleList={styleList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  StudentView: state.StudentView,
  StudentId: state.Account.student,
  studentInfo: state.StudentForm.studentInfo,
  loadingEffects: state.loading.effects,
  classTypeList: state.StudentForm.classTypeList,
  styleList: state.StudentForm.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  studentGetById: (studentId: string) => dispatch({ type: 'StudentView/studentGetById', payload: studentId }),
  getById: (studentId: string) => dispatch({ type: 'StudentForm/getById', payload: studentId }),
  updateById: (payload: IStudentUpdate) => dispatch({ type: 'StudentForm/updateById', payload }),
  classTypeSearch: () => dispatch({ type: 'StudentForm/classTypeSearch' }),
  styleSearch: () => dispatch({ type: 'StudentForm/styleSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentFormSettingsEditWrapper);
