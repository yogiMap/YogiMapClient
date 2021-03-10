import React, { useEffect } from 'react';
import { connect } from 'umi';
import VendorForm from '@/pages/vendor/form/VendorForm';
import { IVendor } from '@/pages/vendor/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IVendor) => void;
  vendorTypeSearch: () => void;
  loadingEffects: ILoadingEffects;
}

const VendorFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IVendor) => {
    props.create(values);
  };

  useEffect(() => {
    props.vendorTypeSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.VendorTypeForm/create', false);
  const vendorTypeList = get(props, 'vendorTypeList', []);

  return <VendorForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} vendorTypeList={vendorTypeList} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  vendorTypeList: state.VendorForm.vendorTypeList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IVendor) => dispatch({ type: 'VendorTypeForm/create', payload }),
  vendorTypeSearch: () => dispatch({type: 'VendorForm/vendorTypeSearch'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorFormCreateWrapper);
