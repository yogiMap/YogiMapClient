import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { debounce, get } from 'lodash';
import { ILoadingEffects } from '@/types';
const { Option } = Select;

interface IProps {
  searchCountryList: () => void;
  loadingEffects: ILoadingEffects;
  SearchInput: any;
  searchStateList: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
}

const CountrySearchInput = (props: IProps) => {
  let value = get(props, 'value', '');

  const [selectedName, setSelectedName] = useState('United States');

  const isLoading = get(props, 'loadingEffects.SearchInput/countrySearch', false);

  const countryList: [string] = get(props, 'SearchInput.countryList', []);

  useEffect(() => {
    props.searchCountryList();
    value ? props.searchStateList(value) : props.searchStateList('United States');
  }, []);

  const onFocus = () => {
    if (!countryList.length) props.searchCountryList();
  };

  const onSearch = debounce((value) => {
    if (value) props.searchCountryList();
  }, 500);

  const onSelect = (value = '') => {
    if (props.onChange) props.onChange(value);
  };

  const onChange = (v: string) => {
    const country = get(
      countryList.find((el: string) => el === v),
      '',
      '',
    );
    setSelectedName(country);
    props.searchStateList(v);
  };

  const options = countryList.map((el: string) => (
    <Option key={el} value={el}>
      {el}
    </Option>
  ));

  return (
    <Select
      value={value}
      showSearch
      defaultValue={selectedName}
      placeholder="Select a Country"
      optionFilterProp="children"
      onFocus={onFocus}
      onChange={onChange}
      onSearch={onSearch}
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
  searchCountryList: () => dispatch({ type: 'SearchInput/countrySearch' }),
  searchStateList: (payload: string) => dispatch({ type: 'SearchInput/stateSearch', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountrySearchInput);
