import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import ClassesForm from '@/pages/classes/form/ClassesForm';
import { IClasses } from '@/pages/classes/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (classesId: string) => void;
  reset: () => void;
  updateById: any;
  classesInfo: IClasses;
  loadingEffects: ILoadingEffects;
  styleSearch: () => void;
  teacherSearch: () => void;
  classTypeSearch: () => void;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ClassesFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const classesId: string = get(props, 'sidepanel.classesId', '');

  const isLoadingGet = get(props, 'loadingEffects.ClassesForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.ClassesForm/updateById', false);
  const styleList = get(props, 'styleList', []);
  const teacherList = get(props, 'teacherList', []);
  const classTypeList = get(props, 'classTypeList', []);

  useEffect(() => {
    props.getById(classesId);
    props.styleSearch();
    props.teacherSearch();
    props.classTypeSearch();
  }, []);

  const onFinish = (values: IClasses) => {
    props.updateById({ values, classesId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <ClassesForm
      onFinish={onFinish}
      initialValues={props.classesInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
      styleList={styleList}
      teacherList={teacherList}
      classTypeList={classTypeList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  classesInfo: state.ClassesForm.classesInfo,
  loadingEffects: state.loading.effects,
  styleList: state.ClassesForm.styleList,
  teacherList: state.ClassesForm.teacherList,
  classTypeList: state.ClassesForm.classTypeList,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'ClassesForm/reset' }),
  updateById: (payload: IClasses) => dispatch({ type: 'ClassesForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'ClassesForm/getById', payload }),
  styleSearch: () => dispatch({ type: 'ClassesForm/styleSearch' }),
  teacherSearch: () => dispatch({ type: 'ClassesForm/teacherSearch' }),
  classTypeSearch: () => dispatch({ type: 'ClassesForm/classTypeSearch' }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClassesFormEditWrapper));
