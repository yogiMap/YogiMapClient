import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import TeacherAccountViewClassesList from '@/pages/teacherAccount/view/TeacherAccountViewClassesList';
import TeacherAccountViewEventList from '@/pages/teacherAccount/view/TeacherAccountViewEventList';
import TeacherAccountViewAddressList from '@/pages/teacherAccount/view/TeacherAccountViewAddressList';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { IEventQueryParams } from '@/pages/event/types';

interface IProps {
  teacherAccountId: string;
  name: string;
  teacherAccountGetById: (id: string) => void;
  Account: IUserAccount;
}

const TeacherAccountView = (props: IProps) => {
  const teacherAccountId = get(props, 'match.params.teacherAccountId');
  const email = get(props, 'Account.email', '');
  const name = get(props, 'TeacherAccountView.name', '');
  const phoneNumber = get(props, 'TeacherAccountView.phoneNumber.number', '');
  const classesObject = get(props, 'TeacherAccountView.classes', {});
  const classes: any = Object.values(classesObject);
  const eventObject = get(props, 'TeacherAccountView.event', {});
  const event: any = Object.values(eventObject);
  const focus = get(props, 'TeacherAccountView.focus', '');
  const style = get(props, 'TeacherAccountView.style.name', '');
  const classTypeObject = get(props, 'TeacherAccountView.classType', {});
  const classType = Object.values(classTypeObject)
    .map((el: any) => el.name)
    .toString();

  useEffect(() => {
    props.teacherAccountGetById(teacherAccountId);
  }, []);

  return (
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
        <h3 className="text-colored-first mt-5">Classes</h3>
        <div>
          <TeacherAccountViewClassesList classes={classes} />
        </div>

        <h3 className="text-colored-second mt-5">Events</h3>
        <div>
          <TeacherAccountViewEventList event={event} />
        </div>

        <h3 className="text-colored-third">Address</h3>
        <div>
          <TeacherAccountViewAddressList />
        </div>
      </div>

      <div className="mt-5 d-flex justify-content-center">
        <Link to="/teacherAccount" className="button-link-primary">
          Back To All Teachers
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherAccountView: state.TeacherAccountView,
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  // teacherAccountGetById: (teacherAccountId: string) =>
  //   dispatch({ type: 'TeacherAccountView/teacherAccountGetById', payload: teacherAccountId }),
  teacherAccountGetById: (payload: string) => dispatch({ type: 'TeacherAccountView/teacherAccountGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountView);
