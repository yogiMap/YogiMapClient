import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  classesId: string;
  name: string;
  classesGetById: (id: string) => void;
}

const ClassesView = (props: IProps) => {
  const classesId = get(props, 'match.params.classesId');
  const name = get(props, 'ClassesView.name', '');
  const focus = get(props, 'ClassesView.focus', '');

  console.log(props);

  useEffect(() => {
    props.classesGetById(classesId);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">{name}</h1>
      <h3>{focus}</h3>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  ClassesView: state.ClassesView,
});

const mapDispatchToProps = (dispatch: any) => ({
  classesGetById: (payload: string) => dispatch({ type: 'ClassesView/classesGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesView);
