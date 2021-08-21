import React, { useState } from 'react';
import { Input } from 'antd';

interface IFloatInput {
  label: string;
  value?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  onChange?: () => void;
  required?: boolean;
}

const FloatInput = (props: IFloatInput) => {
  const [focus, setFocus] = useState(false);
  let { label, value, placeholder, type } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? 'label as-label' : 'label as-placeholder';

  return (
    <div className="float-label" onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      <Input onChange={props.onChange} type={type} />
      <label className={labelClass}>{isOccupied ? label : placeholder}</label>
    </div>
  );
};

export default FloatInput;
