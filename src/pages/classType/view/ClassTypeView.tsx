import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  classTypeId: string;
  name: string;
  classTypeGetById: (id: string) => void;
}

const ClassTypeView = (props: IProps) => {
  const classTypeId = get(props, 'match.params.classTypeId');
  const name = get(props, 'ClassTypeView.name', '');
  const description = get(props, 'ClassTypeView.description', '');

  console.log(props);

  useEffect(() => {
    props.classTypeGetById(classTypeId);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center m-4">{name}</h1>
      <p>{description}</p>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  ClassTypeView: state.ClassTypeView,
});

const mapDispatchToProps = (dispatch: any) => ({
  classTypeGetById: (payload: string) => dispatch({ type: 'ClassTypeView/classTypeGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassTypeView);
