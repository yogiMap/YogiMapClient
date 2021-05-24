import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { formatterDateFull, formatterTimeFull } from '@/utils/dateTime';

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
  const date = get(props, 'EventView.date', '');
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
        <div className="col-md-2 d-flex justify-content-center my-3">
          <div>
            <div className="text-colored-second mb-3">Focus</div>
            <h6 className="text-colored-first">{focus}</h6>
          </div>
        </div>

        <div className="col-md-2 d-flex justify-content-center my-3">
          <div>
            <div className="text-colored-second mb-3">Style</div>
            <h6 className="text-colored-first">{style}</h6>
          </div>
        </div>

        <div className="col-md-2 d-flex justify-content-center my-3">
          <div>
            <div className="text-colored-second mb-3"> ClassType</div>
            <h6 className="text-colored-first">{classType}</h6>
          </div>
        </div>

        <div className="col-md-2 d-flex justify-content-center my-3">
          <div>
            <div className="text-colored-second mb-3"> Description </div>
            <div className="text-colored-first">{description}</div>
          </div>
        </div>

        <div className="col-md-2 d-flex justify-content-center my-3">
          <div>
            <div className="text-colored-second mb-3"> Date </div>
            <div className="text-colored-first">{formatterDateFull(date)}</div>
          </div>
        </div>

        <div className="col-md-2 d-flex justify-content-center my-3">
          <div>
            <div className="text-colored-second mb-3"> Time </div>
            <div className="text-colored-first">{formatterTimeFull(date)}</div>
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
