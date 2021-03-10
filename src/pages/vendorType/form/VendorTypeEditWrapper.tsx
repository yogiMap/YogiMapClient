import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import VendorTypeForm from '@/pages/vendorType/form/VendorTypeForm';
import { IVendorType } from '@/pages/vendorType/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (vendorTypeId: string) => void;
  reset: () => void;
  updateById: any;
  vendorTypeInfo: IVendorType;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const VendorTypeEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const vendorTypeId: string = get(props, 'sidepanel.vendorTypeId', '');

  const isLoadingGet = get(props, 'loadingEffects.VendorTypeForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.VendorTypeForm/updateById', false);

  useEffect(() => {
    props.getById(vendorTypeId);
  }, []);

  const onFinish = (values: IVendorType) => {
    props.updateById({ values, vendorTypeId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <VendorTypeForm
      onFinish={onFinish}
      initialValues={props.vendorTypeInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  vendorTypeInfo: state.VendorTypeForm.vendorTypeInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'VendorTypeForm/reset' }),
  updateById: (payload: IVendorType) => dispatch({ type: 'VendorTypeForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'VendorTypeForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VendorTypeEditWrapper));
