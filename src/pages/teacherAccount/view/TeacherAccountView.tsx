import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import RenderPhoneNumber from '@/pages/phoneNumberRendering/PhoneNumbersRendering';

interface IProps {
  teacherAccountId: string;
  name: string;
  teacherAccountGetById: (teacherAccountId: string) => void;
}

const TeacherAccountView = (props: IProps) => {
  const teacherAccountId = get(props, 'match.params.teacherAccountId');
  const teacherName = get(props, 'TeacherAccountView.teacherName', '');
  const email = get(props, 'TeacherAccountView.email', '');
  const address = get(props, 'TeacherAccountView.address', '');
  const addressLine1 = get(props, 'TeacherAccountView.addressLine1', '');
  const addressLine2 = get(props, 'TeacherAccountView.addressLine2', '');
  const city = get(props, 'TeacherAccountView.city', '');
  const state = get(props, 'TeacherAccountView.state', '');
  const country = get(props, 'TeacherAccountView.country', '');
  const zipCode = get(props, 'TeacherAccountView.zipCode', '');
  const timeZone = get(props, 'TeacherAccountView.timeZone', '');

  useEffect(() => {
    props.teacherAccountGetById(teacherAccountId);
  }, []);

  return (
    <div>
      <h2>{teacherName}</h2>
      <hr />
      Phone Number: <RenderPhoneNumber phoneNumberAll={get(props, 'TeacherAccountView.phoneNumber', {})} />
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
  TeacherAccountView: state.TeacherAccountView,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccountView/teacherAccountGetById', payload: teacherAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountView);
