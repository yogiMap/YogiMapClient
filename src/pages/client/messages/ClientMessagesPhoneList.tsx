import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import ClientMessageForm from './form/ClientMessageForm';
import ClientMessage from './ClientMessage';

interface IMessage {
  body: string;
  clientId: string;
}

interface IProps {
  send: (arg: IMessage) => void;
  items: any;
  clientId: string;
}

const ClientMessagesPhoneList = (props: IProps) => {
  const isLoading = get(props, 'loadingEffects.ClientMessageForm/send', false);
  const phoneNumber: string = get(props, 'clientInfo.phoneNumber', '');
  const clientId = get(props, 'clientInfo._id', '');
  const items = get(props, 'items');

  const onFinish = (values: IMessage) => {
    props.send({ ...values, clientId });
  };

  return (
    <div>
      <div className="overflow-scroll">
        {items.map((item: any) => (
          <ClientMessage key={item._id} item={item} />
        ))}
      </div>

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
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientMessagesPhoneList);
