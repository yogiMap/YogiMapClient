import React from 'react';
import { get } from 'lodash';
import callOutbound from '@/icons/phone-call.svg';
import { Button } from 'antd';
import { connect } from 'umi';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

export interface IProps {
  onClick: () => void;
  phoneNumberAll: string;
  open: (arg: any) => void;
}

function RenderPhoneNumber(props: IProps) {
  const phoneNumberAll = props.phoneNumberAll;
  const phoneNumberCode = get(phoneNumberAll, 'code', '1');
  const phoneNumber = get(phoneNumberAll, 'number');
  const phoneNumberExt = get(phoneNumberAll, 'ext');
  let formattedPhone = '';
  if (phoneNumber && phoneNumber.length) {
    const areaCode = phoneNumber.slice(0, 3);
    const phonePartOne = phoneNumber.slice(3, 6);
    const phonePartTwo = phoneNumber.slice(6);

    formattedPhone = ` +${phoneNumberCode} (${areaCode}) ${phonePartOne}-${phonePartTwo}  `;
  }

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

      {phoneNumberExt && <span>ext {phoneNumberExt}</span>}

      <Button type="link" onClick={onClickHandler}>
        {<img src={callOutbound} alt="" height="20" />} <span className="ms-2 primary-link">Call</span>
      </Button>
    </>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(RenderPhoneNumber);
