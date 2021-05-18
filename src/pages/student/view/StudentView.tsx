import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import RenderPhoneNumber from '@/pages/phoneNumberRendering/PhoneNumbersRendering';
import { Tag } from 'antd';
import StudentViewClassesList from '@/pages/student/view/StudentViewClassesList';
import StudentViewEventList from '@/pages/student/view/StudentViewEventList';
import StudentViewAddressList from '@/pages/student/view/StudentViewAddressList';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  studentId: string;
  name: string;
  studentGetById: (studentId: string) => void;
  Account: IUserAccount;
}

const StudentView = (props: IProps) => {
  const studentId = get(props, 'match.params.studentId');
  const teacherName = get(props, 'StudentView.teacherName', '');
  const email = get(props, 'Account.email', '');
  const phone: any = get(props, 'StudentView.phoneNumber.number', '');

  const name = get(props, 'StudentView.name', '');
  const classesObject = get(props, 'StudentView.classes', {});
  const classes: any = Object.values(classesObject);
  const eventObject = get(props, 'StudentView.event', {});
  const event: any = Object.values(eventObject);
  const classTypeObject = get(props, 'StudentView.classType', {});
  const classType = Object.values(classTypeObject);
  const focusObject = get(props, 'StudentView.focus', {});
  const YogaStyleObject = get(props, 'StudentView.style', {});
  console.log(event);

  useEffect(() => {
    props.studentGetById(studentId);
  }, []);

  return (
    <div>
      <div className="container">
        <h1 className="text-center">{name}</h1>
        <h6>Email: {email}</h6>
        <h6>
          Phone:
          <RenderPhoneNumber phoneNumberAll={get(props, 'StudentView.phoneNumber', {})} />
        </h6>

        {/*{classType.map((el: any) => (*/}
        {/*  <h2>{el.name}</h2>*/}
        {/*))}*/}

        <div className="py-5">
          <h3>Address</h3>
          <div>
            <StudentViewAddressList />
          </div>
        </div>

        <h3 className="mt-5">Classes</h3>
        <div>
          <StudentViewClassesList classes={classes} />
        </div>

        <h3 className="mt-5">Events</h3>
        <div>
          <StudentViewEventList event={event} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  StudentView: state.StudentView,
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  studentGetById: (studentId: string) => dispatch({ type: 'StudentView/studentGetById', payload: studentId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentView);
