import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import RenderPhoneNumber from '@/pages/utils/phone/phoneNumberRendering/PhoneNumbersRendering';
import { Tag } from 'antd';
import StudentAccountViewClassesList from '@/pages/studentAccount/view/StudentAccountViewClassesList';
import StudentAccountViewEventList from '@/pages/studentAccount/view/StudentAccountViewEventList';
import StudentAccountViewAddressList from '@/pages/studentAccount/view/StudentAccountViewAddressList';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  studentAccountId: string;
  name: string;
  studentAccountGetById: (studentAccountId: string) => void;
  Account: IUserAccount;
}

const StudentAccountView = (props: IProps) => {
  const studentAccountId = get(props, 'match.params.studentAccountId');
  const teacherName = get(props, 'StudentAccountView.teacherName', '');
  const email = get(props, 'Account.email', '');
  const phone: any = get(props, 'StudentAccountView.phoneNumber.number', '');

  const name = get(props, 'StudentAccountView.name', '');
  const classTypeObject = get(props, 'StudentAccountView.classType', {});
  const classType = Object.values(classTypeObject);
  const focusObject = get(props, 'StudentAccountView.focus', {});
  const YogaStyleObject = get(props, 'StudentAccountView.style', {});
  console.log(event);

  useEffect(() => {
    props.studentAccountGetById(studentAccountId);
  }, []);

  return (
    <div>
      <div className="container">
        <h1 className="text-center">{name}</h1>
        <h6>Email: {email}</h6>
        <h6>
          Phone:
          <RenderPhoneNumber phoneNumberAll={get(props, 'StudentAccountView.phoneNumber', {})} />
        </h6>

        <div className="py-5">
          <h3>Address</h3>
          <div>
            <StudentAccountViewAddressList />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  StudentAccountView: state.StudentAccountView,
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  studentAccountGetById: (studentAccountId: string) =>
    dispatch({ type: 'StudentAccountView/studentAccountGetById', payload: studentAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentAccountView);
