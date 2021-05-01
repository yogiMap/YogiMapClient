import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import ClassTypeForm from '@/pages/classType/form/ClassTypeForm';
import { IClassType } from '@/pages/classType/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (classTypeId: string) => void;
  reset: () => void;
  updateById: any;
  classTypeInfo: IClassType;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ClassTypeEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const classTypeId: string = get(props, 'sidepanel.classTypeId', '');

  const isLoadingGet = get(props, 'loadingEffects.ClassTypeForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.ClassTypeForm/updateById', false);

  useEffect(() => {
    props.getById(classTypeId);
  }, []);

  const onFinish = (values: IClassType) => {
    props.updateById({ values, classTypeId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <ClassTypeForm
      onFinish={onFinish}
      initialValues={props.classTypeInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  classTypeInfo: state.ClassTypeForm.classTypeInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'ClassTypeForm/reset' }),
  updateById: (payload: IClassType) => dispatch({ type: 'ClassTypeForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'ClassTypeForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClassTypeEditWrapper));
