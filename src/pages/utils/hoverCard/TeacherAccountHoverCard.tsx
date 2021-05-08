import React from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Popover } from 'antd';

interface IProps {
  name: string;
  id: string;
  teacherAccountGetById: (id: string) => void;
  close: () => void;
}

const ProfileHoverCard = (props: IProps) => {
  const name = get(props, 'name');
  const teacherAccountId = get(props, 'id');

  const email = get(props, 'HoverCard.email', '');
  const phoneNumber = get(props, 'HoverCard.phoneNumber', '');
  const isCompanyOwner = get(props, 'HoverCard.isCompanyOwner', false);
  const teacherAccountName = get(props, 'HoverCard.teacherAccount.name', '');
  const country = get(props, 'HoverCard.country', '');
  const city = get(props, 'HoverCard.city', '');

  // const teacherAccountName = get(props, 'HoverCard.teacherAccount.name', '');

  const onVisibleChange = (isVisible: boolean) => {
    if (isVisible) {
      props.teacherAccountGetById(teacherAccountId);
    } else {
      props.close();
    }
  };

  const content = (
    <div className="hoverCard">
      {email && <p>Email: {email}</p>}
      {phoneNumber && <p>Phone: {phoneNumber}</p>}
      {country && <p>Country: {country}</p>}
      {city && <p>City: {city}</p>}
      {teacherAccountName && <Link to={`/teacherAccount/${teacherAccountId}`}>{teacherAccountName}</Link>}
      {/*{isCompanyOwner && 'owner'}*/}
    </div>
  );

  return (
    <Popover content={content} title={name} trigger="hover" onVisibleChange={onVisibleChange}>
      <Link to={`/teacherAccount/${teacherAccountId}`}>{name}</Link>
    </Popover>
  );
};

const mapStateToProps = (state: any) => ({
  HoverCard: state.HoverCard,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountGetById: (payload: string) => dispatch({ type: 'HoverCard/teacherAccountGetById', payload }),
  close: () => dispatch({ type: 'HoverCard/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHoverCard);
