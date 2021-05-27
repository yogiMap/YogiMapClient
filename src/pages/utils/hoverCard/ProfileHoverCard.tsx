import React from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Popover } from 'antd';

interface IProps {
  name: string;
  id: string;
  userGetById: (id: string) => void;
  close: () => void;
}

const ProfileHoverCard = (props: IProps) => {
  const name = get(props, 'name');
  const userId = get(props, 'id');

  const email = get(props, 'HoverCard.email', '');
  const phone = get(props, 'HoverCard.phone', '');
  const isCompanyOwner = get(props, 'HoverCard.isCompanyOwner', false);
  const teacherAccountName = get(props, 'HoverCard.teacherAccount.name', '');
  const teacherAccountId = get(props, 'HoverCard.teacherAccount._id', '');

  const onVisibleChange = (isVisible: boolean) => {
    if (isVisible) {
      props.userGetById(userId);
    } else {
      props.close();
    }
  };

  const content = (
    <div>
      {email && <p>Email: {email}</p>}
      {phone && <p>Phone: {phone}</p>}
      {teacherAccountName && <Link to={`/teacherAccount/${teacherAccountId}`}>{teacherAccountName}</Link>}
      {isCompanyOwner && 'owner'}
    </div>
  );

  return (
    <Popover content={content} title={name} trigger="hover" onVisibleChange={onVisibleChange}>
      <Link to={`/profile/${userId}`}>{name}</Link>
    </Popover>
  );
};

const mapStateToProps = (state: any) => ({
  HoverCard: state.HoverCard,
});

const mapDispatchToProps = (dispatch: any) => ({
  userGetById: (payload: string) => dispatch({ type: 'HoverCard/userGetById', payload }),
  close: () => dispatch({ type: 'HoverCard/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHoverCard);
