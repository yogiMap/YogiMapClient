import React from 'react';
import { get } from 'lodash';

interface IPhone {
  phone: {
    code: string;
    number: string;
    ext: string;
  };
}

const PhoneView = (props: IPhone) => {
  let code = get(props, 'phone.code', '');

  if (code === 1 || !code) code = '';
  else code = `+${code} `;

  const number = get(props, 'phone.number', '');

  // let ext = get(props, 'phone.ext', '');
  // ext = ext && ` ext ${ext}`;

  return (
    <div>
      {code}
      {number}
      {/*{ext}*/}
    </div>
  );
};
export default PhoneView;
