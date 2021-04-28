import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import AddressForm from '@/pages/address/form/AddressForm';
import { IAddress } from '@/pages/address/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (addressId: string) => void;
  reset: () => void;
  updateById: any;
  addressInfo: IAddress;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AddressFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const addressId: string = get(props, 'sidepanel.addressId', '');

  const isLoadingGet = get(props, 'loadingEffects.AddressForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.AddressForm/updateById', false);

  useEffect(() => {
    props.getById(addressId);
  }, []);

  const onFinish = (values: IAddress) => {
    props.updateById({ values, addressId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <AddressForm
      onFinish={onFinish}
      initialValues={props.addressInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  addressInfo: state.AddressForm.addressInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'AddressForm/reset' }),
  updateById: (payload: IAddress) => dispatch({ type: 'AddressForm/updateById', payload }),
  getById: (addressId: string) => dispatch({ type: 'AddressForm/getById', payload: addressId }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressFormEditWrapper));
