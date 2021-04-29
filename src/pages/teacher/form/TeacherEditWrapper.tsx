import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import TeacherForm from '@/pages/teacher/form/TeacherForm';
import { ITeacher } from '@/pages/teacher/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (teacherId: string) => void;
  reset: () => void;
  teacherTypeSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
  styleSearch: () => void;
  updateById: any;
  teacherInfo: ITeacher;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const TeacherEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const teacherId: string = get(props, 'sidepanel.teacherId', '');

  const isLoadingGet = get(props, 'loadingEffects.TeacherForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.TeacherForm/updateById', false);
  const teacherTypeList = get(props, "teacherTypeList", []);
  const classesList = get(props, 'classesList', []);
  const eventList = get(props, 'eventList', []);
  const styleList = get(props, 'styleList', []);


  useEffect(() => {
    props.getById(teacherId);
    props.teacherTypeSearch();
    props.classesSearch();
    props.eventSearch();
    props.styleSearch();
  }, []);

  const onFinish = (values: ITeacher) => {
    props.updateById({ values, teacherId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <TeacherForm
      onFinish={onFinish}
      initialValues={props.teacherInfo}
      submitButtonText="Update"
      teacherTypeList={teacherTypeList}
      classesList={classesList}
      eventList={eventList}
      styleList={styleList}
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  teacherInfo: state.TeacherForm.teacherInfo,
  loadingEffects: state.loading.effects,
  teacherTypeList: state.TeacherForm.teacherList,
  classesList: state.TeacherForm.classesList,
  eventList: state.TeacherForm.eventList,
  styleList: state.TeacherForm.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'TeacherForm/reset' }),
  updateById: (payload: ITeacher) => dispatch({ type: 'TeacherForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'TeacherForm/getById', payload }),
  teacherTypeSearch: () => dispatch({type: 'TeacherForm/teacherTypeSearch'}),
  classesSearch: () => dispatch({ type: 'TeacherForm/classesSearch' }),
  eventSearch: () => dispatch({ type: 'TeacherForm/eventSearch' }),
  styleSearch: () => dispatch({ type: 'TeacherForm/styleSearch' }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherEditWrapper));
