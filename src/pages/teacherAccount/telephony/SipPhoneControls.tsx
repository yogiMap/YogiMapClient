import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
  teacherAccountId: string;
}

const SipPhoneControls = (props: IProps) => {
  const clientCreate = () => {
    props.open({
      title: 'Create SIP Phone',
      component: 'SipPhoneFormCreate',
      place: 'TeacherAccountSipPhones',
      width: '800',
      teacherAccountId: props.teacherAccountId,
    });
  };

  const sipPhoneBuy = () => {
    props.open({
      title: 'Buy SIP Phone',
      component: 'SipPhoneBuy',
      place: 'TeacherAccountSipPhones',
      width: '800',
      teacherAccountId: props.teacherAccountId,
    });
  };

  return (
    <>
      <Button type="primary" shape="round" className="my-5" onClick={clientCreate}>
        Create SIP Phone
      </Button>

      <Button type="default" className="my-5 mx-3" shape="round" onClick={sipPhoneBuy}>
        Buy SIP Phone
      </Button>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(SipPhoneControls);
