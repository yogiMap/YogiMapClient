import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import VendorForm from '@/pages/vendor/form/VendorForm';
import { IVendor } from '@/pages/vendor/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (vendorId: string) => void;
  reset: () => void;
  vendorTypeSearch: () => void;
  updateById: any;
  vendorInfo: IVendor;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const VendorEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const vendorId: string = get(props, 'sidepanel.vendorId', '');

  const isLoadingGet = get(props, 'loadingEffects.VendorTypeForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.VendorTypeForm/updateById', false);
  const vendorTypeList = get(props, "vendorTypeList", []);


  useEffect(() => {
    props.getById(vendorId);
    props.vendorTypeSearch();
  }, []);

  const onFinish = (values: IVendor) => {
    props.updateById({ values, vendorId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <VendorForm
      onFinish={onFinish}
      initialValues={props.vendorInfo}
      submitButtonText="Update"
      vendorTypeList={vendorTypeList}
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  vendorInfo: state.VendorForm.vendorInfo,
  loadingEffects: state.loading.effects,
  vendorTypeList: state.VendorForm.vendorList,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'VendorTypeForm/reset' }),
  updateById: (payload: IVendor) => dispatch({ type: 'VendorTypeForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'VendorTypeForm/getById', payload }),
  vendorTypeSearch: () => dispatch({type: 'VendorForm/vendorTypeSearch'})
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VendorEditWrapper));
