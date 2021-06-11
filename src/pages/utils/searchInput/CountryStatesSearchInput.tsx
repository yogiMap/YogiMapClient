import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { debounce, get } from 'lodash';
import { ILoadingEffects } from '@/types';

const { Option } = Select;

interface IProps {
  searchStateList: (arg: string) => void;
  loadingEffects: ILoadingEffects;
  SearchInput: any;
  onChange?: (value: string) => void;
  value?: string;
}

const CountryStatesSearchInput = (props: IProps) => {
  const value = get(props, 'value', '');
  const [selectedState, setSelectedState] = useState('');
  const isLoading = get(props, 'loadingEffects.SearchInput/stateSearch', false);
  const stateList: [string] = get(props, 'SearchInput.stateList', []);

  useEffect(() => {
    setSelectedState('');
  }, [stateList]);

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
      // @ts-ignore
      autoComplete="dontshow"
      value={selectedState}
      showSearch
      disabled={isLoading}
      defaultValue={value}
      placeholder="Select a States"
      optionFilterProp="children"
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

export default connect(mapStateToProps)(CountryStatesSearchInput);
