import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import codePhoneNumber from '@/utils/codePhoneNumbers';
import { get } from 'lodash';
import validator from '@/utils/validators';

const { Option } = Select;

interface IPhoneInput {
  label: string;
  name: string;
  required: boolean;
  // ext: boolean;
}

const PhoneInput = (props: IPhoneInput) => {
  const initialPhoneCode = get(props, 'value.code', '1');
  const initialPhoneNumber = get(props, 'value.number', '');
  // const initialPhoneExt = get(props, 'value.ext', '');

  const options = codePhoneNumber.map((el: string) => (
    <Option key={el} value={el} className="font-weight-bold">
      +{el}
    </Option>
  ));

  const [phoneCode, setPhoneCode] = useState<string>(initialPhoneCode);
  const [phoneNumber, setPhoneNumber] = useState<string>(initialPhoneNumber);
  // const [phoneExt, setPhoneExt] = useState<string>(initialPhoneExt);

  const onChange = (field: { [key: string]: string }) => {
    if (props.onChange) {
      props.onChange({
        code: phoneCode,
        number: phoneNumber,
        // ext: phoneExt,
        ...field,
      });
    }
  };

  const handleChangeCode = (code: string) => {
    setPhoneCode(code);
    onChange({ code });
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    onChange({ number: e.target.value });
  };

  const handleChangeExt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneExt(e.target.value);
    onChange({ ext: e.target.value });
  };

  const phoneValidator = [validator.usaPhone];
  if (props.required) phoneValidator.push({ required: true, message: 'Please input your phone number' });

  const phoneCodeSelector = (
    <Form.Item name={`${props.name}_code`} initialValue={phoneCode} noStyle>
      <Select value={phoneCode} onChange={handleChangeCode} style={{ width: 70 }}>
        {options}
      </Select>
    </Form.Item>
  );

  return (
    <div>
      <div className="d-flex">
        <Form.Item name={`${props.name}_number`} label={props.label} rules={phoneValidator} initialValue={phoneNumber}>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handleChangeNumber}
            addonBefore={phoneCodeSelector}
          />
        </Form.Item>

        {/*{(props.ext || phoneExt) && (*/}
        {/*  <Form.Item*/}
        {/*    name={`${props.name}_ext`}*/}
        {/*    initialValue={phoneExt}*/}
        {/*    style={{ width: 100 }}*/}
        {/*    rules={[validator.maxlength6]}*/}
        {/*  >*/}
        {/*    <Input placeholder='Ext' value={phoneExt} onChange={handleChangeExt} />*/}
        {/*  </Form.Item>)}*/}
      </div>
      <div style={{ width: 90 }}></div>
    </div>
  );
};

export default PhoneInput;
