import React, { useEffect } from 'react';
import { connect } from 'umi';
import EventForm from '@/pages/event/form/EventForm';
import { IEvent } from '@/pages/event/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IEvent) => void;
  loadingEffects: ILoadingEffects;
  styleSearch: () => void;
  classTypeSearch: () => void;
  teacherAccountGetById: (teacherAccountId: string) => void;
}

const EventFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IEvent) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.EventForm/create', false);
  const styleList = get(props, 'styleList', []);
  const teacherAccountList = get(props, 'teacherAccountList', []);
  const classTypeList = get(props, 'classTypeList', []);
  const teacherAccountInfo = get(props, 'teacherAccountInfo', []);
  const teacherAccountId = get(props, 'TeacherAccountId', '');

  useEffect(() => {
    props.teacherAccountGetById(teacherAccountId);
    props.styleSearch();
    props.classTypeSearch();
  }, []);

  return (
    <EventForm
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
  styleList: state.EventForm.styleList,
  classTypeList: state.EventForm.classTypeList,
  teacherAccountInfo: state.ClassesForm.teacherAccountInfo,
  TeacherAccountId: state.Account.teacherAccount,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IEvent) => dispatch({ type: 'EventForm/create', payload }),
  styleSearch: () => dispatch({ type: 'EventForm/styleSearch' }),
  classTypeSearch: () => dispatch({ type: 'EventForm/classTypeSearch' }),
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'ClassesForm/teacherAccountGetById', payload: teacherAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventFormCreateWrapper);
