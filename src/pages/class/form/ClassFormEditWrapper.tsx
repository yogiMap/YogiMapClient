import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import ClassForm from '@/pages/class/form/ClassForm';
import { IClass } from '@/pages/class/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (classId: string) => void;
  reset: () => void;
  updateById: any;
  classInfo: IClass;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ClassFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const classId: string = get(props, 'sidepanel.classId', '');

  const isLoadingGet = get(props, 'loadingEffects.ClassForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.ClassForm/updateById', false);

  useEffect(() => {
    props.getById(classId);
  }, []);

  const onFinish = (values: IClass) => {
    props.updateById({ values, classId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <ClassForm
      onFinish={onFinish}
      initialValues={props.classInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  classInfo: state.ClassForm.classInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'ClassForm/reset' }),
  updateById: (payload: IClass) => dispatch({ type: 'ClassForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'ClassForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClassFormEditWrapper));
