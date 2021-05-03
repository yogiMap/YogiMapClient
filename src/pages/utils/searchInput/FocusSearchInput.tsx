import React, { useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { debounce, get } from 'lodash';
import { ILoadingEffects } from '@/types';

const { Option } = Select;

type IFocusSearch = { focus: string } | '';

interface IProps {
  focusSearch: (arg: IFocusSearch) => void;
  loadingEffects: ILoadingEffects;
  SearchInput: any;
  onChange?: (value: string) => void;
  value?: string;
}

const FocusSearchInput = (props: IProps) => {
  const value = get(props, 'value', '');

  const isLoading = get(props, 'loadingEffects.SearchInput/focusSearch', false);

  const focusList: [IFocusSearch] = get(props, 'SearchInput.focusList', []);

  const [selectedName, setSelectedName] = useState('');

  const onFocus = () => {
    if (!focusList.length) props.focusSearch('');
  };

  const onSearch = debounce((value) => {
    if (value) props.focusSearch(value);
  }, 500);

  const onSelect = (value = '') => {
    if (props.onChange) props.onChange(value);
  };

  const onChange = (v: any) => {
    setSelectedName(
      get(
        focusList.find((el) => el === v),
        'focus',
        '',
      ),
    );
  };

  const options = focusList.map((el: any) => (
    <Option key={el} value={el}>
      {el}
    </Option>
  ));
  return (
    <Select
      value={value}
      showSearch
      defaultValue={selectedName}
      placeholder="Select a Focus"
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
  focusSearch: (payload: IFocusSearch) => dispatch({ type: 'SearchInput/focusSearch', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusSearchInput);
