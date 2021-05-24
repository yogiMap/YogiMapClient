import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  classesId: string;
  name: string;
  classesGetById: (id: string) => void;
  Account: IUserAccount;
}

const ClassesView = (props: IProps) => {
  const classesId = get(props, 'match.params.classesId');
  const name = get(props, 'ClassesView.name', '');
  const focus = get(props, 'ClassesView.focus', '');
  const style = get(props, 'ClassesView.style.name', '');
  const classType = get(props, 'ClassesView.classType.name', '');
  const description = get(props, 'ClassesView.description', '');
  const userName = get(props, 'Account.name', '');

  useEffect(() => {
    props.classesGetById(classesId);
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
        <Link to="/classes" className="button-link-primary">
          Back To Classes
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  ClassesView: state.ClassesView,
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  classesGetById: (payload: string) => dispatch({ type: 'ClassesView/classesGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesView);
