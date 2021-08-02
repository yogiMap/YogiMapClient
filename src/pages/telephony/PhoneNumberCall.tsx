import React from 'react';
import { get } from 'lodash';
import callOutbound from '@/icons/phone-call.svg';
import { Button } from 'antd';
import { connect } from 'umi';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IStartCall {
  phoneNumber: string;
}

export interface IProps {
  onClick: () => void;
  phoneNumber: string;
  callStart: (arg: IStartCall) => void;
  open: (arg: any) => void;
}

function PhoneNumberCall(props: IProps) {
  const phoneNumberRaw = props.phoneNumber;
  const phoneNumberCode = get(phoneNumberRaw, 'code', '1');
  const phoneNumber = get(phoneNumberRaw, 'number');
  //const phoneNumberExt = get(phoneNumberRaw, 'ext');
  let formattedPhone = '';
  if (phoneNumber && phoneNumber.length) {
    const areaCode = phoneNumber.slice(0, 3);
    const phonePartOne = phoneNumber.slice(3, 6);
    const phonePartTwo = phoneNumber.slice(6);

    formattedPhone = ` +${phoneNumberCode} (${areaCode}) ${phonePartOne}-${phonePartTwo}  `;
  }

  // const onClickHandler = () => {
  //   props.callStart({ phoneNumber: `${phoneNumberCode}${phoneNumber}` });
  // };

  const onClickHandler = () => {
    props.open({
      title: 'Calls',
      component: 'PhonePad',
      place: '',
      width: 380,
      phoneNumber: `${phoneNumberCode}${phoneNumber}`,
    });
  };

  return (
    <>
      {phoneNumber && <span>{formattedPhone} </span>}

      <Button type="link" onClick={onClickHandler}>
        {<img src={callOutbound} alt="" height="20" />}
        <span className="ms-2 primary-link">Call</span>
      </Button>
    </>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  callStart: (payload: IStartCall) => dispatch({ type: 'PhoneWidget/callStart', payload }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(PhoneNumberCall);
