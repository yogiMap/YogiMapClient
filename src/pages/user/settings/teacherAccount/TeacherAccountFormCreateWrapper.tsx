import React, { useEffect } from 'react';
import { connect } from 'umi';
import TeacherAccountForm from '@/pages/teacherAccount/form/TeacherAccountForm';
import { ITeacherAccount } from '@/pages/teacherAccount/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: ITeacherAccount) => void;
  loadingEffects: ILoadingEffects;
  onFinish: (values: ITeacherAccount) => void;
  initialValues?: ITeacherAccount;
  teacherAccountInfo: ITeacherAccount;
  classTypeSearch: () => void;
  styleSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
}

const TeacherAccountFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: ITeacherAccount) => {
    props.create(values);
  };

  useEffect(() => {
    props.classTypeSearch();
    props.classesSearch();
    props.eventSearch();
    props.styleSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.TeacherAccountForm/create', false);
  const classesList = get(props, 'classesList', []);
  const eventList = get(props, 'eventList', []);
  const classTypeList = get(props, 'classTypeList', []);
  const styleList = get(props, 'styleList', []);

  // @ts-ignore
  return (
    <TeacherAccountForm
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
  classesList: state.TeacherAccountForm.classesList,
  eventList: state.TeacherAccountForm.eventList,
  classTypeList: state.TeacherAccountForm.classTypeList,
  styleList: state.TeacherAccountForm.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: ITeacherAccount) => dispatch({ type: 'TeacherAccountForm/create', payload }),
  classesSearch: () => dispatch({ type: 'TeacherAccountForm/classesSearch' }),
  eventSearch: () => dispatch({ type: 'TeacherAccountForm/eventSearch' }),
  classTypeSearch: () => dispatch({ type: 'TeacherAccountForm/classTypeSearch' }),
  styleSearch: () => dispatch({ type: 'TeacherAccountForm/styleSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountFormCreateWrapper);
