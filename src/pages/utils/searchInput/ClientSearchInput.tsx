import React, { useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { debounce, get } from 'lodash';
import { IClient } from '@/pages/client/types';
import { ILoadingEffects } from '@/types';
import PhoneView from '@/pages/telephony/PhoneView';

const { Option } = Select;

interface IProps {
  search: (clientName: string) => void;
  loadingEffects: ILoadingEffects;
  SearchInput: any;
  onChange?: (value: string) => void;
  name?: string;
  value?: {
    name: string;
  };
  disabled?: boolean;
}

const ClientSearchInput = (props: IProps) => {
  const name = get(props, 'value.name', '');
  const disabled = get(props, 'disabled', false);
  const [selectedName, setSelectedName] = useState(name);

  const isLoading = get(props, 'loadingEffects.SearchInput/clientSearch', false);

  const list: IClient[] = get(props, 'SearchInput.client.list', []);

  const onFocus = () => {
    if (!list.length) props.search('');
  };

  const onSearch = debounce((value) => {
    if (value) props.search(value);
  }, 500);

  const onSelect = (value = '') => {
    if (props.onChange) props.onChange(value);
  };

  const onChange = (v: string) => {
    setSelectedName(
      get(
        list.find((el) => el._id === v),
        'name',
        '',
      ),
    );
  };

  const options = list.map((el: IClient) => (
    <Option key={el._id} value={el._id} className="font-weight-bold">
      {el.name}
      <div className="option">
        <div className="small d-flex justify-content-between text-muted">
          <div>{el.email}</div>
          <PhoneView phone={el.phoneNumber} />
        </div>
      </div>
    </Option>
  ));

  return (
    <Select
      placeholder={'Select a client'}
      disabled={disabled}
      value={selectedName}
      showSearch
      defaultValue={name}
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
  search: (clientName: string) => dispatch({ type: 'SearchInput/clientSearch', payload: clientName }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientSearchInput);
