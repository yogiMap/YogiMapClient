import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  focusId: string;
  name: string;
  focusGetById: (id: string) => void;
}

const FocusView = (props: IProps) => {
  const focusId = get(props, 'match.params.focusId');
  const name = get(props, 'FocusView.name', '');

  console.log(props);

  useEffect(() => {
    props.focusGetById(focusId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  FocusView: state.FocusView,
});

const mapDispatchToProps = (dispatch: any) => ({
  focusGetById: (payload: string) => dispatch({ type: 'FocusView/focusGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusView);
