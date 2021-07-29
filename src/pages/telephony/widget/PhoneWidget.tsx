import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Device } from '@twilio/voice-sdk';
import { IClient, IClientQueryParams } from '@/pages/client/types';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

let device: Device;
let call: { reject: () => void };

export interface IProps {
  callClient: () => void;
  row: IClient;
  queryParams: IClientQueryParams;
  open: (arg: any) => void;
  generateTwilioAccessToken: () => void;
}

interface ICallClient {
  clientPhone: string;
  clientId: string;
}

const PhoneWidget = (props: IProps) => {
  const closePanel = get(props, 'closePanel', null);

  const [status, setStatus] = useState('');

  useEffect(() => {
    twilioRegisterDevice();
    return () => {};
  }, []);

  async function twilioRegisterDevice() {
    const data = await props.generateTwilioAccessToken();

    const twilioAccessToken = get(data, 'payload.token');

    device = new Device(twilioAccessToken, {
      debug: true,
      answerOnBridge: true,
      // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
      // providing better audio quality in restrained network conditions. Opus will be default in 2.0.
      // @ts-ignore
      codecPreferences: ['opus', 'pcmu'],
    });

    device.on('registered', function () {
      setStatus('registered');
      console.log('Twilio.Device Ready to make and receive calls!');
    });

    device.on('error', function (error) {
      setStatus('error');
      console.log('Twilio.Device Error: ' + error.message);
    });

    device.on('incoming', (currentCall) => {
      setStatus('incoming');
      call = currentCall;
      console.log('Inc');
    });

    // Device must be registered in order to receive incoming calls
    device.register();
  }

  const hangupCall = () => {
    device.disconnectAll();
  };

  const rejectIncomingCall = () => {
    call.reject();
    setStatus('registered');
  };

  const openPanel = () => {
    props.open({
      title: 'Calls',
      component: 'PhonePad',
      place: '',
      width: 380,
      phoneNumber: `+17075901867`,
      device: device,
    });
  };

  return (
    <div className="phoneWidget">
      {status}

      {status === 'incoming' && <button onClick={rejectIncomingCall}>Reject</button>}
      {/*{checked && <button onClick={openPanel}>Call</button>}*/}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Sidepanel: state.Sidepanel,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  closePanel: () => dispatch({ type: 'Sidepanel/close' }),
  generateTwilioAccessToken: () => dispatch({ type: 'PhonePad/generateTwilioAccessToken' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneWidget);
