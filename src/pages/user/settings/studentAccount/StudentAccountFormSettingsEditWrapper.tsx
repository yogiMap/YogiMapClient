import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { IStudentAccount, IStudentAccountQueryParams } from '@/pages/studentAccount/types';
import StudentAccountForm from '@/pages/studentAccount/form/StudentAcoountForm';
import { ILoadingEffects } from '@/types';

export interface IStudentAccountUpdate {
  values: IStudentAccount;
  studentAccountId: string;
  queryParams: IStudentAccountQueryParams;
  classTypeSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
  styleSearch: () => void;
}

interface IProps {
  getById: (studentAccountId: string) => void;
  updateById: (arg: any) => void;
  studentAccountGetById: (studentAccountId: string) => void;
  submitButtonText: string;
  initialValues?: IStudentAccount;
  studentAccountInfo: IStudentAccount;
  loadingEffects: ILoadingEffects;
  onFinish: (values: IStudentAccount) => void;
  classTypeSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
  styleSearch: () => void;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const StudentAccountFormSettingsEditWrapper = (props: IProps) => {
  const studentId = get(props, 'StudentId');
  const queryParams = get(props, 'location.query', {});
  const isLoadingGet = get(props, 'loadingEffects.StudentForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.StudentForm/updateById', false);

  useEffect(() => {
    props.studentAccountGetById(studentId);
    props.getById(studentId);
    props.classTypeSearch();
    props.styleSearch();
  }, []);

  const onFinish = (values: IStudentAccount) => {
    props.updateById({ values, studentId, queryParams });
  };
  const classTypeList = get(props, 'classTypeList', []);
  const styleList = get(props, 'styleList', []);

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  // @ts-ignore
  return (
    <StudentAccountForm
      onFinish={onFinish}
      initialValues={props.studentAccountInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
      classTypeList={classTypeList}
      styleList={styleList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  StudentAccountView: state.StudentAccountView,
  StudentAccountId: state.Account.studentAccount,
  studentAccountInfo: state.StudentAccountForm.studentAccountInfo,
  loadingEffects: state.loading.effects,
  classTypeList: state.StudentAccountForm.classTypeList,
  styleList: state.StudentAccountForm.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  studentAccountGetById: (studentAccountId: string) =>
    dispatch({ type: 'StudentAccountView/studentAccountGetById', payload: studentAccountId }),
  getById: (studentAccountId: string) => dispatch({ type: 'StudentAccountForm/getById', payload: studentAccountId }),
  updateById: (payload: IStudentAccountUpdate) => dispatch({ type: 'StudentAccountForm/updateById', payload }),
  classTypeSearch: () => dispatch({ type: 'StudentAccountForm/classTypeSearch' }),
  styleSearch: () => dispatch({ type: 'StudentAccountForm/styleSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentAccountFormSettingsEditWrapper);
