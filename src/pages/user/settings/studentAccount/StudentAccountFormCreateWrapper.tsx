import React, { useEffect } from 'react';
import { connect } from 'umi';
import StudentAccountForm from '@/pages/studentAccount/form/StudentAccountForm';
import { IStudentAccount } from '@/pages/studentAccount/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IStudentAccount) => void;
  loadingEffects: ILoadingEffects;
  onFinish: (values: IStudentAccount) => void;
  initialValues?: IStudentAccount;
  studentInfo: IStudentAccount;
  classTypeSearch: () => void;
  styleSearch: () => void;
}

const StudentAccountFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IStudentAccount) => {
    props.create(values);
  };

  useEffect(() => {
    props.classTypeSearch();
    props.styleSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.StudentAccountForm/create', false);
  const classTypeList = get(props, 'classTypeList', []);
  const styleList = get(props, 'styleList', []);

  // @ts-ignore
  return (
    <StudentAccountForm
      onFinish={onFinish}
      submitButtonText="Create Student`s Account"
      isLoading={isLoading}
      classTypeList={classTypeList}
      styleList={styleList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  classTypeList: state.StudentAccountForm.classTypeList,
  styleList: state.StudentAccountForm.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IStudentAccount) => dispatch({ type: 'StudentAccountForm/create', payload }),
  classTypeSearch: () => dispatch({ type: 'StudentAccountForm/classTypeSearch' }),
  styleSearch: () => dispatch({ type: 'StudentAccountForm/styleSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentAccountFormCreateWrapper);
