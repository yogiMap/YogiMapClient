import React, { useEffect } from 'react';
import { Button, Form, Input, Select, Empty } from 'antd';
import { connect } from 'umi';
import { get } from 'lodash';
import ClientMessageForm from './form/ClientMessageForm';
import ClientMessage from './ClientMessage';

interface IMessage {
  to: string;
  body: string;
  client: string;
}

interface IProps {
  // isLoading: boolean;
  send: (arg: IMessage) => void;
  messageSearch: (arg: any) => void;
  items: any;
  clientId: string;
}

const ClientMessagesPhoneList = (props: IProps) => {
  const isLoading = get(props, 'loadingEffects.ClientForm/create', false);
  const phoneNumber: string = get(props, 'clientInfo.phoneNumber', '');
  const client = get(props, 'clientInfo._id', '');
  const items = get(props, 'items');
  console.log('ITEMS', items);

  const onFinish = (values: IMessage) => {
    props.send({ ...values, to: phoneNumber, client });
  };

  const messages = items.map((item: any) => <ClientMessage key={item._id} item={item} />);

  return (
    <div>
      <div>{messages}</div>
      <div>
        <ClientMessageForm onFinish={onFinish} isLoading={isLoading} phoneNumber={phoneNumber} />
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  clientInfo: state.ClientInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  send: (payload: IMessage) => dispatch({ type: 'ClientMessageForm/send', payload }),
  messageSearch: (payload: any) => dispatch({ type: 'ClientMessage/search', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientMessagesPhoneList);
