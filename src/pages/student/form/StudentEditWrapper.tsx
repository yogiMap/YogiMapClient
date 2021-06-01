import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import StudentForm from '@/pages/student/form/StudentForm';
import { IStudent } from '@/pages/student/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (studentId: string) => void;
  reset: () => void;
  updateById: any;
  onFinish: (values: IStudent) => void;
  studentInfo: IStudent;
  loadingEffects: ILoadingEffects;
  classTypeSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
  styleSearch: () => void;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const StudentFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});

  const studentId: string = get(props, 'Sidepanel.studentId', '');

  const isLoadingGet = get(props, 'loadingEffects.StudentForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.StudentForm/updateById', false);

  useEffect(() => {
    props.getById(studentId);
    props.classTypeSearch();
    props.classesSearch();
    props.eventSearch();
    props.styleSearch();
  }, []);

  const onFinish = (values: IStudent) => {
    props.updateById({ values, studentId, queryParams });
  };

  const classTypeList = get(props, 'classTypeList', []);
  const classesList = get(props, 'classesList', []);
  const eventList = get(props, 'eventList', []);
  const styleList = get(props, 'styleList', []);

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <StudentForm
      onFinish={onFinish}
      initialValues={props.studentInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
      classTypeList={classTypeList}
      classesList={classesList}
      eventList={eventList}
      styleList={styleList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  Sidepanel: state.Sidepanel,
  studentInfo: state.StudentForm.studentInfo,
  loadingEffects: state.loading.effects,
  classTypeList: state.StudentForm.classTypeList,
  classesList: state.StudentForm.classesList,
  eventList: state.StudentForm.eventList,
  styleList: state.StudentForm.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'StudentForm/reset' }),
  updateById: (payload: IStudent) => dispatch({ type: 'StudentForm/updateById', payload }),
  getById: (studentId: string) => dispatch({ type: 'StudentForm/getById', payload: studentId }),
  classTypeSearch: () => dispatch({ type: 'StudentForm/classTypeSearch' }),
  classesSearch: () => dispatch({ type: 'StudentForm/classesSearch' }),
  eventSearch: () => dispatch({ type: 'StudentForm/eventSearch' }),
  styleSearch: () => dispatch({ type: 'StudentForm/styleSearch' }),
});

// @ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentFormEditWrapper));
