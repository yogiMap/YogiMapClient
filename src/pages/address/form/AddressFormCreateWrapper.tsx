import React from 'react';
import { connect } from 'umi';
import AddressForm from '@/pages/address/form/AddressForm';
import { IAddress } from '@/pages/address/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IAddress) => void;
  loadingEffects: ILoadingEffects;
}

const AddressFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IAddress) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.AddressForm/create', false);

  return <AddressForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IAddress) => dispatch({ type: 'AddressForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressFormCreateWrapper);
