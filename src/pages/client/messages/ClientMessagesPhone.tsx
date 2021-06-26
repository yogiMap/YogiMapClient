import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import ClientMessagesPhoneList from '@/pages/client/messages/ClientMessagesPhoneList';

interface IProps {
  clientId: string;
  messageSearch: (arg: any) => void;
}

const ClientMessagesPhone = (props: IProps) => {
  const clientId = get(props, 'match.params.clientId');
  const clientMessagesList = get(props, 'ClientMessage.messageList', []);

  useEffect(() => {
    props.messageSearch({ clientId });

    return () => {
      // props.addressReset();
    };
  }, []);

  return <ClientMessagesPhoneList items={clientMessagesList} clientId={clientId} />;
};

const mapStateToProps = (state: any) => ({
  ClientMessage: state.ClientMessage,
});

const mapDispatchToProps = (dispatch: any) => ({
  messageSearch: (payload: any) => dispatch({ type: 'ClientMessage/search', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientMessagesPhone);
