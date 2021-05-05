import React from 'react';
import { get } from 'lodash';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import { IAddress } from '@/pages/address/types';

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
    <div>
      <table className="table table-light">
        <thead>
        <tr className="table-secondary">
          <th scope="col">address</th>
          <th scope="col">city</th>
          <th scope="col">state</th>
          <th scope="col">country</th>
          <th scope="col">zipCode</th>
          <th scope="col">timeZone</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{addressLine1}</td>
          <td>{city}</td>
          <td>{state}</td>
          <td>{country}</td>
          <td>{zipCode}</td>
          <td>{timeZone}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherAccountView: state.TeacherAccountView,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccountView/teacherAccountGetById', payload: teacherAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountViewAddressList);
