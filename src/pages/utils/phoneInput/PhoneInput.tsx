import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import codePhoneNumber from '@/utils/codePhoneNumbers';
import { get } from 'lodash';
import validator from '@/utils/validators';

const { Option } = Select;

const PhoneInput = (props: any) => {
  const initialPhoneCode = get(props, 'value.code', '1');
  const initialPhoneNumber = get(props, 'value.number', '');
  const initialPhoneExt = get(props, 'value.ext', '');

  const options = codePhoneNumber.map((el: string) => (
    <Option key={el} value={el} className="font-weight-bold">
      +{el}
    </Option>
  ));

  const [phoneCode, setPhoneCode] = useState<string>(initialPhoneCode);
  const [phoneNumber, setPhoneNumber] = useState<string>(initialPhoneNumber);
  // const [phoneExt, setPhoneExt] = useState<string>(initialPhoneExt);

  const onChange = (field: { [key: string]: string }) => {
    if (props.onChange)
      props.onChange({
        code: phoneCode,
        number: phoneNumber,
        // ext: phoneExt,
        ...field,
      });
  };

  const handleChangeCode = (code: string) => {
    setPhoneCode(code);
    onChange({ code });
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    onChange({ number: e.target.value });
  };
  // const handleChangeExt = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPhoneExt(e.target.value);
  //   onChange({ ext: e.target.value });
  // };

  return (
    <div>
      <div className="ant-col ant-form-item-label">
        <label htmlFor={props.name}>{props.label}</label>
      </div>

      <div className="d-flex">
        <div style={{ marginRight: 10 }}>
          <Select value={phoneCode} onChange={handleChangeCode}>
            {options}
          </Select>
        </div>

        <Form.Item
          style={{ marginRight: 10, width: 300 }}
          name={props.name}
          rules={[validator.usaPhone, props.required && { required: true, message: 'Required' }]}
        >
          <Input placeholder="Phone Number" value={phoneNumber} onChange={handleChangeNumber} />
        </Form.Item>

        {/*<Form.Item name="ext1" style={{ width: 100 }} rules={[validator.maxlength6]}>*/}
        {/*  <Input placeholder="Ext" value={phoneExt} onChange={handleChangeExt} />*/}
        {/*</Form.Item>*/}
      </div>
    </div>
  );
};
export default PhoneInput;
