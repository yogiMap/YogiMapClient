import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import ClientInfoForm from '@/pages/client/info/ClientInfoForm';
import { IClient } from '@/pages/client/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  ClientInfo: IClient;
  updateById: any;
  loadingEffects: ILoadingEffects;
}

const ClientDetailsFormWrapper = (props: IProps) => {
  const clientId: string = get(props, 'ClientInfo._id', '');

  const isLoadingUpdate = get(props, 'loadingEffects.ClientInfo/updateById', false);

  const onFinish = (values: IClient) => {
    //update name before sending to server
    values.name = values.firstName + ' ' + values.lastName;
    props.updateById({ values, clientId });
  };

  if (!clientId) return null;

  return (
    <ClientInfoForm
      onFinish={onFinish}
      initialValues={props.ClientInfo}
      isLoading={isLoadingUpdate}
      submitButtonText="Save"
    />
  );
};

const mapStateToProps = (state: any) => ({
  ClientInfo: state.ClientInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateById: (payload: IClient) => dispatch({ type: 'ClientInfo/updateById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetailsFormWrapper);
