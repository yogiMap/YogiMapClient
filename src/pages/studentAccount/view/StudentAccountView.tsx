import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import StudentAccountViewAddressList from '@/pages/studentAccount/view/StudentAccountViewAddressList';
import { IUserAccount } from '@/pages/user/userSearch/types';
import PhoneNumberCall from '@/pages/telephony/PhoneNumberCall';

interface IProps {
  studentAccountId: string;
  name: string;
  studentAccountGetById: (studentAccountId: string) => void;
  User: IUser;
}

const StudentAccountView = (props: IProps) => {
  const studentAccountId = get(props, 'match.params.studentAccountId');
  const teacherName = get(props, 'StudentAccount.teacherName', '');
  const email = get(props, 'Account.email', '');
  const phone: any = get(props, 'StudentAccount.phoneNumber.number', '');

  const name = get(props, 'StudentAccount.name', '');
  const classTypeObject = get(props, 'StudentAccount.classType', {});
  const classType = Object.values(classTypeObject);
  const focusObject = get(props, 'StudentAccount.focus', {});
  const YogaStyleObject = get(props, 'StudentAccount.style', {});

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
          <PhoneNumberCall phoneNumber={get(props, 'StudentAccount.phoneNumber', {})} />
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
  StudentAccount: state.StudentAccountView,
  User: state.User,
});

const mapDispatchToProps = (dispatch: any) => ({
  studentAccountGetById: (studentAccountId: string) =>
    dispatch({ type: 'StudentAccountView/studentAccountGetById', payload: studentAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentAccountView);
