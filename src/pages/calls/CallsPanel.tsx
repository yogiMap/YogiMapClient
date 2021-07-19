import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get } from 'lodash';
import PhonePad from '@/pages/calls/PhonePad';

interface IProps {
  getTwilioToken: (arg: String) => void;
  incomingCall: (arg: {}) => void;
  endCall: (arg: {}) => void;
  close: () => void;
}

const CallsPanel = (props: IProps) => {
  const twilioDevice = get(props, 'twilioDevice', null);
  const activeConnection = get(props, 'activeConnection', null);
  const closePanel = get(props, 'closePanel', null);
  // const userId = get(props, 'Account._id', '');

  // const twilioDevice = get(props, 'twilioDevice', null);
  // const activeConnection = get(props, 'activeConnection', null);

  //
  // const acceptIncomingCall = () => {
  //   console.log('DECLINED====');
  //   if (activeConnection && activeConnection.direction === 'INCOMING') {
  //     activeConnection.accept()
  //   }
  // }
  const acceptIncomingCall = () => {
    console.log('Accepted====');
    if (activeConnection && activeConnection.direction === 'INCOMING') {
      activeConnection.accept();
    }
  };

  const rejectIncomingCall = () => {
    console.log('Declined====');
    if (activeConnection && activeConnection.direction === 'INCOMING') {
      activeConnection.reject();
      activeConnection.disconnect();
      props.endCall(activeConnection);
      closePanel();
    }
  };

  return (
    <div className="container center-block">
      <div className="row">
        <div className="col text-center">
          <button type="button" className="btn btn-danger" onClick={rejectIncomingCall}>
            Decline
          </button>
        </div>

        <div className="col text-center">
          <button type="button" className="btn btn-primary" onClick={acceptIncomingCall}>
            Accept
          </button>
        </div>

        {/*<div className="col-6">*/}
        {/*  <Button danger shape="circle" size="large" onClick={rejectIncomingCall}>*/}
        {/*    {' '}*/}
        {/*    Decline{' '}*/}
        {/*  </Button>{' '}*/}
        {/*</div>*/}

        {/*<div className="col-6">*/}
        {/*  <Button type="primary" shape="circle" size="large" onClick={acceptIncomingCall}>*/}
        {/*    {' '}*/}
        {/*    Accept{' '}*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>
      {/*@ts-ignore*/}
      <PhonePad />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  activeConnection: state.PhonePad.generateTwilioAccessToken,
});

const mapDispatchToProps = (dispatch: any) => ({
  getTwilioToken: (payload: any) => dispatch({ type: 'PhonePad/twilioWorker', payload }),
  incomingCall: (payload: any) => dispatch({ type: 'PhonePad/incomingCall', payload }),
  closePanel: () => dispatch({ type: 'Sidepanel/close' }),
  endCall: (payload: any) => dispatch({ type: 'PhonePad/endCall', payload }),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CallsPanel);
