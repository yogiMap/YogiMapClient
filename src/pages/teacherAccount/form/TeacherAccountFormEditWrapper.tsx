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

  const teacherAccountId: string = get(props, 'Sidepanel.teacherAccountId', '');

  const isLoadingGet = get(props, 'loadingEffects.TeacherAccountForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.TeacherAccountForm/updateById', false);

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
  teacherAccountInfo: state.TeacherAccountForm.teacherAccountInfo,
  loadingEffects: state.loading.effects,
  classTypeList: state.TeacherAccountForm.classTypeList,
  classesList: state.TeacherAccountForm.classesList,
  eventList: state.TeacherAccountForm.eventList,
  styleList: state.TeacherAccountForm.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'TeacherAccountForm/reset' }),
  updateById: (payload: ITeacherAccount) => dispatch({ type: 'TeacherAccountForm/updateById', payload }),
  getById: (teacherAccountId: string) => dispatch({ type: 'TeacherAccountForm/getById', payload: teacherAccountId }),
  classTypeSearch: () => dispatch({ type: 'TeacherAccountForm/classTypeSearch' }),
  classesSearch: () => dispatch({ type: 'TeacherAccountForm/classesSearch' }),
  eventSearch: () => dispatch({ type: 'TeacherAccountForm/eventSearch' }),
  styleSearch: () => dispatch({ type: 'TeacherAccountForm/styleSearch' }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherAccountFormEditWrapper));
