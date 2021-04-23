import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import classForm from '@/pages/class/form/classForm';
import { Iclass } from '@/pages/class/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (classId: string) => void;
  reset: () => void;
  updateById: any;
  classInfo: Iclass;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const classFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const classId: string = get(props, 'sidepanel.classId', '');

  const isLoadingGet = get(props, 'loadingEffects.classForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.classForm/updateById', false);

  useEffect(() => {
    props.getById(classId);
  }, []);

  const onFinish = (values: Iclass) => {
    props.updateById({ values, classId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <classForm
      onFinish={onFinish}
      initialValues={props.classInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  classInfo: state.classForm.classInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'classForm/reset' }),
  updateById: (payload: Iclass) => dispatch({ type: 'classForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'classForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(classFormEditWrapper));
