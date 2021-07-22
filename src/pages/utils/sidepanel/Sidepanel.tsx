import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Drawer } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import ClassTypeCreateWrapper from '@/pages/classType/form/ClassTypeCreateWrapper';
import ClassTypeEditWrapper from '@/pages/classType/form/ClassTypeEditWrapper';
import ClassCreateWrapper from '@/pages/classes/form/ClassesFormCreateWrapper';
import ClassEditWrapper from '@/pages/classes/form/ClassesFormEditWrapper';
import EventCreateWrapper from '@/pages/event/form/EventFormCreateWrapper';
import EventEditWrapper from '@/pages/event/form/EventFormEditWrapper';
import StyleCreateWrapper from '@/pages/style/form/StyleFormCreateWrapper';
import StyleEditWrapper from '@/pages/style/form/StyleFormEditWrapper';
import ClientFormCreateWrapper from '@/pages/client/form/ClientFormCreateWrapper';
import ClientFormEditWrapper from '@/pages/client/form/ClientFormEditWrapper';
import SipPhoneFormCreateWrapper from '@/pages/teacherAccount/sipPhone/form/SipPhoneFormCreateWrapper';
import SipPhoneFormEditWrapper from '@/pages/teacherAccount/sipPhone/form/SipPhoneFormEditWrapper';
import CallsPanel from '@/pages/calls/CallsPanel';
import PhonePad from '@/pages/calls/PhonePad';

interface IProps extends ISidepanel {
  Sidepanel: ISidepanel;
  close: () => void;
}

const Sidepanel = (props: IProps) => {
  const open = get(props, 'Sidepanel.open', false);
  const component = get(props, 'Sidepanel.component', '');
  const title = get(props, 'Sidepanel.title', '');
  const width = get(props, 'Sidepanel.width', 750);

  const components: any = {
    ClassesFormCreate: <ClassCreateWrapper />,
    ClassesFormEdit: <ClassEditWrapper />,

    EventFormCreate: <EventCreateWrapper />,
    EventFormEdit: <EventEditWrapper />,

    ClassTypeFormCreate: <ClassTypeCreateWrapper />,
    ClassTypeFormEdit: <ClassTypeEditWrapper />,

    StyleFormCreate: <StyleCreateWrapper />,
    StyleFormEdit: <StyleEditWrapper />,

    ClientFormCreate: <ClientFormCreateWrapper />,
    ClientFormEdit: <ClientFormEditWrapper />,

    SipPhoneFormCreate: <SipPhoneFormCreateWrapper />,
    SipPhoneFormEdit: <SipPhoneFormEditWrapper />,

    CallsPanel: <CallsPanel />,

    PhonePad: <PhonePad />,
  };

  const mapping = (c: string): any => {
    return components[c] || null;
  };

  const onCloseDrawer = () => {
    props.close();
  };

  return (
    <Drawer title={title} width={width} onClose={onCloseDrawer} visible={open}>
      {mapping(component)}
    </Drawer>
  );
};

const mapStateToProps = (state: any) => ({
  Sidepanel: state.Sidepanel,
});

const mapDispatchToProps = (dispatch: any) => ({
  close: () => dispatch({ type: 'Sidepanel/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);
