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
  const email = get(props, 'Account.email', '');
  const name = get(props, 'TeacherAccountView.name', '');
  const phoneNumber = get(props, 'TeacherAccountView.phoneNumber', '');
  const classesObject = get(props, 'TeacherAccountView.classes', {});
  const classes: any = Object.values(classesObject);
  const eventObject = get(props, 'TeacherAccountView.event', {});
  const event: any = Object.values(eventObject);
  const focus = get(props, 'TeacherAccountView.focus', '');
  const YogaStyleObject = get(props, 'TeacherAccountView.style', {});
  const styleArr = Object.values(YogaStyleObject);
  const style = styleArr.map((el: any) => el.name).toString();
  const classTypeObject = get(props, 'TeacherAccountView.classType', {});
  const classType = Object.values(classTypeObject)
    .map((el: any) => el.name)
    .toString();

  useEffect(() => {
    props.teacherAccountGetById(teacherAccountId);
  }, []);

  return (
    <div>
      <div className="container">
        <h1 className="text-center">{name}</h1>

        <div className="row">
          <div className="col-md-8 d-flex justify-content-start">
            <div>
              <h3 className="text-colored-second text-start">{focus}</h3>
              <h6 className="text-colored-third text-start"> Style of Yoga: {style}</h6>
              <h6 className="text-colored-first text-start"> Type of Classes: {classType}</h6>
            </div>
          </div>

          <div className="col-md-4 d-flex justify-content-end">
            <div>
              <h6>Email: {email}</h6>
              <h6>Phone: {phoneNumber}</h6>
            </div>
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
