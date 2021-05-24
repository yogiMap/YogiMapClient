import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';

interface IProps {
  eventId: string;
  name: string;
  eventGetById: (id: string) => void;
}

const EventView = (props: IProps) => {
  const eventId = get(props, 'match.params.eventId');
  const name = get(props, 'EventView.name', '');
  const focus = get(props, 'EventView.focus', '');
  const style = get(props, 'EventView.style.name', '');
  const classType = get(props, 'EventView.classType.name', '');
  const description = get(props, 'EventView.description', '');
  const userName = get(props, 'Account.name', '');

  console.log(props);

  useEffect(() => {
    props.eventGetById(eventId);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-5">{name}</h1>
      <div className="text-end mb-3"> {userName}</div>

      <div className="row my-2 border-top border-bottom">
        <div className="col-md-3 d-flex justify-content-center my-3">
          <div>
            <div className="title2 mb-3">Focus</div>
            <h5 className="title">{focus}</h5>
          </div>
        </div>

        <div className="col-md-3 d-flex justify-content-center my-3">
          <div>
            <div className="title2 mb-3">Style</div>
            <h5 className="title">{style}</h5>
          </div>
        </div>

        <div className="col-md-3 d-flex justify-content-center my-3">
          <div>
            <div className="title2 mb-3"> ClassType</div>
            <h5 className="title">{classType}</h5>
          </div>
        </div>

        <div className="col-md-3 d-flex justify-content-center my-3">
          <div>
            <div className="title2 mb-3"> Description </div>
            <h5 className="title">{description}</h5>
          </div>
        </div>
      </div>

      <div className="mt-5 d-flex justify-content-center">
        <Link to="/event" className="button-link-primary">
          Back To Events
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  EventView: state.EventView,
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  eventGetById: (payload: string) => dispatch({ type: 'EventView/eventGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventView);
