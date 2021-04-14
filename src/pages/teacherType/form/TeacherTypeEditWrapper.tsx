import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import TeacherTypeForm from '@/pages/teacherType/form/TeacherTypeForm';
import { ITeacherType } from '@/pages/teacherType/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (teacherTypeId: string) => void;
  reset: () => void;
  updateById: any;
  teacherTypeInfo: ITeacherType;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const TeacherTypeEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const teacherTypeId: string = get(props, 'sidepanel.teacherTypeId', '');

  const isLoadingGet = get(props, 'loadingEffects.TeacherTypeForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.TeacherTypeForm/updateById', false);

  useEffect(() => {
    props.getById(teacherTypeId);
  }, []);

  const onFinish = (values: ITeacherType) => {
    props.updateById({ values, teacherTypeId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <TeacherTypeForm
      onFinish={onFinish}
      initialValues={props.teacherTypeInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  teacherTypeInfo: state.TeacherTypeForm.teacherTypeInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'TeacherTypeForm/reset' }),
  updateById: (payload: ITeacherType) => dispatch({ type: 'TeacherTypeForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'TeacherTypeForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherTypeEditWrapper));
