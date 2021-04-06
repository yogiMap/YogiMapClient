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

  console.log(props);

  useEffect(() => {
    props.classesGetById(classesId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
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
