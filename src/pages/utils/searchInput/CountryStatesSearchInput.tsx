import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

const { Option } = Select;

interface IProps {
  searchStateList: (country: string) => void;
  loadingEffects: ILoadingEffects;
  SearchInput: any;
  onChange?: (value: string) => void;
  value?: string;
  country?: string;
}

const CountryStatesSearchInput = (props: IProps) => {
  const { country = '' } = props;
  const value = get(props, 'value', '');
  const [selectedState, setSelectedState] = useState('');
  const [initialCountry] = useState(country);

  const isLoading = get(props, 'loadingEffects.SearchInput/stateSearch', false);
  const stateList: [string] = get(props, 'SearchInput.stateList', []);

  useEffect(() => {
    if (initialCountry !== country) props.searchStateList(country);
  }, [country]);

  const onFocus = () => {
    if (!stateList.length) props.searchStateList(country);
  };

  const onSelect = (value = '') => {
    if (props.onChange) props.onChange(value);
  };

  const onChange = (v: string) => {
    setSelectedState(v);
  };

  const options = stateList.map((el: string) => (
    <Option key={el} value={el}>
      {el}
    </Option>
  ));

  return (
    <Select
      defaultValue={selectedState}
      showSearch
      disabled={!country}
      value={value}
      placeholder="Select a States"
      optionFilterProp="children"
      onFocus={onFocus}
      onChange={onChange}
      onSelect={onSelect}
      loading={isLoading}
    >
      {options}
    </Select>
  );
};

const mapStateToProps = (state: any) => ({
  SearchInput: state.SearchInput,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  searchStateList: (payload: string) => dispatch({ type: 'SearchInput/stateSearch', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryStatesSearchInput);
