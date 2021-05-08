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
  const userId = get(props, 'id');

  const email = get(props, 'HoverCard.email', '');
  const phone = get(props, 'HoverCard.phone', '');
  const isCompanyOwner = get(props, 'HoverCard.isCompanyOwner', false);
  const teacherAccountId = get(props, 'HoverCard.teacherAccount._id', '');
  const teacherAccountName = get(props, 'HoverCard.teacherAccount.name', '');
  const country = get(props, 'HoverCard.teacherAccount.country', '');
  const city = get(props, 'teacherAccountList.city', '');

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
      {phone && <p>Phone: {phone}</p>}
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
