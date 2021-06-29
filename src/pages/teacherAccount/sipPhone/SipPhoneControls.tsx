import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const SipPhoneControls = (props: IProps) => {
  const clientCreate = () => {
    props.open({
      title: 'Create SIP Phone',
      component: 'SipPhoneFormCreate',
      place: 'TeacherAccountSipPhones',
      width: '80%',
    });
  };

  return (
    <Button type="primary" shape="round" onClick={clientCreate}>
      Create SIP Phone
    </Button>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneControls);
