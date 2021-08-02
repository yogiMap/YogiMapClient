import React from 'react';
import { get } from 'lodash';
import { IPhone } from '@/pages/client/types';

interface IPhoneView {
  phone: IPhone;
}

const PhoneView = (props: IPhoneView) => {
  let code = get(props, 'phone.code', '');

  if (code === 1 || !code) code = '';
  else code = `+${code} `;

  const number = get(props, 'phone.number', '');

  let ext = get(props, 'phone.ext', '');
  //ext = ext && ` ext ${ext}`;

  return (
    <div>
      {code}
      {number}
      {/*// {ext}*/}
    </div>
  );
};
export default PhoneView;
