import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import RenderPhoneNumber from '@/pages/phoneNumberRendering/PhoneNumbersRendering';
import { Tag } from 'antd';
import TeacherAccountViewClassesList from '@/pages/teacherAccount/view/TeacherAccountViewClassesList';
import TeacherAccountViewEventList from '@/pages/teacherAccount/view/TeacherAccountViewEventList';

interface IProps {
  teacherAccountId: string;
  name: string;
  teacherAccountGetById: (teacherAccountId: string) => void;
}

const TeacherAccountView = (props: IProps) => {
  const teacherAccountId = get(props, 'match.params.teacherAccountId');
  const teacherName = get(props, 'TeacherAccountView.teacherName', '');
  const email = get(props, 'TeacherAccountView.email', '');
  const address = get(props, 'TeacherAccountView.address', '');
  const addressLine1 = get(props, 'TeacherAccountView.addressLine1', '');
  const addressLine2 = get(props, 'TeacherAccountView.addressLine2', '');
  const city = get(props, 'TeacherAccountView.city', '');
  const state = get(props, 'TeacherAccountView.state', '');
  const country = get(props, 'TeacherAccountView.country', '');
  const countryName: string = get(props, 'TeacherAccountView.countryName', '');
  const zipCode = get(props, 'TeacherAccountView.zipCode', '');
  const timeZone = get(props, 'TeacherAccountView.timeZone', '');
  const isDefault: boolean = get(props, 'TeacherAccountView.isDefault', false);
  const phone: any = get(props, 'TeacherAccountView.phone', '');

  const name = get(props, 'TeacherAccountView.name', '');
  const classesObject = get(props, 'TeacherAccountView.classes', {});
  const classes: any  = Object.values(classesObject);
  const eventObject = get(props, 'TeacherAccountView.event', {});
  const event: any  = Object.values(eventObject);
  const classTypeObject = get(props, 'TeacherAccountView.classType', {});
  const focusObject = get(props, 'TeacherAccountView.focus', {});
  const YogaStyleObject = get(props, 'TeacherAccountView.style', {});
  console.log(event);



  useEffect(() => {
    props.teacherAccountGetById(teacherAccountId);
  }, []);

  // @ts-ignore
  return (
    <div>

      <div className="container">
        <h1 className="text-center">{name}</h1>
        {/*{ focusObject.map((el: any) => (*/}
        {/*  <h2>{el.name}</h2>*/}
        {/*))}*/}

        Phone Number: <RenderPhoneNumber phoneNumberAll={get(props, 'TeacherAccountView.phoneNumber', {})} />

        <div className="d-print-block">
          <h6>
            Address {isDefault && <Tag color="default">default</Tag>}
          </h6>
          <div className="mb-1">{addressLine1}</div>
          <div className="mb-1">{addressLine2}</div>
          <div className="mb-1">{city}</div>
          <div className="mb-1">{state}</div>
          <div className="mb-1">{zipCode}</div>
          <div className="mb-1">{countryName}</div>
          <div className="mb-1">{email}</div>
          <div className="mb-1">{phone}</div>
          Email: {email} <br />
          Address: {address} <br />
          Address Line1: {addressLine1} <br />
          Address Line2: {addressLine2} <br />
          City: {city} <br />
          State: {state} <br />
          Country: {country} <br />
          Zip Code: {zipCode} <br />
          Time Zone: {timeZone} <br />
        </div>

        <h3 className="mt-5">Classes</h3>
        <div>
          <TeacherAccountViewClassesList classes={classes}/>
        </div>

        <h3 className="mt-5">Events</h3>
        <div>
          <TeacherAccountViewEventList event={event}/>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherAccountView: state.TeacherAccountView,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccountView/teacherAccountGetById', payload: teacherAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountView);
