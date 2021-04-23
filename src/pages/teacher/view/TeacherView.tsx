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
  const classes = Object.keys(classesObject).map(el => ({name:el, value: classesObject[el]}) )

  console.log(props);

  useEffect(() => {
    props.teacherGetById(teacherId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
<ul>
  <TeacherViewClassesList items={classes}/>
</ul>

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
