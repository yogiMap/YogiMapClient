import React from 'react';
import { get } from 'lodash';
import callOutbound from '@/icons/phone-call.svg';
import { Button } from 'antd';
import { connect } from 'umi';

interface IStartCall {
  phoneNumber: string;
}

export interface IProps {
  onClick: () => void;
  phoneNumber: string;
  callStart: (arg: IStartCall) => void;
}

function PhoneNumberCall(props: IProps) {
  const phoneNumberRaw = props.phoneNumber;

  console.log(phoneNumberRaw);

  const phoneNumberCode = get(phoneNumberRaw, 'code', '1');
  const phoneNumber = get(phoneNumberRaw, 'number');
  const phoneNumberExt = get(phoneNumberRaw, 'ext');

  let formattedPhone = '';

  if (phoneNumber && phoneNumber.length) {
    const areaCode = phoneNumber.slice(0, 3);
    const phonePartOne = phoneNumber.slice(3, 6);
    const phonePartTwo = phoneNumber.slice(6);

    formattedPhone = ` +${phoneNumberCode} (${areaCode}) ${phonePartOne}-${phonePartTwo}  `;
  }

  const onClickHandler = () => {
    props.callStart({ phoneNumber: `${phoneNumberCode}${phoneNumber}` });
  };

  return (
    <>
      {phoneNumber && <span>{formattedPhone} </span>}

      {phoneNumberExt && <span>ext {phoneNumberExt}</span>}

      <Button type="link" onClick={onClickHandler}>
        {<img src={callOutbound} alt="" height="20" />}
      </Button>
    </>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  callStart: (payload: IStartCall) => dispatch({ type: 'PhoneWidget/callStart', payload }),
});

export default connect(null, mapDispatchToProps)(PhoneNumberCall);
