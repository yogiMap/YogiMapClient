import React from 'react';
import { connect } from 'umi';
import { IStudent } from '@/pages/student/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import StudentCreateWrapper from '@/pages/student/form/StudentCreateWrapper';
import StudentEditWrapper from '@/pages/student/form/StudentEditWrapper';

interface IProps {
  create: (arg: IStudent) => void;
  loadingEffects: ILoadingEffects;

  studentGetById: (studentId: string) => void;
  getById: (studentId: string) => void;
  updateById: (payload: IStudent) => void;
}

const StudentAccountSettingsView = (props: IProps) => {
  const hasTeacher = get(props, 'Account.student', '');

  return !hasTeacher ? <StudentCreateWrapper /> : <StudentEditWrapper />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IStudent) => dispatch({ type: 'StudentForm/create', payload }),
  getById: (studentId: string) => dispatch({ type: 'StudentForm/getById', payload: studentId }),
  updateById: (payload: IStudent) => dispatch({ type: 'StudentForm/updateById', payload }),

  studentGetById: (studentId: string) => dispatch({ type: 'StudentView/studentGetById', payload: studentId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentAccountSettingsView);