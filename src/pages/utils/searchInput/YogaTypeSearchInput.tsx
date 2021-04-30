import React, { useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { debounce, get } from 'lodash';
import { ILoadingEffects } from '@/types';

const { Option } = Select;

type ITimeZoneSearch = { timeZone: string } | '';

interface IProps {
  timeZoneSearch: (arg: ITimeZoneSearch) => void;
  loadingEffects: ILoadingEffects;
  SearchInput: any;
  onChange?: (value: string) => void;
  value?: string;
}

const TimeZoneSearchInput = (props: IProps) => {
  const value = get(props, 'value', '');

  const isLoading = get(props, 'loadingEffects.SearchInput/timeZoneSearch', false);

  const timeZoneList: [ITimeZoneSearch] = get(props, 'SearchInput.timeZoneList', []);

  const [selectedName, setSelectedName] = useState('');

  const onFocus = () => {
    if (!timeZoneList.length) props.timeZoneSearch('');
  };

  const onSearch = debounce((value) => {
    if (value) props.timeZoneSearch(value);
  }, 500);

  const onSelect = (value = '') => {
    if (props.onChange) props.onChange(value);
  };

  const onChange = (v: any) => {
    setSelectedName(
      get(
        timeZoneList.find((el) => el === v),
        'timeZone',
        '',
      ),
    );
  };

  const options = timeZoneList.map((el: any) => (
    <Option key={el} value={el}>
      {el}
    </Option>
  ));

  return (
    <Select
      value={value}
      showSearch
      defaultValue={selectedName}
      placeholder="Select a TimeZone"
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
  timeZoneSearch: (payload: ITimeZoneSearch) => dispatch({ type: 'SearchInput/timeZoneSearch', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeZoneSearchInput);
