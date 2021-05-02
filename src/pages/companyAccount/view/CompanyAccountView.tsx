import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import RenderPhoneNumber from '@/pages/phoneNumberRendering/PhoneNumbersRendering';

interface IProps {
  companyAccountId: string;
  name: string;
  companyAccountGetById: (companyAccountId: string) => void;
}

const CompanyAccountView = (props: IProps) => {
  const companyAccountId = get(props, 'match.params.companyAccountId');
  const teacherName = get(props, 'CompanyAccountView.teacherName', '');
  const email = get(props, 'CompanyAccountView.email', '');
  const address = get(props, 'CompanyAccountView.address', '');
  const addressLine1 = get(props, 'CompanyAccountView.addressLine1', '');
  const addressLine2 = get(props, 'CompanyAccountView.addressLine2', '');
  const city = get(props, 'CompanyAccountView.city', '');
  const state = get(props, 'CompanyAccountView.state', '');
  const country = get(props, 'CompanyAccountView.country', '');
  const zipCode = get(props, 'CompanyAccountView.zipCode', '');
  const timeZone = get(props, 'CompanyAccountView.timeZone', '');

  useEffect(() => {
    props.companyAccountGetById(companyAccountId);
  }, []);

  return (
    <div>
      <h2>{teacherName}</h2>
      <hr />
      Phone Number: <RenderPhoneNumber phoneNumberAll={get(props, 'CompanyAccountView.phoneNumber', {})} />
      <br />
      Email: {email} <br />
      Address: {address} <br />
      Address Line1: {addressLine1} <br />
      Address Line2: {addressLine2} <br />
      City: {city} <br />
      State: {state} <br />
      Country: {country} <br />
      Zip Code: {zipCode} <br />
      Time Zone: {timeZone} <br />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  CompanyAccountView: state.CompanyAccountView,
});

const mapDispatchToProps = (dispatch: any) => ({
  companyAccountGetById: (companyAccountId: string) =>
    dispatch({ type: 'CompanyAccountView/companyAccountGetById', payload: companyAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyAccountView);
