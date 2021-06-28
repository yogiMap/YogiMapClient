import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  sidPhoneId: string;
  name: string;
  sidPhoneGetById: (id: string) => void;
}

const SidPhoneView = (props: IProps) => {
  const sidPhoneId = get(props, 'match.params.sidPhoneId');
  const name = get(props, 'SidPhoneView.name', '');

  console.log(props);

  useEffect(() => {
    props.sidPhoneGetById(sidPhoneId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  SidPhoneView: state.SidPhoneView,
});

const mapDispatchToProps = (dispatch: any) => ({
  sidPhoneGetById: (payload: string) => dispatch({ type: 'SidPhoneView/sidPhoneGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidPhoneView);
