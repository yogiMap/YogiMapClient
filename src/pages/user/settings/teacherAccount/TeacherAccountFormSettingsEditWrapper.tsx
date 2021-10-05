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
  classTypeSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
  styleSearch: () => void;
}

interface IProps {
  getById: (teacherAccountId: string) => void;
  updateById: (arg: any) => void;
  teacherAccountGetById: (teacherAccountId: string) => void;
  submitButtonText: string;
  initialValues?: ITeacherAccount;
  teacherAccountInfo: ITeacherAccount;
  loadingEffects: ILoadingEffects;
  onFinish: (values: ITeacherAccount) => void;
  classTypeSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
  styleSearch: () => void;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const TeacherAccountFormSettingsEditWrapper = (props: IProps) => {
  const teacherAccountId = get(props, 'TeacherAccountId');
  const queryParams = get(props, 'location.query', {});
  const isLoadingGet = get(props, 'loadingEffects.TeacherAccount/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.TeacherAccount/updateById', false);

  useEffect(() => {
    props.teacherAccountGetById(teacherAccountId);
    props.getById(teacherAccountId);
    props.classTypeSearch();
    props.classesSearch();
    props.eventSearch();
    props.styleSearch();
  }, []);

  const onFinish = (values: ITeacherAccount) => {
    props.updateById({ values, teacherAccountId, queryParams });
  };
  const classTypeList = get(props, 'classTypeList', []);
  const classesList = get(props, 'classesList', []);
  const eventList = get(props, 'eventList', []);
  const styleList = get(props, 'styleList', []);

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  // @ts-ignore
  return (
    <TeacherAccountForm
      onFinish={onFinish}
      initialValues={props.teacherAccountInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
      classTypeList={classTypeList}
      classesList={classesList}
      eventList={eventList}
      styleList={styleList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  TeacherAccount: state.TeacherAccount,
  TeacherAccountId: state.User.teacherAccount,
  loadingEffects: state.loading.effects,
  classTypeList: state.TeacherAccount.classTypeList,
  classesList: state.TeacherAccount.classesList,
  eventList: state.TeacherAccount.eventList,
  styleList: state.TeacherAccount.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccount/teacherAccountGetById', payload: teacherAccountId }),
  getById: (teacherAccountId: string) => dispatch({ type: 'TeacherAccount/getById', payload: teacherAccountId }),
  updateById: (payload: ITeacherAccountUpdate) => dispatch({ type: 'TeacherAccount/updateById', payload }),
  classTypeSearch: () => dispatch({ type: 'TeacherAccount/classTypeSearch' }),
  classesSearch: () => dispatch({ type: 'TeacherAccount/classesSearch' }),
  eventSearch: () => dispatch({ type: 'TeacherAccount/eventSearch' }),
  styleSearch: () => dispatch({ type: 'TeacherAccount/styleSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountFormSettingsEditWrapper);
