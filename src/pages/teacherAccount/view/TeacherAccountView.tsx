import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import TeacherAccountViewClassesList from '@/pages/teacherAccount/view/TeacherAccountViewClassesList';
import TeacherAccountViewEventList from '@/pages/teacherAccount/view/TeacherAccountViewEventList';
import TeacherAccountViewAddressList from '@/pages/teacherAccount/view/TeacherAccountViewAddressList';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { IEventQueryParams } from '@/pages/event/types';

interface IProps {
  teacherAccountId: string;
  name: string;
  teacherAccountGetById: (teacherAccountId: string) => void;
  eventSearch: (arg: IEventQueryParams) => void;
  Account: IUserAccount;
}

const TeacherAccountView = (props: IProps) => {
  const teacherAccountId = get(props, 'match.params.teacherAccountId');
  const teacherName = get(props, 'TeacherAccountView.teacherName', '');
  const email = get(props, 'Account.email', '');
  const phone: any = get(props, 'TeacherAccountView.phoneNumber.number', '');

  const name = get(props, 'TeacherAccountView.name', '');
  const phoneNumber = get(props, 'TeacherAccountView.phoneNumber', '');
  const classesObject = get(props, 'TeacherAccountView.classes', {});
  const classes: any = Object.values(classesObject);
  const eventObject = get(props, 'TeacherAccountView.event', {});
  const event: any = Object.values(eventObject);
  const classTypeObject = get(props, 'TeacherAccountView.classType', {});
  const classType = Object.values(classTypeObject);
  const focus = get(props, 'TeacherAccountView.focus', '');
  const YogaStyleObject = get(props, 'TeacherAccountView.style', '');
  console.log(focus);

  useEffect(() => {
    props.teacherAccountGetById(teacherAccountId);
  }, []);

  return (
    <div>
      <div className="container">
        <h1 className="text-center">{name}</h1>

        <div className="row">
          <div className="col-md-10 d-flex justify-content-start">
            <h3 className="text-colored-second">{focus}</h3>
          </div>

          <div className="col-md-2">
            <h6>Email: {email}</h6>
            <h6>Phone: {phoneNumber}</h6>
          </div>
        </div>

        <div className="py-5">
          <h3 className="mt-5">Classes</h3>
          <div>
            <TeacherAccountViewClassesList classes={classes} />
          </div>

          <h3 className="mt-5">Events</h3>
          <div>
            <TeacherAccountViewEventList event={event} />
          </div>

          <h3 className="text-center">Address</h3>
          <div>
            <TeacherAccountViewAddressList />
          </div>
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
  eventSearch: (payload: IEventQueryParams) => dispatch({ type: 'EventDashboard/eventSearch', payload }),
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccountView/teacherAccountGetById', payload: teacherAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountView);
