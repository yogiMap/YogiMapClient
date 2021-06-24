import React from 'react';
import { connect } from 'umi';
import { IClient } from '@/pages/client/types';
import ClientDetailsFormWrapper from '@/pages/client/info/ClientDetailsFormWrapper';
import { ILoadingEffects } from '@/types';
// import { Button } from 'antd';

interface IProps {
  ClientInfo: IClient;
  loadingEffects: ILoadingEffects;
  close: () => void;
}

const ClientInfoFormWrapper = (props: IProps) => {
  return (
    <>
      {/*<Button className="mt-1 float-end" htmlType="submit" onClick={() => props.close()}>*/}
      {/*  Cancel*/}
      {/*</Button>*/}
      <ClientDetailsFormWrapper />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  ClientInfo: state.ClientInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  close: () => dispatch({ type: 'Sidepanel/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientInfoFormWrapper);
