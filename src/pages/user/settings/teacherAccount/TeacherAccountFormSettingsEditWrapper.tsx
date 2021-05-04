import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ITeacherAccount, ITeacherAccountQueryParams } from '@/pages/teacherAccount/types';
import TeacherAccountForm from '@/pages/teacherAccount/form/TeacherAccountForm';
import { ILoadingEffects } from '@/types';

export interface ITeacherAccountUpdate {
  values: ITeacherAccount;
  teacherAccountId: string;
  queryParams: ITeacherAccountQueryParams;
}

interface IProps {
  getById: (teacherAccountId: string) => void;
  updateById: (arg: any) => void;
  teacherAccountGetById: (teacherAccountId: string) => void;
  teacherAccountInfo: ITeacherAccount;
  loadingEffects: ILoadingEffects;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const TeacherAccountFormSettingsEditWrapper = (props: IProps) => {
  const teacherAccountId = get(props, 'TeacherAccountId');
  const queryParams = get(props, 'location.query', {});
  const isLoadingGet = get(props, 'loadingEffects.TeacherAccountForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.TeacherAccountForm/updateById', false);

  useEffect(() => {
    props.teacherAccountGetById(teacherAccountId);
    props.getById(teacherAccountId);
  }, []);

  const onFinish = (values: ITeacherAccount) => {
    props.updateById({ values, teacherAccountId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <TeacherAccountForm
      onFinish={onFinish}
      initialValues={props.teacherAccountInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  TeacherAccountView: state.TeacherAccountView,
  TeacherAccountId: state.Account.teacherAccount,
  teacherAccountInfo: state.TeacherAccountForm.teacherAccountInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccountView/teacherAccountGetById', payload: teacherAccountId }),
  getById: (teacherAccountId: string) => dispatch({ type: 'TeacherAccountForm/getById', payload: teacherAccountId }),
  updateById: (payload: ITeacherAccountUpdate) => dispatch({ type: 'TeacherAccountForm/updateById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountFormSettingsEditWrapper);
