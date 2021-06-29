import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import SipPhoneListItem from '@/pages/teacherAccount/sipPhone/SipPhoneListItem';
import SipPhoneControls from '@/pages/teacherAccount/sipPhone/SipPhoneControls';
import { ISipPhone } from '@/pages/sipPhone/types';

interface IProps {
  teacherAccountId: string;
  name: string;
  teacherAccountGetSipPhone: (teacherAccountId: string) => void;
}

const TeacherAccountSipPhone = (props: IProps) => {
  const teacherAccountId = get(props, 'match.params.teacherAccountId');
  const teacherAccountSipPhones: ISipPhone[] = get(props, 'TeacherAccountSipPhone.companySipPhone', []);

  useEffect(() => {
    props.teacherAccountGetSipPhone(teacherAccountId);
  }, []);

  return (
    <div>
      <h2>SIP Phones</h2>

      <SipPhoneControls />

      <div>
        {teacherAccountSipPhones.map((el) => (
          <SipPhoneListItem key={el._id} item={el} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherAccountSipPhone: state.TeacherAccountSipPhone,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetSipPhone: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccountSipPhone/teacherAccountGetSipPhone', payload: teacherAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountSipPhone);
