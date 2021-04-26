import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import TeacherViewClassesList from '@/pages/teacher/view/TeacherViewClassesList';

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
  // const classes = Object.keys(classesObject).map(el => ({name:el, value: classesObject[el]}) )

  console.log(event);

  useEffect(() => {
    props.teacherGetById(teacherId);
  }, []);

  return (
    <div className="container">
      <h1>{name}</h1>
      <h3>Teacher Type</h3>


      <h3 className="my-3">Classes</h3>
      <div className="mb-5">
      <div className="row">
        <div className="col">Name</div>
        <div className="col">YogaStyle</div>
        <div className="col">Description</div>
      </div>
      {classes.map((el: any) => (
        <div className="row">
          <div className="col">{el.name}</div>
          <div className="col">{el.yogaStyle}</div>
          <div className="col">{el.description}</div>
        </div>
      ))}
      </div>

      <h3>Events</h3>
      <div className="mb-5">
        <div className="row">
          <div className="col">Name</div>
          <div className="col">Description</div>
        </div>
        {event.map((el: any) => (
          <div className="row">
            <div className="col">{el.name}</div>
            <div className="col">{el.description}</div>
          </div>
        ))}
      </div>


      {/*<ul>*/}
      {/*  <TeacherViewClassesList items={classes}/>*/}
      {/*</ul>*/}
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
