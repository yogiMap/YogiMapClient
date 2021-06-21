import React from 'react';
import { get } from 'lodash';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';
import { IAddress } from '@/pages/address/types';

interface IProps extends RouteComponentProps {
  address: IAddress[];
}

const StudentAccountViewAddressList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const address = get(props, 'StudentAccountView.address', '');
  const addressLine1 = get(props, 'StudentAccountView.addressLine1', '');
  const addressLine2 = get(props, 'StudentAccountView.addressLine2', '');
  const city = get(props, 'StudentAccountView.city', '');
  const state = get(props, 'StudentAccountView.state', '');
  const country = get(props, 'StudentAccountView.country', '');
  const zipCode = get(props, 'StudentAccountView.zipCode', '');
  const timeZone = get(props, 'StudentAccountView.timeZone', '');

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
  StudentAccountView: state.StudentAccountView,
});

const mapDispatchToProps = (dispatch: any) => ({
  studentAccountGetById: (studentAccountId: string) =>
    dispatch({ type: 'StudentAccountView/studentAccountGetById', payload: studentAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentAccountViewAddressList);
