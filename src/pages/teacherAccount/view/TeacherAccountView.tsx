import React, { useRef } from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import TeacherAccountViewClassesList from '@/pages/teacherAccount/view/TeacherAccountViewClassesList';
import TeacherAccountViewEventList from '@/pages/teacherAccount/view/TeacherAccountViewEventList';
import TeacherAccountViewAddressList from '@/pages/teacherAccount/view/TeacherAccountViewAddressList';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import RenderPhoneNumber from '@/pages/utils/phone/phoneNumberRendering/PhoneNumbersRendering';

interface IProps {
  teacherAccountId: string;
  name: string;
  teacherAccountGetById: (teacherAccountId: string) => void;
  Account: IUserAccount;
  uploadImage: (payload: object) => void;
}

const TeacherAccountView = (props: IProps) => {
  const teacherAccountId = get(props, 'match.params.teacherAccountId');
  const email = get(props, 'Account.email', '');
  const name = get(props, 'TeacherAccount.name', '');
  //const phoneNumber = get(props, 'TeacherAccount.phoneNumber.number', '');
  const classesObject = get(props, 'TeacherAccount.classes', {});
  const classes: any = Object.values(classesObject);
  const eventObject = get(props, 'TeacherAccount.event', {});
  const event: any = Object.values(eventObject);
  const focus = get(props, 'TeacherAccount.focus', '');
  const style = get(props, 'TeacherAccount.style.name', '');
  const classTypeObject = get(props, 'TeacherAccount.classType', {});
  const classType = Object.values(classTypeObject)
    .map((el: any) => el.name)
    .toString();
  const image = get(props, 'TeacherAccount.image[1]', '');
  // @ts-ignore
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const uploadImageHandler = (file: any) => {
    const data = new FormData();
    data.append('image', file);
    props.uploadImage({ teacherAccountId, data });
  };

  return (
    <div className="container">
      <h1 className="text-center">{name}</h1>

      <div className="row">
        <div className="col-md-6 d-flex justify-content-start">
          <div>
            <div className="p-2">
              <Avatar src={image} shape="square" size={250} icon={<UserOutlined />} />
              <div>
                <Button className="ps-0 pe-0" type="link" size="small" onClick={handleClick}>
                  Upload Image
                </Button>
              </div>
            </div>

            <input
              type="file"
              className={'d-none'}
              ref={inputRef}
              onChange={(e) => uploadImageHandler(e.target.files![0])}
            />
          </div>
        </div>

        <div className="col-md-6 text-end">
          <div>
            <h3 className="text-colored-second text-end">{focus}</h3>
            {style && <h6 className="text-colored-third text-end"> Style of Yoga: {style}</h6>}
            {classType && <h6 className="text-colored-first text-end"> Type of Classes: {classType}</h6>}

            <h6>Email: {email}</h6>
            <h6>
              Phone: <RenderPhoneNumber phoneNumberAll={get(props, 'teacherAccount.phoneNumber', {})} />{' '}
            </h6>
          </div>
        </div>
      </div>

      <div className="py-5">
        <h3 className="text-colored-first mt-5">Classes</h3>
        <div>
          <TeacherAccountViewClassesList classes={classes} />
        </div>

        <h3 className="text-colored-second mt-5">Events</h3>
        <div>
          <TeacherAccountViewEventList event={event} />
        </div>

        <h3 className="text-colored-third">Address</h3>
        <div>
          <TeacherAccountViewAddressList />
        </div>
      </div>

      <div className="mt-5 d-flex justify-content-center">
        <Link to="/teacherAccount" className="button-link-primary">
          Back To All Teachers
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherAccount: state.TeacherAccountView,
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (payload: string) => dispatch({ type: 'TeacherAccountView/teacherAccountGetById', payload }),
  uploadImage: (payload: object) => dispatch({ type: 'TeacherAccountView/queryTeacherAccountUploadImage', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountView);
