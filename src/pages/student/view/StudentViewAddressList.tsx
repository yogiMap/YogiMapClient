import React from 'react';
import { get } from 'lodash';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import { IAddress } from '@/pages/address/types';

interface IProps extends RouteComponentProps {
  address: IAddress[];
}

const StudentViewAddressList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const address = get(props, 'StudentView.address', '');
  const addressLine1 = get(props, 'StudentView.addressLine1', '');
  const addressLine2 = get(props, 'StudentView.addressLine2', '');
  const city = get(props, 'StudentView.city', '');
  const state = get(props, 'StudentView.state', '');
  const country = get(props, 'StudentView.country', '');
  const zipCode = get(props, 'StudentView.zipCode', '');
  const timeZone = get(props, 'StudentView.timeZone', '');

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
  StudentView: state.StudentView,
});

const mapDispatchToProps = (dispatch: any) => ({
  studentGetById: (studentId: string) => dispatch({ type: 'StudentView/studentGetById', payload: studentId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentViewAddressList);
