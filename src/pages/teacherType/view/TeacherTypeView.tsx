import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  teacherTypeId: string;
  name: string;
  teacherTypeGetById: (id: string) => void;
}

const TeacherTypeView = (props: IProps) => {
  const teacherTypeId = get(props, 'match.params.teacherTypeId');
  const name = get(props, 'TeacherTypeView.name', '');

  console.log(props);

  useEffect(() => {
    props.teacherTypeGetById(teacherTypeId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherTypeView: state.TeacherTypeView,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherTypeGetById: (payload: string) => dispatch({ type: 'TeacherTypeView/teacherTypeGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherTypeView);
