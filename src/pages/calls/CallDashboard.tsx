import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
  getTwilioToken: (arg: String) => void;
  incomingCall: (arg: {}) => void;
  endCall: (arg: {}) => void;
}

const CallDashboard = (props: IProps) => {
  const clientId = get(props, 'clientList.clientId', '');
  const userId = get(props, 'Account._id', '');
  const userPhone = 'clientId';
  const twilioDevice = get(props, 'twilioDevice', null);
  const activeConnection = get(props, 'activeConnection', null);

  useEffect(() => {
    props.getTwilioToken(userId);
    return () => unsubscribeTwilioEventListener();
  }, [handleTwilioEvents()]);

  // function handleTwilioEvents() {
  //
  //   if (twilioDevice) {
  //     unsubscribeTwilioEventListener()
  //     twilioDevice.on(ready, (key) => {
  //     })
  //     twilioDevice.on(error, (err) => {
  //       if (err.code === 31205) {
  //         getTwilioToken(deviceName)
  //       }
  //     })
  //     twilioDevice.on(disconnect, (conn) => {
  //       console.log('disconnect', error)
  //       endCall()
  //     })
  //     twilioDevice.on(offline, (device) => {
  //       console.log('OFFLINE', device)
  //     })
  //     twilioDevice.on(incoming, (conn) => {
  //       console.log('INCOMING--', conn)
  //       callIncoming(conn)
  //
  //     })
  //     twilioDevice.on(twilioDeviceConnect, (conn) => {
  //       console.log('DEVICE CONNECT', conn)
  //     })
  //     twilioDevice.on(cancel, (conn) => {
  //       console.log('CANCEL', conn)
  //       endCall()
  //     })
  //   }
  // }

  function handleTwilioEvents() {
    console.log(twilioDevice);
    if (twilioDevice) {
      // unsubscribeTwilioEventListener()
      // twilioDevice.on('ready', (key) => {
      // });
      // twilioDevice.on(error, (err) => {
      //   if (err.code === 31205) {
      //     getTwilioToken(deviceName)
      //   }
      // })
      twilioDevice.on('disconnect', (conn: any) => {
        console.log('disconnect');
        props.endCall(conn);
      });
      // twilioDevice.on(offline, (device) => {
      //   console.log('OFFLINE', device)
      // })
      twilioDevice.on('incoming', (conn: any) => {
        console.log('INCOMING-------------------', conn);
        props.incomingCall(conn);
      });
      // twilioDevice.on(twilioDeviceConnect, (conn) => {
      //   console.log('DEVICE CONNECT', conn)
      // })
      // twilioDevice.on(cancel, (conn) => {
      //   console.log('CANCEL', conn)
      //   endCall()
      // })
    }
  }

  if (activeConnection) {
    props.open({
      title: 'Calls',
      component: 'CallsPanel',
      place: '',
      width: 380,
      userPhone: userPhone,
    });
  }

  function unsubscribeTwilioEventListener() {
    if (twilioDevice) {
      twilioDevice.removeListener('ready', (key: any) => {});
      twilioDevice.removeListener('error', (key: any) => {});
      twilioDevice.removeListener('disconnect', (key: any) => {});
      twilioDevice.removeListener('offline', (key: any) => {});
      twilioDevice.removeListener('incoming', (key: any) => {});
      twilioDevice.removeListener('connect', (key: any) => {});
      twilioDevice.removeListener('cancel', (key: any) => {});
    }
  }

  return <></>;
};

const mapStateToProps = (state: any) => ({
  User: state.User,
  twilioDevice: state.InboundCalls.twilioDevice,
  activeConnection: state.InboundCalls.activeConnection,
  clientList: state.ClientDashboard.clientList,
});

const mapDispatchToProps = (dispatch: any) => ({
  getTwilioToken: (payload: any) => dispatch({ type: 'PhoneWidget/twilioWorker', payload }),
  incomingCall: (payload: any) => dispatch({ type: 'PhoneWidget/incomingCall', payload }),
  endCall: (payload: any) => dispatch({ type: 'PhoneWidget/endCall', payload }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CallDashboard);
