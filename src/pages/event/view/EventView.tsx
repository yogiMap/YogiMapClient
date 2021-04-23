import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  eventId: string;
  name: string;
  eventGetById: (id: string) => void;
}

const eventView = (props: IProps) => {
  const eventId = get(props, 'match.params.eventId');
  const name = get(props, 'eventView.name', '');

  console.log(props);

  useEffect(() => {
    props.eventGetById(eventId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  eventView: state.eventView,
});

const mapDispatchToProps = (dispatch: any) => ({
  eventGetById: (payload: string) => dispatch({ type: 'eventView/eventGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(eventView);
