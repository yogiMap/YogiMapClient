import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import TeacherViewClassesList from '@/pages/teacher/view/TeacherViewClassesList';
import TeacherViewEventList from '@/pages/teacher/view/TeacherViewEventList';
import { Tag } from 'antd';

interface IProps {
  teacherId: string;
  name: string;
  teacherGetById: (id: string) => void;
}

const TeacherView = (props: IProps) => {
  const teacherId = get(props, 'match.params.teacherId');
  const name = get(props, 'TeacherView.name', '');
  const classesObject = get(props, 'TeacherView.classes', {});
  const classes: any  = Object.values(classesObject);
  const eventObject = get(props, 'TeacherView.event', {});
  const event: any  = Object.values(eventObject);
  const teacherTypeObject = get(props, 'TeacherView.classType', {});
  const teacherType = Object.values(teacherTypeObject);
  // const classes = Object.keys(classesObject).map(el => ({name:el, value: classesObject[el]}) )

  const addressId: string = get(props, 'match.params.addressId');
  const addressLine1: string = get(props, 'TeacherView.addressLine1', '');
  const addressLine2: string = get(props, 'TeacherView.addressLine2', '');
  const state: string = get(props, 'TeacherView.state', '');
  const city: string = get(props, 'TeacherView.city', '');
  const zipCode: string = get(props, 'TeacherView.zipCode', '');
  const countryName: string = get(props, 'TeacherView.countryName', '');
  const isDefault: boolean = get(props, 'TeacherView.isDefault', false);
  const timeZone = get(props, 'TeacherView.timeZone', '');
  const email = get(props, 'TeacherView.email', '');
  const phone: any = get(props, 'TeacherView.phone', '');

  console.log(event);

  useEffect(() => {
    props.teacherGetById(teacherId);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">{name}</h1>
      {teacherType.map((el: any) => (
        <h2>{el.name}</h2>
      ))}

      <div className="d-print-block">
        <h6>
          Address {isDefault && <Tag color="default">default</Tag>}
        </h6>
        <div className="mb-1">{addressLine1}</div>
        <div className="mb-1">{addressLine2}</div>
        <div className="mb-1">{city}</div>
        <div className="mb-1">{state}</div>
        <div className="mb-1">{zipCode}</div>
        <div className="mb-1">{countryName}</div>
        <div className="mb-1">{email}</div>
        <div className="mb-1">{phone}</div>
      </div>

      <h3 className="mt-5">Classes</h3>
      <div>
        <TeacherViewClassesList classes={classes}/>
      </div>

      <h3 className="mt-5">Events</h3>
      <div>
        <TeacherViewEventList event={event}/>
      </div>

    </div>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherView: state.TeacherView,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherGetById: (payload: string) => dispatch({ type: 'TeacherView/teacherGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherView);
