import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import ClientForm from '@/pages/client/form/ClientForm';
import { IClient } from '@/pages/client/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (clientId: string) => void;
  reset: () => void;
  updateById: any;
  clientInfo: IClient;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ClientFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const clientId: string = get(props, 'sidepanel.clientId', '');

  const isLoadingGet = get(props, 'loadingEffects.ClientForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.ClientForm/updateById', false);

  useEffect(() => {
    props.getById(clientId);
  }, []);

  const onFinish = (values: IClient) => {
    props.updateById({ values, clientId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  const isLoading = get(props, 'loadingEffects.ClientForm/create', false);

  return (
    <ClientForm initialValues={props.clientInfo} onFinish={onFinish} submitButtonText="Save" isLoading={isLoading} />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  clientInfo: state.ClientForm.clientInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'ClientForm/reset' }),
  updateById: (payload: IClient) => dispatch({ type: 'ClientForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'ClientForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientFormEditWrapper));
