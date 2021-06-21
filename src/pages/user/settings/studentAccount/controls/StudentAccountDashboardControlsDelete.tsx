import React from 'react';
import { connect } from 'umi';
import { Button, Modal } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { IStudentAccount, IStudentAccountQueryParams } from '@/pages/studentAccount/types';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IStudentAccountDeleteById {
  studentId: string;
  queryParams: IStudentAccountQueryParams;
}

interface IProps {
  open: (arg: ISidepanel) => void;
  row: IStudentAccount;
  studentDeleteById: (arg: { studentAccountId: string; queryParams: IStudentAccountQueryParams }) => void;
  queryParams: IStudentAccountQueryParams;
  Account: IUserAccount;
  studentInfo: IStudentAccount;
}

const StudentAccountDashboardControlsDelete = (props: IProps) => {
  const { row, queryParams } = props;
  const studentAccountId = get(props, 'studentAccountInfo._id', '');

  const deletePrompt = (studentAccount: IStudentAccount) => {
    const name = get(props, 'studentAccountInfo.name', '');
    Modal.confirm({
      title: `Do You Want To Delete Your Account?`,
      content: `${name}`,
      okType: 'danger',
      onOk: () => props.studentDeleteById({ studentAccountId: studentAccount._id, queryParams }),
    });
  };

  const isUserAuth = get(props, 'Account._id');

  return (
    <div role="button-delete">
      {isUserAuth && (
        <Button className="btn btn-outline-secondary" shape="round" onClick={() => deletePrompt(studentAccountId)}>
          Delete Account
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
  studentAccountInfo: state.StudentAccountForm.studentAccountInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'StudentForm/reset' }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  studentAccountDeleteById: (payload: IStudentAccountDeleteById) =>
    dispatch({ type: 'StudentAccountDashboard/studentAccountDeleteById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentAccountDashboardControlsDelete);
