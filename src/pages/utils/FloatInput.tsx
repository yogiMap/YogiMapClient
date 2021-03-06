import React, { useState } from 'react';
import { Input } from 'antd';

interface IFloatInput {
  label: string;
  value?: string;
  name: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FloatInput = (props: IFloatInput) => {
  const [focus, setFocus] = useState(false);
  let { label, value, placeholder, type, required, name } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? 'label as-label' : 'label as-placeholder';

  const requiredMark = required ? <span className="text-danger">*</span> : null;

  return (
    <div className="float-label" onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      <Input onChange={props.onChange} qa-id={name} type={type} defaultValue={value} />
      <label className={labelClass}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>
    </div>
  );
};

export default FloatInput;
