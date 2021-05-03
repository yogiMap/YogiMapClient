import React, { useEffect } from 'react';
import { connect } from 'umi';
import TeacherForm from '@/pages/teacher/form/TeacherForm';
import { ITeacher } from '@/pages/teacher/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: ITeacher) => void;
  classTypeSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
  styleSearch: () => void;
  loadingEffects: ILoadingEffects;
}

const TeacherCreateWrapper = (props: IProps) => {
  const onFinish = (values: ITeacher) => {
    props.create(values);
  };

  useEffect(() => {
    props.classTypeSearch();
    props.classesSearch();
    props.eventSearch();
    props.styleSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.TeacherForm/create', false);
  const classTypeList = get(props, 'classTypeList', []);
  const classesList = get(props, 'classesList', []);
  const eventList = get(props, 'eventList', []);
  const styleList = get(props, 'styleList', []);

  return (
    <TeacherForm
      onFinish={onFinish}
      submitButtonText="Create"
      isLoading={isLoading}
      classTypeList={classTypeList}
      classesList={classesList}
      eventList={eventList}
      styleList={styleList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  classTypeList: state.TeacherForm.classTypeList,
  classesList: state.TeacherForm.classesList,
  eventList: state.TeacherForm.eventList,
  styleList: state.TeacherForm.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: ITeacher) => dispatch({ type: 'TeacherForm/create', payload }),
  classTypeSearch: () => dispatch({ type: 'TeacherForm/classTypeSearch' }),
  classesSearch: () => dispatch({ type: 'TeacherForm/classesSearch' }),
  eventSearch: () => dispatch({ type: 'TeacherForm/eventSearch' }),
  styleSearch: () => dispatch({ type: 'TeacherForm/styleSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCreateWrapper);
