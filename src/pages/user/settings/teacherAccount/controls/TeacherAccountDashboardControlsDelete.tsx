import React from 'react';
import { connect } from 'umi';
import { Button, Modal } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { ITeacherAccount, ITeacherAccountQueryParams } from '@/pages/teacherAccount/types';
import { get } from 'lodash';
import { DeleteOutlined } from '@ant-design/icons';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface ITeacherAccountDeleteById {
  teacherAccountId: string;
  queryParams: ITeacherAccountQueryParams;
}

interface IProps {
  open: (arg: ISidepanel) => void;
  row: ITeacherAccount;
  teacherAccountDeleteById: (arg: ITeacherAccountDeleteById) => void;
  queryParams: ITeacherAccountQueryParams;
  Account: IUserAccount;
  teacherAccountInfo: ITeacherAccount;
}

const TeacherAccountDashboardControlsDelete = (props: IProps) => {
  const { row, queryParams } = props;
  const teacherAccountId = get(props, 'teacherAccountInfo._id', '');

  const deletePrompt = (teacherAccount: ITeacherAccount) => {
    const name = get(props, 'teacherAccountInfo.name', '');
    Modal.confirm({
      title: `Do You Want To Delete Your Account?`,
      content: `${name}`,
      okType: 'danger',
      onOk: () => props.teacherAccountDeleteById({ teacherAccountId: teacherAccount._id, queryParams }),
    });
  };

  // const contextMenuClick = (handler: any, row: ITeacherAccount) => {
  //   if (handler === 'delete') {
  //     deletePrompt(row);
  //   }
  // };

  const isUserAuth = get(props, 'Account._id');

  return (
    <div role="button-delete">
      {isUserAuth && (
        <Button className="btn btn-outline-secondary" shape="round" onClick={() => deletePrompt(teacherAccountId)}>
          Delete Account
        </Button>
      )}
    </div>
    // <Button type="primary" onClick={teacherAccountCreate}>
    //   Delete Teacher Account
    // </Button>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
  teacherAccountInfo: state.TeacherAccountForm.teacherAccountInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'TeacherAccountForm/reset' }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  teacherAccountDeleteById: (payload: ITeacherAccountDeleteById) =>
    dispatch({ type: 'TeacherAccountDashboard/teacherAccountDeleteById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountDashboardControlsDelete);
