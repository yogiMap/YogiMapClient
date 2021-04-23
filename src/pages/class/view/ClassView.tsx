import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  classId: string;
  name: string;
  classGetById: (id: string) => void;
}

const classView = (props: IProps) => {
  const classId = get(props, 'match.params.classId');
  const name = get(props, 'classView.name', '');

  console.log(props);

  useEffect(() => {
    props.classGetById(classId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  classView: state.classView,
});

const mapDispatchToProps = (dispatch: any) => ({
  classGetById: (payload: string) => dispatch({ type: 'classView/classGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(classView);
