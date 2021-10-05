import React from 'react';
import { get } from 'lodash';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import { IAddress } from '@/pages/address/types';
import { formatterDateFull, formatterTimeFull } from '@/utils/dateTime';

interface IProps extends RouteComponentProps {
  address: IAddress[];
}

const TeacherAccountViewAddressList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const address = get(props, 'TeacherAccountView.address', '');
  const addressLine1 = get(props, 'TeacherAccountView.addressLine1', '');
  const addressLine2 = get(props, 'TeacherAccountView.addressLine2', '');
  const city = get(props, 'TeacherAccountView.city', '');
  const state = get(props, 'TeacherAccountView.state', '');
  const country = get(props, 'TeacherAccountView.country', '');
  const zipCode = get(props, 'TeacherAccountView.zipCode', '');
  const timeZone = get(props, 'TeacherAccountView.timeZone', '');

  return (
    <div className="container">
      <div className="row my-2 border-top border-bottom">
        <div className="col-md-2 d-flex justify-content-center my-2">
          <div>
            <div className="text-colored-second mb-3">address</div>
            <h6 className="text-colored-first">{addressLine1}</h6>
          </div>
        </div>

        <div className="col-md-2 d-flex justify-content-center my-2">
          <div>
            <div className="text-colored-second mb-3">City</div>
            <h6 className="text-colored-first">{city}</h6>
          </div>
        </div>

        <div className="col-md-2 d-flex justify-content-center my-2">
          <div>
            <div className="text-colored-second mb-3">State</div>
            <h6 className="text-colored-first">{state}</h6>
          </div>
        </div>

        <div className="col-md-2 d-flex justify-content-center my-2">
          <div>
            <div className="text-colored-second mb-3">Country</div>
            <div className="text-colored-first">{country}</div>
          </div>
        </div>

        <div className="col-md-2 d-flex justify-content-center my-2">
          <div>
            <div className="text-colored-second mb-3">zipCode</div>
            <div className="text-colored-first">{zipCode}</div>
          </div>
        </div>

        <div className="col-md-2 d-flex justify-content-center my-2">
          <div>
            <div className="text-colored-second mb-3">timeZone</div>
            <div className="text-colored-first">{timeZone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherAccountView: state.TeacherAccountView,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccount/teacherAccountGetById', payload: teacherAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountViewAddressList);
