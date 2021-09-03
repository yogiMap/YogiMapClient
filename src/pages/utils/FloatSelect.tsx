import React, { useState } from 'react';
import { Select } from 'antd';
const { Option } = Select;

interface IProps {
  list: string[];
  options?: typeof Option;
  label: string;
  value?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
  onChange?: (v: string) => void;
  onFocus?: () => void;
  onSelect?: () => void;
  onSearch?: (v: any) => void;
  required?: boolean;
  loading?: boolean;
  showSearch?: boolean;
  disabled?: boolean;
}

const FloatSelect = (props: IProps) => {
  const [focus, setFocus] = useState(false);
  let { label, value, placeholder, type, list } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? 'label as-label' : 'label as-placeholder';

  let options;
  if (!props.options && list.length) {
    options = list.map((el: string) => (
      <Option key={el} value={el}>
        {el}
      </Option>
    ));
  } else {
    options = props.options;
  }

  return (
    <div className="float-label" onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      <Select
        value={value}
        defaultValue={props.defaultValue}
        optionFilterProp="children"
        onFocus={props.onFocus}
        onChange={props.onChange}
        onSearch={props.onSearch}
        onSelect={props.onSelect}
        loading={props.loading}
        showSearch={props.showSearch}
        disabled={props.disabled}
      >
        {options}
      </Select>
      <label className={labelClass}>{isOccupied ? label : placeholder}</label>
    </div>
  );
};

export default FloatSelect;
