import React from 'react';
import { connect } from 'umi';
import VendorTypeForm from '@/pages/vendorType/form/VendorTypeForm';
import { IVendorType } from '@/pages/vendorType/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IVendorType) => void;
  loadingEffects: ILoadingEffects;
}

const VendorTypeFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IVendorType) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.VendorTypeForm/create', false);

  return <VendorTypeForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IVendorType) => dispatch({ type: 'VendorTypeForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorTypeFormCreateWrapper);
