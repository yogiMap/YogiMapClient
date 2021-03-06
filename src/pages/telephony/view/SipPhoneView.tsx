import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  sipPhoneId: string;
  name: string;
  sipPhoneGetById: (id: string) => void;
}

const SipPhoneView = (props: IProps) => {
  const sipPhoneId = get(props, 'match.params.sipPhoneId');
  const name = get(props, 'SipPhoneView.name', '');

  console.log(props);

  useEffect(() => {
    props.sipPhoneGetById(sipPhoneId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  SipPhoneView: state.SipPhoneView,
});

const mapDispatchToProps = (dispatch: any) => ({
  sipPhoneGetById: (payload: string) => dispatch({ type: 'SipPhoneView/sipPhoneGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneView);
