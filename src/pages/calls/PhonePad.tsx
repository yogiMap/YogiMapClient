import React, { useEffect } from 'react';
import '@/pages/calls/style.css';
import { connect } from 'umi';
import phoneCall from '@/icons/phone-call.svg';
import { get } from 'lodash';
import { IClient, IClientQueryParams } from '@/pages/client/types';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { Device } from '@twilio/voice-sdk';

let device: Device;

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

// MAKE AN OUTGOING CALL

async function makeOutgoingCall(phoneNumber: string) {
  const params = {
    // get the phone number to call from the DOM
    To: phoneNumber,
  };

  if (device) {
    console.log(`Attempting to call ${params.To} ...`);

    // Twilio.Device.connect() returns a Call object
    const call = await device.connect({ params });

    // add listeners to the Call
    // "accepted" means the call has finished connecting and the state is now "open"
    call.addListener('accept', console.log);
    call.addListener('disconnect', console.log);
  } else {
    console.log('Unable to make call.');
  }
}

function PhonePad(props: IProps) {
  const phoneNumber = get(props, 'Sidepanel.phoneNumber', '');
  const userId = get(props, 'Sidepanel.userId', '');
  console.log(' == userPhone from PhonePad==: ', phoneNumber);

  useEffect(() => {
    twilioRegisterDevice();

    return () => {};
  }, []);

  const makeCall = () => {
    makeOutgoingCall(phoneNumber).then((r) => r);
  };

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
      console.log('Twilio.Device Ready to make and receive calls!');
    });

    device.on('error', function (error) {
      console.log('Twilio.Device Error: ' + error.message);
    });

    // Device must be registered in order to receive incoming calls
    device.register();
  }

  return (
    <div>
      <div className="container-pad center-block">
        <div className="output">{phoneNumber}</div>

        <div className="row text-center">
          <div className="col digit-pad" id="one">
            1
          </div>

          <div className="col digit-pad" id="two">
            2
          </div>

          <div className="col digit-pad" id="three">
            3
          </div>
        </div>

        <div className="row text-center">
          <div className="col digit-pad" id="four">
            4
          </div>

          <div className="col digit-pad" id="five">
            5
          </div>

          <div className="col digit-pad" id="six">
            6
          </div>
        </div>
        <div className="row text-center">
          <div className="col digit-pad" id="seven">
            7
          </div>
          <div className="col digit-pad" id="eight">
            8
          </div>
          <div className="col digit-pad" id="nine">
            9
          </div>
        </div>
        <div className="row text-center">
          <div className="col digit-pad"> * </div>
          <div className="col digit-pad"> 0 </div>
          <div className="col digit-pad"> # </div>
        </div>

        <div className="row text-center">
          <div className="col digit-pad"> </div>

          <div className="col text-center">
            <button className="btn" onClick={makeCall}>
              <img src={phoneCall} alt="" height="44" />
            </button>
          </div>

          <div className="col digit-pad"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  Sidepanel: state.Sidepanel,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  callUser: (payload: ICallClient) => dispatch({ type: 'ClientDashboard/callUser', payload: '17075901867' }),
  generateTwilioAccessToken: () => dispatch({ type: 'PhonePad/generateTwilioAccessToken' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonePad);
