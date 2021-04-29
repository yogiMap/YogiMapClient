import React from 'react';
import { get } from 'lodash';

function RenderPhoneNumber(props: any) {
  const phoneNumberAll = props.phoneNumberAll;
  const phoneNumberCode = get(phoneNumberAll, 'code', '1');
  const phoneNumber = get(phoneNumberAll, 'number');
  let formattedPhone = '';
  if (phoneNumber && phoneNumber.length) {
    const areaCode = phoneNumber.slice(0, 3);
    const phonePartOne = phoneNumber.slice(3, 6);
    const phonePartTwo = phoneNumber.slice(6);
    formattedPhone = ` +${phoneNumberCode} (${areaCode}) ${phonePartOne}-${phonePartTwo}`;
  }
  return (
    <>
      {phoneNumber && <span>{formattedPhone}</span>}
    </>
  );
}
export default RenderPhoneNumber;
