import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import TeacherAccountForm from '@/pages/teacherAccount/form/TeacherAccountForm';
import { ITeacherAccount } from '@/pages/teacherAccount/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (teacherAccountId: string) => void;
  reset: () => void;
  updateById: any;
  teacherAccountInfo: ITeacherAccount;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const TeacherAccountFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});

  const teacherAccountId: string = get(props, 'Sidepanel.teacherAccountId', '');

  const isLoadingGet = get(props, 'loadingEffects.TeacherAccountForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.TeacherAccountForm/updateById', false);

  useEffect(() => {
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
  Sidepanel: state.Sidepanel,
  teacherAccountInfo: state.TeacherAccountForm.teacherAccountInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'TeacherAccountForm/reset' }),
  updateById: (payload: ITeacherAccount) => dispatch({ type: 'TeacherAccountForm/updateById', payload }),
  getById: (teacherAccountId: string) => dispatch({ type: 'TeacherAccountForm/getById', payload: teacherAccountId }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherAccountFormEditWrapper));
