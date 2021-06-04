import React, { useEffect } from 'react';
import { connect } from 'umi';
import StudentForm from '@/pages/student/form/StudentForm';
import { IStudent } from '@/pages/student/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IStudent) => void;
  loadingEffects: ILoadingEffects;
  onFinish: (values: IStudent) => void;
  initialValues?: IStudent;
  studentInfo: IStudent;
  classTypeSearch: () => void;
  styleSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
}

const StudentFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IStudent) => {
    props.create(values);
  };

  useEffect(() => {
    props.classTypeSearch();
    props.classesSearch();
    props.eventSearch();
    props.styleSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.StudentForm/create', false);
  const classesList = get(props, 'classesList', []);
  const eventList = get(props, 'eventList', []);
  const classTypeList = get(props, 'classTypeList', []);
  const styleList = get(props, 'styleList', []);

  // @ts-ignore
  return (
    <StudentForm
      onFinish={onFinish}
      submitButtonText="Create Teacher`s Account"
      isLoading={isLoading}
      classesList={classesList}
      eventList={eventList}
      classTypeList={classTypeList}
      styleList={styleList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  classesList: state.StudentForm.classesList,
  eventList: state.StudentForm.eventList,
  classTypeList: state.StudentForm.classTypeList,
  styleList: state.StudentForm.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IStudent) => dispatch({ type: 'StudentForm/create', payload }),
  classesSearch: () => dispatch({ type: 'StudentForm/classesSearch' }),
  eventSearch: () => dispatch({ type: 'StudentForm/eventSearch' }),
  classTypeSearch: () => dispatch({ type: 'StudentForm/classTypeSearch' }),
  styleSearch: () => dispatch({ type: 'StudentForm/styleSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentFormCreateWrapper);
