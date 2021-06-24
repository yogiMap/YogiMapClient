import React, { useEffect } from 'react';
import { connect } from 'umi';
import { IClient } from '@/pages/client/types';
import ClientDefaultAddressForm from '@/pages/client/info/ClientDefaultAddressForm';
import { get } from 'lodash';
import { IAddress } from '@/pages/address/types';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { ILoadingEffects } from '@/types';

interface IProps {
  ClientInfo: IClient;
  DefaultAddress: IAddress;
  defaultAddressGetByClientId: (id: string) => void;
  updateById: any;
  create: (arg: IAddress) => void;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ClientDefaultAddressFormWrapper = (props: IProps) => {
  const clientId: string = get(props, 'ClientInfo._id');
  const addressId: string = get(props, 'DefaultAddress._id', '');

  const isLoadingGet = get(props, 'loadingEffects.ClientInfo/getDefaultAddressByClientId', false);
  const isLoadingUpdate = get(props, 'loadingEffects.AddressForm/updateById', false);
  const isLoadingCreate = get(props, 'loadingEffects.ClientAddressForm/create', false);

  useEffect(() => {
    if (clientId) props.defaultAddressGetByClientId(clientId);
  }, [clientId]);

  const onFinish = (values: IAddress) => {
    const client: any = { ...props.ClientInfo };
    if (addressId) props.updateById({ values: { ...values, client: client }, addressId });
    else {
      props.create({ ...values, client: clientId });
    }
  };
  if (isLoadingGet) return <Spin indicator={antIcon} />;
  return (
    <ClientDefaultAddressForm
      isLoading={addressId ? isLoadingUpdate : isLoadingCreate}
      initialValues={props.DefaultAddress}
      onFinish={onFinish}
    />
  );
};

const mapStateToProps = (state: any) => ({
  ClientInfo: state.ClientInfo,
  DefaultAddress: state.ClientInfo.defaultAddress,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  defaultAddressGetByClientId: (payload: string) =>
    dispatch({ type: 'ClientInfo/getDefaultAddressByClientId', payload }),
  updateById: (payload: IAddress) => dispatch({ type: 'AddressForm/updateById', payload }),
  create: (payload: IAddress) => dispatch({ type: 'ClientAddressForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDefaultAddressFormWrapper);
