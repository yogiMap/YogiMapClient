import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import FloatSelect from '@/pages/utils/FloatSelect';

const { Option } = Select;

interface IProps {
  searchStateList: (country: string) => void;
  loadingEffects: ILoadingEffects;
  SearchInput: any;
  onChange?: (value: string) => void;
  value?: string;
  countryName?: string;
}

const CountryStatesSearchInput = (props: IProps) => {
  const { countryName = '' } = props;
  const value = get(props, 'value', '');
  const [selectedState, setSelectedState] = useState('');
  const [initialCountry] = useState(countryName);

  const isLoading = get(props, 'loadingEffects.SearchInput/stateSearch', false);
  const stateList: [string] = get(props, 'SearchInput.stateList', []);

  useEffect(() => {
    if (initialCountry !== countryName) props.searchStateList(countryName);
  }, [countryName]);

  const onFocus = () => {
    if (!stateList.length) props.searchStateList(countryName);
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
    <>
      <FloatSelect
        label="State"
        placeholder="Select a State"
        list={['Only me', '2-10 people', '11-20 people', '20+ people']}
        defaultValue={selectedState}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        onSelect={onSelect}
        options={options}
        showSearch
        disabled={!countryName}
      />
    </>
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
