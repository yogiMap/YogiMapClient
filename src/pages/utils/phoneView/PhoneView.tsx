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
  console.log(props);

  let code = get(props, 'phone.code', '');
  code = code !== '1' && `+${code} `;

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
