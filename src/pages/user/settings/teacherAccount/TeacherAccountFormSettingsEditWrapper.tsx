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
  TeacherAccountView: state.TeacherAccountView,
  TeacherAccountId: state.Account.teacherAccount,
  teacherAccountInfo: state.TeacherAccountForm.teacherAccountInfo,
  loadingEffects: state.loading.effects,
  classTypeList: state.TeacherAccountForm.classTypeList,
  classesList: state.TeacherAccountForm.classesList,
  eventList: state.TeacherAccountForm.eventList,
  styleList: state.TeacherAccountForm.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccountView/teacherAccountGetById', payload: teacherAccountId }),
  getById: (teacherAccountId: string) => dispatch({ type: 'TeacherAccountForm/getById', payload: teacherAccountId }),
  updateById: (payload: ITeacherAccountUpdate) => dispatch({ type: 'TeacherAccountForm/updateById', payload }),
  classTypeSearch: () => dispatch({ type: 'TeacherAccountForm/classTypeSearch' }),
  classesSearch: () => dispatch({ type: 'TeacherAccountForm/classesSearch' }),
  eventSearch: () => dispatch({ type: 'TeacherAccountForm/eventSearch' }),
  styleSearch: () => dispatch({ type: 'TeacherAccountForm/styleSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountFormSettingsEditWrapper);
