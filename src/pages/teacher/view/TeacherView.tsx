import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import TeacherViewClassesList from '@/pages/teacher/view/TeacherViewClassesList';
import TeacherViewEventList from '@/pages/teacher/view/TeacherViewEventList';

interface IProps {
  teacherId: string;
  name: string;
  teacherGetById: (id: string) => void;
}

const TeacherView = (props: IProps) => {
  const teacherId = get(props, 'match.params.teacherId');
  const name = get(props, 'TeacherView.name', '');
  const classesObject = get(props, 'TeacherView.classes', {});
  const classes = Object.values(classesObject);
  const eventObject = get(props, 'TeacherView.event', {});
  const event = Object.values(eventObject);
  const teacherTypeObject = get(props, 'TeacherView.teacherType', {});
  const teacherType = Object.values(teacherTypeObject);
  // const classes = Object.keys(classesObject).map(el => ({name:el, value: classesObject[el]}) )

  console.log(event);

  useEffect(() => {
    props.teacherGetById(teacherId);
  }, []);

  return (
    <div className="container">
      <h1>{name}</h1>
      <h3>Teacher Type</h3>
      {teacherType.map((el: any) => (
        <div>{el.name}</div>
      ))}


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
