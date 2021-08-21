import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface IProps {
  list: string[];
  label: string;
  value?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  onChange?: () => void;
  required?: boolean;
}

const FloatSelect = (props: IProps) => {
  const [focus, setFocus] = useState(false);
  let { label, value, placeholder, type, list } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? 'label as-label' : 'label as-placeholder';

  const options = list.map((el: string) => (
    <Option key={el} value={el}>
      {el}
    </Option>
  ));

  return (
    <div className="float-label" onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      <Select
        value={value}
        showSearch
        // defaultValue={selectedName}
        optionFilterProp="children"
        // onFocus={onFocus}
        onChange={props.onChange}
        // onSearch={onSearch}
        // onSelect={onSelect}
        // loading={isLoading}
      >
        {options}
      </Select>
      <label className={labelClass}>{isOccupied ? label : placeholder}</label>
    </div>
  );

  // let value = get(props, 'value', '');
  //
  // const [selectedName, setSelectedName] = useState(value);
  //
  // const isLoading = get(props, 'loadingEffects.SearchInput/countrySearch', false);
  //
  // const countryList: [string] = get(props, 'SearchInput.countryList', []);
  //
  // const onFocus = () => {
  //   if (!countryList.length) props.searchCountryList();
  // };
  //
  // const onSearch = debounce((value) => {
  //   if (value) props.searchCountryList();
  // }, 500);
  //
  // const onSelect = (value = '') => {
  //   if (props.onChange) props.onChange(value);
  // };
  //
  // const onChange = (v: string) => {
  //   const country = get(
  //     countryList.find((el: string) => el === v),
  //     '',
  //     '',
  //   );
  //   setSelectedName(country);
  //   // props.searchStateList(v);
  // };
};

// const mapStateToProps = (state: any) => ({
//   SearchInput: state.SearchInput,
//   loadingEffects: state.loading.effects,
// });
//
// const mapDispatchToProps = (dispatch: any) => ({
//   searchCountryList: () => dispatch({ type: 'SearchInput/countrySearch' }),
// });

export default FloatSelect;
