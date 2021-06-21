import React from 'react';
import { connect } from 'umi';
import { Button, Modal } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { IStudent, IStudentQueryParams } from '@/pages/studentAccount/types';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IStudentDeleteById {
  studentId: string;
  queryParams: IStudentQueryParams;
}

interface IProps {
  open: (arg: ISidepanel) => void;
  row: IStudent;
  studentDeleteById: (arg: IStudentDeleteById) => void;
  queryParams: IStudentQueryParams;
  Account: IUserAccount;
  studentInfo: IStudent;
}

const StudentAccountDashboardControlsDelete = (props: IProps) => {
  const { row, queryParams } = props;
  const studentId = get(props, 'studentInfo._id', '');

  const deletePrompt = (student: IStudent) => {
    const name = get(props, 'studentInfo.name', '');
    Modal.confirm({
      title: `Do You Want To Delete Your Account?`,
      content: `${name}`,
      okType: 'danger',
      onOk: () => props.studentDeleteById({ studentId: student._id, queryParams }),
    });
  };

  const isUserAuth = get(props, 'Account._id');

  return (
    <div role="button-delete">
      {isUserAuth && (
        <Button className="btn btn-outline-secondary" shape="round" onClick={() => deletePrompt(studentId)}>
          Delete Account
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
  studentInfo: state.StudentForm.studentInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'StudentForm/reset' }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  studentDeleteById: (payload: IStudentDeleteById) => dispatch({ type: 'StudentDashboard/studentDeleteById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentAccountDashboardControlsDelete);
