import React from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Popover } from 'antd';

interface IProps {
  description: string;
  id: string;
  orderGetById: (id: string) => void;
  close: () => void;
}

const OrderHoverCard = (props: IProps) => {
  const title = get(props, 'title');
  const orderId = get(props, 'id');

  const client = get(props, 'HoverCard.client.name', '');
  const addressLine1 = get(props, 'HoverCard.address.addressLine1', '');
  const addressLine2 = get(props, 'HoverCard.address.addressLine2', '');
  const orderStart = get(props, 'HoverCard.orderStart', '');
  const orderEnd = get(props, 'HoverCard.orderEnd', '');
  const description = get(props, 'HoverCard.description', '');
  const isCompanyOwner = get(props, 'HoverCard.isCompanyOwner', false);
  const teacherAccountName = get(props, 'HoverCard.teacherAccount.companyName', '');
  const teacherAccountId = get(props, 'HoverCard.teacherAccount._id', '');

  const onVisibleChange = (isVisible: boolean) => {
    if (isVisible) {
      props.orderGetById(orderId);
    } else {
      props.close();
    }
  };

  const content = (
    <div className="hoverCard">
      <div>Client: {client}</div>
      <div>
        Address: {addressLine1} {addressLine2}
      </div>
      <div>Start: {orderStart} </div>
      <div>End: {orderEnd}</div>
      <div>{description}</div>

      {teacherAccountName && <Link to={`/company/${teacherAccountId}`}>{teacherAccountName}</Link>}
      {isCompanyOwner && ' owner'}
    </div>
  );

  return (
    <Popover content={content} title={title} trigger="hover" onVisibleChange={onVisibleChange}>
      <Link to={`/order/${orderId}`}>{title}</Link>
    </Popover>
  );
};

const mapStateToProps = (state: any) => ({
  HoverCard: state.HoverCard,
});

const mapDispatchToProps = (dispatch: any) => ({
  orderGetById: (payload: string) => dispatch({ type: 'HoverCard/orderGetById', payload }),
  close: () => dispatch({ type: 'HoverCard/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHoverCard);
