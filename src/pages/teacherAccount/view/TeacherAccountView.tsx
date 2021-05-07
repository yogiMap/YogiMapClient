import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import RenderPhoneNumber from '@/pages/phoneNumberRendering/PhoneNumbersRendering';
import { Tag } from 'antd';
import TeacherAccountViewClassesList from '@/pages/teacherAccount/view/TeacherAccountViewClassesList';
import TeacherAccountViewEventList from '@/pages/teacherAccount/view/TeacherAccountViewEventList';
import TeacherAccountViewAddressList from '@/pages/teacherAccount/view/TeacherAccountViewAddressList';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  teacherAccountId: string;
  name: string;
  teacherAccountGetById: (teacherAccountId: string) => void;
  Account: IUserAccount;
}

const TeacherAccountView = (props: IProps) => {
  const teacherAccountId = get(props, 'match.params.teacherAccountId');
  const teacherName = get(props, 'TeacherAccountView.teacherName', '');
  const email = get(props, 'Account.email', '');
  const phone: any = get(props, 'TeacherAccountView.phoneNumber.number', '');

  const name = get(props, 'TeacherAccountView.name', '');
  const classesObject = get(props, 'TeacherAccountView.classes', {});
  const classes: any = Object.values(classesObject);
  const eventObject = get(props, 'TeacherAccountView.event', {});
  const event: any = Object.values(eventObject);
  const classTypeObject = get(props, 'TeacherAccountView.classType', {});
  const classType = Object.values(classTypeObject);
  const focusObject = get(props, 'TeacherAccountView.focus', {});
  const YogaStyleObject = get(props, 'TeacherAccountView.style', {});
  console.log(event);

  useEffect(() => {
    props.teacherAccountGetById(teacherAccountId);
  }, []);

  return (
    <div>
      <div className="container">
        <h1 className="text-center">{name}</h1>
        <h6>Email: {email}</h6>
        <h6>
          Phone:
          <RenderPhoneNumber phoneNumberAll={get(props, 'TeacherAccountView.phoneNumber', {})} />
        </h6>

        {/*{classType.map((el: any) => (*/}
        {/*  <h2>{el.name}</h2>*/}
        {/*))}*/}

        <div className="py-5">
          <h3>Address</h3>
          <div>
            <TeacherAccountViewAddressList />
          </div>
        </div>

        <h3 className="mt-5">Classes</h3>
        <div>
          <TeacherAccountViewClassesList classes={classes} />
        </div>

        <h3 className="mt-5">Events</h3>
        <div>
          <TeacherAccountViewEventList event={event} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherAccountView: state.TeacherAccountView,
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccountView/teacherAccountGetById', payload: teacherAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountView);
