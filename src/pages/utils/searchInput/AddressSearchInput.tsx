import React, { useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { debounce, get } from 'lodash';
import { IAddress } from '@/pages/address/types';
import { ILoadingEffects } from '@/types';

const { Option } = Select;

interface IAddressSearch {
  clientId?: string;
  address?: string;
}

interface IProps {
  search: (args: IAddressSearch) => void;
  loadingEffects: ILoadingEffects;
  SearchInput: any;
  onChange?: (addressId: string) => void;
  value?: string;
  clientId?: string;
  disabled?: boolean;
}

const AddressSearchInput = (props: IProps) => {
  const value = get(props, 'value.address', '');
  const disabled = get(props, 'disabled', false);
  const clientId = get(props, 'clientId', '');

  const [selectedName, setSelectedName] = useState(value);

  const isLoading = get(props, 'loadingEffects.SearchInput/addressSearch', false);

  const list: IAddress[] = get(props, 'SearchInput.address.list', []);

  const onFocus = () => {
    props.search({ clientId });
  };

  const onSearch = debounce((address) => {
    if (address) props.search({ clientId, address });
  }, 500);

  const onSelect = (addressId = '') => {
    if (props.onChange) props.onChange(addressId);
  };

  const onChange = (v: string) => {
    setSelectedName(
      get(
        list.find((el) => el._id === v),
        'address',
        '',
      ),
    );
  };

  const options = list.map((el: IAddress) => (
    <Option key={el._id} value={el._id} className="font-weight-bold">
      {el.address} ({get(el, 'client.name')})
      <div className="option">
        <div className="small d-flex justify-content-between text-muted">
          <div>{el.city}</div>
          <div>{el.state}</div>
        </div>
      </div>
    </Option>
  ));

  return (
    <Select
      placeholder="Select an Address"
      disabled={disabled}
      value={selectedName}
      showSearch
      defaultValue={value}
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
  search: (payload: IAddressSearch) => dispatch({ type: 'SearchInput/addressSearch', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressSearchInput);
