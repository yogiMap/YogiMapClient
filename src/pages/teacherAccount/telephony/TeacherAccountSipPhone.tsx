import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import SipPhoneListItem from '@/pages/teacherAccount/telephony/SipPhoneListItem';
import SipPhoneControls from '@/pages/teacherAccount/telephony/SipPhoneControls';
import { ISipPhone } from '@/pages/sipPhone/types';

interface IProps {
  teacherAccountId: string;
  name: string;
  teacherAccountGetSipPhone: (teacherAccountId: string) => void;
}

const TeacherAccountSipPhone = (props: IProps) => {
  const teacherAccountId = get(props, 'match.params.teacherAccountId');
  const teacherAccountSipPhones: ISipPhone[] = get(props, 'TeacherAccountSipPhone.teacherSipPhone', []);

  useEffect(() => {
    props.teacherAccountGetSipPhone(teacherAccountId);
  }, []);

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col d-flex justify-content-center">
          <h1>SIP Phones</h1>
        </div>
      </div>

      <div className="row my-3">
        <div className="col">
          {teacherAccountSipPhones.map((el) => (
            <SipPhoneListItem key={el._id} item={el} teacherAccountId={teacherAccountId} />
          ))}
        </div>
      </div>

      <div className="row my-3">
        <div className="col d-flex justify-content-end">
          <SipPhoneControls teacherAccountId={teacherAccountId} />
        </div>
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
