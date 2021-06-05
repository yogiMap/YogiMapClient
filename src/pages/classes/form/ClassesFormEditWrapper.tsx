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
  classTypeSearch: () => void;
  teacherAccountGetById: (teacherAccountId: string) => void;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ClassesFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const classesId: string = get(props, 'sidepanel.classesId', '');

  const isLoadingGet = get(props, 'loadingEffects.ClassesForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.ClassesForm/updateById', false);
  const styleList = get(props, 'styleList', []);
  const classTypeList = get(props, 'classTypeList', []);
  const teacherAccountInfo = get(props, 'teacherAccountInfo', []);
  const teacherAccountId = get(props, 'TeacherAccountId', '');
  const classesInfo = get(props, 'classesInfo', {});

  if (!teacherAccountId) return null;
  //
  // if (!classesInfo) { // @ts-ignore
  //   setTimeout(classesInfo, 20000)}

  console.log(classesInfo, '+++++++++++**************');

  useEffect(() => {
    props.getById(classesId);
    props.teacherAccountGetById(teacherAccountId);
    props.styleSearch();
    props.classTypeSearch();
  }, []);

  const onFinish = (values: IClasses) => {
    props.updateById({ values, classesId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <ClassesForm
      onFinish={onFinish}
      // initialValues={classesInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
      styleList={styleList}
      classTypeList={classTypeList}
      teacherAccountInfo={teacherAccountInfo}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  classesInfo: state.ClassesForm.classesInfo,
  loadingEffects: state.loading.effects,
  styleList: state.ClassesForm.styleList,
  classTypeList: state.ClassesForm.classTypeList,
  teacherAccountInfo: state.ClassesForm.teacherAccountInfo,
  TeacherAccountId: state.Account.teacherAccount,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'ClassesForm/reset' }),
  updateById: (payload: IClasses) => dispatch({ type: 'ClassesForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'ClassesForm/getById', payload }),
  styleSearch: () => dispatch({ type: 'ClassesForm/styleSearch' }),
  classTypeSearch: () => dispatch({ type: 'ClassesForm/classTypeSearch' }),
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'ClassesForm/teacherAccountGetById', payload: teacherAccountId }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClassesFormEditWrapper));

export class IClassesUpdate {}
