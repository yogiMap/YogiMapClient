import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { formatterDateFull, formatterTimeFull } from '@/utils/dateTime';

interface IProps {
  classesId: string;
  name: string;
  classesGetById: (classesId: string) => void;
  User: IUser;
}

const ClassesView = (props: IProps) => {
  const classesId = get(props, 'match.params.classesId');
  const name = get(props, 'ClassesView.name', '');
  const focus = get(props, 'ClassesView.focus', '');
  const style = get(props, 'ClassesView.style.name', '');
  const classType = get(props, 'ClassesView.classType.name', '');
  const description = get(props, 'ClassesView.description', '');
  const date = get(props, 'ClassesView.date', '');
  const userName = get(props, 'Account.name', '');

  useEffect(() => {
    props.classesGetById(classesId);
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
        <Link to="/schedule" className="button-link-primary-active">
          VIEW SCHEDULE
        </Link>

        <Link to="/classes" className="button-link-primary">
          Back To Classes
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  ClassesView: state.ClassesView,
  User: state.User,
});

const mapDispatchToProps = (dispatch: any) => ({
  classesGetById: (payload: string) => dispatch({ type: 'ClassesView/classesGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesView);
