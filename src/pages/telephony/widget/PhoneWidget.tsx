import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Device } from '@twilio/voice-sdk';
import { IClient, IClientQueryParams } from '@/pages/client/types';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import PhonePad from '@/pages/telephony/widget/PhonePad';

let device: Device;
let call: any;

export interface IProps {
  callClient: () => void;
  row: IClient;
  queryParams: IClientQueryParams;
  open: (arg: any) => void;
  generateTwilioAccessToken: () => void;
  callChangeStatus: (status: string) => void;
}

interface ICallClient {
  clientPhone: string;
  clientId: string;
}

// MAKE AN OUTGOING CALL
async function makeCall(phoneNumber: string) {
  const params = {
    // get the phone number to call from the DOM
    To: phoneNumber,
  };

  console.log('Before attempt');

  if (device) {
    console.log(`Attempting to call ${phoneNumber} ...`);
    // Twilio.Device.connect() returns a Call object
    const call = await device.connect({ params });

    // add listeners to the Call
    // "accepted" means the call has finished connecting and the state is now "open"
    // call.addListener('accept', console.log);
    // call.addListener('disconnect', console.log);

    call.on('ringing', () => {
      console.log('ringing');
    });

    call.on('disconnect', () => {
      console.log('disconnect');
    });

    call.on('accept', () => {
      console.log('accept');
    });
  } else {
    console.log('Unable to make call.');
  }
}

const PhoneWidget = (props: IProps) => {
  const closePanel = get(props, 'closePanel', null);
  const userId = get(props, 'Account._id', '');
  const twilioAccessToken = get(props, 'PhoneWidget.token', '');
  const callStatus = get(props, 'PhoneWidget.status', '');
  const phoneNumber = get(props, 'PhoneWidget.phoneNumber', '');
  const userSipPhoneId = get(props, 'Account.sipPhone', '');

  useEffect(() => {
    console.log('UE', userId);
    if (userId && userSipPhoneId) props.generateTwilioAccessToken();
  }, [userId]);

  useEffect(() => {
    if (twilioAccessToken) twilioRegisterDevice();
  }, [twilioAccessToken]);

  useEffect(() => {
    if (callStatus === 'outgoing' && phoneNumber) {
      makeCall(phoneNumber);
    }
  }, [callStatus]);

  function twilioRegisterDevice() {
    console.log('Reg start');

    device = new Device(twilioAccessToken, {
      debug: true,
      answerOnBridge: true,
      // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
      // providing better audio quality in restrained network conditions. Opus will be default in 2.0.
      // @ts-ignore
      codecPreferences: ['opus', 'pcmu'],
    });

    device.on('registered', function () {
      props.callChangeStatus('registered');
      console.log('Twilio.Device Ready to make and receive calls!');
    });

    device.on('error', function (error) {
      props.callChangeStatus('error');

      console.log('Twilio.Device Error: ' + error.message);
    });

    device.on('incoming', (currentCall) => {
      props.callChangeStatus('incoming');
      call = currentCall;

      call.on('cancel', () => {
        console.log('cancel');
        props.callChangeStatus('registered');
      });

      console.log('Inc');
    });

    device.on('outgoing', (currentCall) => {
      console.log('outgoing');
    });

    // Device must be registered in order to receive incoming calls
    device.register();
  }

  const hangupCall = () => {
    console.log(device);
    console.log(call);
    props.callChangeStatus('registered');
    device.disconnectAll();
  };

  const rejectIncomingCall = () => {
    call.reject();
    props.callChangeStatus('registered');
  };

  if (!userId || !userSipPhoneId) return null;

  return (
    <div className="phoneWidget">
      {callStatus}

      {callStatus === 'incoming' && (
        <button className="btn btn-warning" onClick={rejectIncomingCall}>
          Reject
        </button>
      )}

      {callStatus === 'outgoing' && (
        <div>
          <button onClick={hangupCall}>Hangup</button>
        </div>
      )}

      {/*<PhonePad makeCall={makeCall} digitClick={console.log} />*/}

      {/*{checked && <button onClick={openPanel}>Call</button>}*/}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  User: state.User,
  Sidepanel: state.Sidepanel,
  PhoneWidget: state.PhoneWidget,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  closePanel: () => dispatch({ type: 'Sidepanel/close' }),
  generateTwilioAccessToken: () => dispatch({ type: 'PhoneWidget/generateTwilioAccessToken' }),
  callChangeStatus: (status: string) => dispatch({ type: 'PhoneWidget/callChangeStatus', payload: status }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneWidget);
