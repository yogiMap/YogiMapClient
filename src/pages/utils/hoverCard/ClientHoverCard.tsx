import React from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Popover } from 'antd';

interface IProps {
  name: string;
  id: string;
  clientGetById: (id: string) => void;
  close: () => void;
}

const ClientHoverCard = (props: IProps) => {
  const name = get(props, 'name');
  const clientId = get(props, 'id');

  const email = get(props, 'HoverCard.email', '');
  const phone = get(props, 'HoverCard.phone', '');
  const isCompanyOwner = get(props, 'HoverCard.isCompanyOwner', false);
  const companyAccountName = get(props, 'HoverCard.companyAccount.companyName', '');
  const companyAccountId = get(props, 'HoverCard.companyAccount._id', '');

  const onVisibleChange = (isVisible: boolean) => {
    if (isVisible) {
      props.clientGetById(clientId);
    } else {
      props.close();
    }
  };

  const content = (
    <div className="hoverCard">
      {email && <p>Email: {email}</p>}
      // TODO change to client fields
      {phone && <p>Phone: {phone}</p>}
      {companyAccountName && <Link to={`/company/${companyAccountId}`}>{companyAccountName}</Link>}
      {isCompanyOwner && ' owner'}
    </div>
  );

  return (
    <Popover content={content} title={name} trigger="hover" onVisibleChange={onVisibleChange}>
      <Link to={`/client/${clientId}/info`}>{name}</Link>
    </Popover>
  );
};

const mapStateToProps = (state: any) => ({
  HoverCard: state.HoverCard,
});

const mapDispatchToProps = (dispatch: any) => ({
  clientGetById: (payload: string) => dispatch({ type: 'HoverCard/clientGetById', payload }),
  close: () => dispatch({ type: 'HoverCard/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientHoverCard);
