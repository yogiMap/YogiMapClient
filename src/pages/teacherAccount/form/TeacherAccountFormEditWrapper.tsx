import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import TeacherAccountForm from '@/pages/teacherAccount/form/TeacherAccountForm';
import { ITeacherAccount } from '@/pages/teacherAccount/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (teacherAccountId: string) => void;
  reset: () => void;
  updateById: any;
  onFinish: (values: ITeacherAccount) => void;
  teacherAccountInfo: ITeacherAccount;
  loadingEffects: ILoadingEffects;
  classTypeSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
  styleSearch: () => void;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const TeacherAccountFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const teacherAccountInfo = get(props, 'TeacherAccount', {});
  const teacherAccountId: string = get(props, 'Sidepanel.teacherAccountId', '');

  const isLoadingGet = get(props, 'loadingEffects.TeacherAccount/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.TeacherAccount/updateById', false);

  useEffect(() => {
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
  if (isEmpty(teacherAccountInfo)) return null;

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
  Sidepanel: state.Sidepanel,
  TeacherAccount: state.TeacherAccount,
  loadingEffects: state.loading.effects,
  classTypeList: state.TeacherAccount.classTypeList,
  classesList: state.TeacherAccount.classesList,
  eventList: state.TeacherAccount.eventList,
  styleList: state.TeacherAccount.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'TeacherAccountForm/reset' }),
  updateById: (payload: ITeacherAccount) => dispatch({ type: 'TeacherAccount/updateById', payload }),
  getById: (teacherAccountId: string) => dispatch({ type: 'TeacherAccount/getById', payload: teacherAccountId }),
  classTypeSearch: () => dispatch({ type: 'TeacherAccount/classTypeSearch' }),
  classesSearch: () => dispatch({ type: 'TeacherAccount/classesSearch' }),
  eventSearch: () => dispatch({ type: 'TeacherAccount/eventSearch' }),
  styleSearch: () => dispatch({ type: 'TeacherAccount/styleSearch' }),
});

// @ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherAccountFormEditWrapper));
