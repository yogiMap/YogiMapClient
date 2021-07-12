import React from 'react';
import { connect, Link } from 'umi';
import { IClient } from '@/pages/client/types';
import { ILoadingEffects } from '@/types';
import { get } from 'lodash';
import RenderPhoneNumber from '@//pages/utils/phone/phoneNumberRendering/PhoneNumbersRendering';
import { Button } from 'antd';

interface IProps {
  ClientInfo: IClient;
  loadingEffects: ILoadingEffects;
  callClient: (arg: ICallClient) => void;
  hangUpCall: () => void;
}

interface ICallClient {
  phoneNumber: string;
  userId: string;
}

const ClientInfo = (props: IProps) => {
  const name = get(props, 'ClientInfo.name', '');
  const email = get(props, 'ClientInfo.email', '');
  const phone = get(props, 'ClientInfo.phoneNumber', {});
  const teacherAccount = get(props, 'ClientInfo.teacherAccount', '');
  const clientId = get(props, 'match.params.clientId', '');

  const callUser = () => {
    props.callClient({ phoneNumber: phone, userId: clientId });
  };

  const hangUpCall = () => {
    props.hangUpCall;
  };

  if (!props.ClientInfo) return null;
  return (
    <>
      <div className="anchorTop" />

      <h5 id="clientDetails" className="anchor">
        Client Details
      </h5>

      <div className="row">
        <div className="col-6">
          <div className="d-flex justify-content-end-">
            <span className="text-muted me-1">Name</span>
            <span className="text-colored-first">{name} </span>
          </div>

          <div className="d-flex justify-content-end-">
            <span className="text-muted me-1">Email</span>
            <a href={'mailto:' + email}>{email}</a>
          </div>

          <div className="d-flex justify-content-end-">
            <span className="text-muted me-1">Phone</span>
            <RenderPhoneNumber phoneNumberAll={phone} />
          </div>

          <Button type="primary" htmlType="submit" shape="round" onClick={callUser}>
            Call
          </Button>

          <Button type="primary" danger shape="round" onClick={hangUpCall}>
            Hang Up
          </Button>
        </div>

        <div className="col-6">
          <div className="d-flex justify-content-end-">
            <span className="text-muted me-1">TeacherAccount</span>
            <span className="me-1">{teacherAccount}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <h5 id="schedule" className="anchor">
          Schedule
        </h5>
        <p>coming soon....</p>
      </div>

      <div className="row">
        <h5 id="messages" className="anchor">
          <Link to={`/client/${clientId}/messages`} className="text-colored-second">
            Messages
          </Link>
        </h5>
        <p>coming soon....</p>
        {/*<ClientMessagesPhone clientId={clientId} />*/}
      </div>

      <div className="row">
        <h5 id="calls" className="anchor">
          Calls
        </h5>
        <p>coming soon....</p>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ClientInfo: state.ClientInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  callClient: (payload: ICallClient) => dispatch({ type: 'ClientCalls/callClient', payload }),
  hangUpCall: () => dispatch({ type: 'ClientCalls/hangUpCall' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);
