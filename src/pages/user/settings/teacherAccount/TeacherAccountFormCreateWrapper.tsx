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
  classesSearch: () => void;
  eventSearch: () => void;
  styleSearch: () => void;
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
  const classTypeList = get(props, 'classTypeList', []);
  const classesList = get(props, 'classesList', []);
  const eventList = get(props, 'eventList', []);
  const styleList = get(props, 'styleList', []);

  // @ts-ignore
  return <TeacherAccountForm
    onFinish={onFinish}
    submitButtonText="Create Teacher Account"
    isLoading={isLoading}
    classTypeList={classTypeList}
    classesList={classesList}
    eventList={eventList}
    styleList={styleList}
  />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  classTypeList: state.TeacherAccountForm.classTypeList,
  classesList: state.TeacherAccountForm.classesList,
  eventList: state.TeacherAccountForm.eventList,
  styleList: state.TeacherAccountForm.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: ITeacherAccount) => dispatch({ type: 'TeacherAccountForm/create', payload }),
  classTypeSearch: () => dispatch({ type: 'TeacherAccountForm/classTypeSearch' }),
  classesSearch: () => dispatch({ type: 'TeacherAccountForm/classesSearch' }),
  eventSearch: () => dispatch({ type: 'TeacherAccountForm/eventSearch' }),
  styleSearch: () => dispatch({ type: 'TeacherAccountForm/styleSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountFormCreateWrapper);
