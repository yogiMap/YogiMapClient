import React, { useEffect } from 'react';
import { Badge, Button, Menu, Affix } from 'antd';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { IClient } from '@/pages/client/types';
import { Anchor } from 'antd';

interface IProps {
  children: any;
  clientGetInfoById: (id: string) => void;
  clientReset: () => void;
  open: (arg: ISidepanel) => void;
  ClientInfo: IClient;
}

const ClientLayout = (props: IProps) => {
  const clientId = get(props, 'match.params.clientId');
  const tab = get(props, 'location.pathname', '').split('/').pop();
  const clientName = get(props, 'ClientInfo.name');

  const messagesCount = get(props, 'ClientInfo.messages.length');
  const callsCount = get(props, 'ClientInfo.calls.length', '');

  useEffect(() => {
    props.clientGetInfoById(clientId);

    return () => {
      props.clientReset();
    };
  }, [clientId]);

  const clientEdit = () => {
    props.open({
      title: 'Edit Client',
      component: 'ClientInfoDetailsFormEdit',
      place: '',
      width: '80%',
      clientId,
    });
  };

  if (!props.ClientInfo) return null;

  return (
    <>
      <div className="row">
        <div className="col-lg-2 col-md-2 col-2 mt-2 h4">
          <h5>
            <Link to={`/client`}>←</Link> {`${clientName}`}
          </h5>
        </div>
        <div className="col-lg-10 col-md-10 col-10">
          <Button className="float-end mt-2 mx-5" shape="round" htmlType="submit" onClick={clientEdit}>
            Edit
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-2 col-md-2 col-2 border-end">
          <Affix offsetTop={70}>
            <Anchor affix={false}>
              <Menu selectedKeys={[tab]} mode="vertical" className="no-padding-tabs position-fixed ms-3 border-0">
                <div key="info">
                  <Anchor.Link href={`/client/${clientId}/info#clientDetails`} title="Client Details" />
                </div>

                <div key="messages" className="d-flex align-items-center">
                  <div className="ant-anchor-link">
                    <Link to={`/client/${clientId}/messages`}>Messages</Link>
                    <Badge count={messagesCount} />
                  </div>
                </div>

                <div key="calls" className="d-flex align-items-center">
                  <div className="ant-anchor-link">
                    <Link to={`/client/${clientId}/calls`}>Calls</Link>
                    <Badge count={callsCount} />
                  </div>
                </div>
              </Menu>
            </Anchor>
          </Affix>
        </div>

        <div className="col-lg-10 col-md-10 col-2 mt-2">{props.children}</div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ClientInfo: state.ClientInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  clientGetInfoById: (payload: string) => dispatch({ type: 'ClientInfo/getInfoById', payload }),
  clientReset: () => dispatch({ type: 'ClientInfo/reset' }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  callClient: (payload: IClient) => dispatch({ type: 'ClientCalls/callClient', payload }),
  hangUpCall: () => dispatch({ type: 'ClientCalls/hangUpCall' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientLayout);
